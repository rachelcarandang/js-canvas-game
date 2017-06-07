	function Display(teams, onAnswerSelected) {
			this.onAnswerSelected = onAnswerSelected;
			this.setUpStaticDisplayElements(teams);
		};

		Display.prototype.showAnswerFeedbackModal = function(answerFeedback) {

			var modal = document.getElementById('myModal');

			var answerFeedbackText = document.getElementById('answerFeedbackText');
			var answerFeedbackModalImage = document.getElementById('answerFeedbackModalImage');
			var imageSrc = 'assets/';
			var textToDisplay;
			if (answerFeedback === AnswerFeedback.Correct) {
				textToDisplay = 'Correct!';
				imageSrc += 'thumbs_up.png' 
			} else if (answerFeedback === AnswerFeedback.Incorrect) {
				textToDisplay = 'Incorrect!';
				imageSrc += 'thumbs_down.png';
			} else {
				textToDisplay = 'Time\'s Up!';
				imageSrc += 'timer.png';
			}
			answerFeedbackText.innerHTML = textToDisplay;
			answerFeedbackModalImage.src = imageSrc;
			modal.style.display = "block";

			setTimeout(function() {
		        $("#myModal").fadeOut(3000);
			}, 500);
		}

		Display.prototype.showEndGameModal = function(winningTeam) {
			var modal = document.getElementById('endGameModal');
			var winner = document.getElementById('endGameWinner');
			if (winningTeam != null) {
				winner.innerHTML = winningTeam.name;
			} else {
				document.getElementById('endGameText').classList.add('hidden');
				winner.innerHTML = 'It\'s a Tie!';
			}
			modal.style.display = "block";
		};

				// Modal can be exited by clicking
		window.onclick = function(event) {
			var modal = document.getElementById('endGameModal');
		    if (event.target == modal) {
		        modal.style.display = "none";
		        // $("#myModal").fadeOut(3000);
		    }
		}

		// Modal can be exited by clicking
		window.onclick = function(event) {
			var modal = document.getElementById('myModal');
		    if (event.target == modal) {
		        modal.style.display = "none";
		        // $("#myModal").fadeOut(3000);
		    }
		}

		Display.prototype.setUpStaticDisplayElements = function(teams) {
			var team1 = teams[0];
			var team2 = teams[1];
			this.setTextOfElement(team1.divIdOfTeamName, team1.name);
			this.setTextOfElement(team2.divIdOfTeamName, team2.name);
		}

		Display.prototype.stopMusic = function() {
			this.audio.pause();
		}

		Display.prototype.displayNewRound = function(currentRound, totalRounds, currentTeamGuessing, lastTeamGuessing)
		{
			console.log('displayNewRound');
			this.audio = new Audio('https://www.amazon.com/gp/dmusic/get_sample_url.html?DownloadLocation=WEBSITE&ASIN=B006WWU924');
			this.audio.play();
			var model = new Model();
			this.displayConfiguration = model.rounds[currentRound-1];
			this.displayRoundInformation(currentRound, totalRounds);
			this.highlightTeamThatIsGuessing(currentTeamGuessing);
			this.undoHighlightOfLastTeamThatIsGuessing(lastTeamGuessing);
			this.fillCardsWithAnswerOptions();
			document.getElementById('secondsLeftText').classList.remove('timesUpSecondStyle');
		};

		Display.prototype.displayRoundInformation = function(currentRound, totalRounds) {
			this.setTextOfElement('roundInformation', currentRound + ' of ' + totalRounds);
		};

		Display.prototype.highlightTeamThatIsGuessing = function(currentTeamGuessing) {
			var teamName = currentTeamGuessing.divIdOfTeamName;
			var teamScore = currentTeamGuessing.divIdOfScore;
			document.getElementById(teamName).classList.add('teamSelected');
			document.getElementById(teamScore).classList.add('scoreSelected');
		};

		Display.prototype.undoHighlightOfLastTeamThatIsGuessing = function(lastTeamGuessing) {
			var teamName = lastTeamGuessing.divIdOfTeamName;
			var teamScore = lastTeamGuessing.divIdOfScore;
			console.log('removing last team guessing' + lastTeamGuessing.id);
			document.getElementById(teamName).classList.remove('teamSelected');
			document.getElementById(teamScore).classList.remove('scoreSelected');
		}

		Display.prototype.fillCardsWithAnswerOptions = function() {
			this.setOnClickListenerOfElement('optionBoxA', this.displayConfiguration.answerOptionA);
			this.setOnClickListenerOfElement('optionBoxB', this.displayConfiguration.answerOptionB);
			this.setOnClickListenerOfElement('optionBoxC', this.displayConfiguration.answerOptionC);
			this.setOnClickListenerOfElement('optionBoxD', this.displayConfiguration.answerOptionD);
			this.setTextOfElement('answerOptionA', this.displayConfiguration.answerOptionA);
			this.setTextOfElement('answerOptionB', this.displayConfiguration.answerOptionB);
			this.setTextOfElement('answerOptionC', this.displayConfiguration.answerOptionC);
			this.setTextOfElement('answerOptionD', this.displayConfiguration.answerOptionD);
		};

		Display.prototype.updateTeamScore = function(team) {
			this.setTextOfElement(team.divIdOfScore, team.score);
		};

		Display.prototype.setTextOfElement = function(elementId, text) {
			document.getElementById(elementId).innerHTML = text;
		};

		Display.prototype.setOnClickListenerOfElement = function(elementId, answerOptionValue) {
			var self = this;
			document.getElementById(elementId).addEventListener('click', function() {
					self.onAnswerSelected(answerOptionValue);
			});
		};
