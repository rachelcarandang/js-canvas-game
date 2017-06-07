	var AnswerFeedback = {
		'Correct' : 'correct',
		'Incorrect' : 'incorrect',
		'TimesUp' : 'timesUp'
	}

	var TeamID = {
		'One' : 'team1',
		'Two' : 'team2'
	};

	function Team(id, name, score, divIdOfTeamName, divIdOfScore) {
		this.id = id;
		this.name = name;
		this.score = score;
		this.divIdOfTeamName = divIdOfTeamName;
		this.divIdOfScore = divIdOfScore;
	};

	function Game() {
		var team1Name = getUrlParameter('team1') || 'Team 1';
		var team2Name = getUrlParameter('team2') || 'Team 2';
		var team1 = new Team(TeamID.One, team1Name, 0, 'team1Name', 'team1Score');
		var team2 = new Team(TeamID.Two, team2Name, 0, 'team2Name', 'team2Score');
		this.teams = [ team1, team2 ];
		this.totalRounds = 4;
		this.secondsPerRound = 10;
		this.currentRound;
		this.currentTeamGuessing;
		this.secondsLeftInRound;
		this.currentRoundHasEnded;
		this.shouldStopTimer;
	};

	Game.prototype.calculateCurrentTeamGuessingBasedOnRoundsAndNumberOfTeams = function() {
		var indexOfTheGuessingTeam = (this.currentRound - 1) % this.teams.length;
		return this.teams[indexOfTheGuessingTeam];
	};

	Game.prototype.startGame = function() {
		console.log('Starting game.');
		this.currentRound = 1;
		this.currentTeamGuessing = this.calculateCurrentTeamGuessingBasedOnRoundsAndNumberOfTeams();
		this.secondsLeftInRound = this.secondsPerRound;
		this.currentRoundHasEnded = false;
		this.shouldStopTimer = false;
		this.model = new Model();
		var self = this;
		this.display = new Display(this.teams, function(answerOptionValue) {
			self.onAnswerSelected(answerOptionValue);
		});
		this.display.displayNewRound(this.currentRound, this.totalRounds, this.currentTeamGuessing, this.teams[1]);
		this.setTimer();
	};

	Game.prototype.onAnswerSelected = function(answerOptionValue) {
		this.shouldStopTimer = true;
		if (this.currentRoundHasEnded) {
			return;
		}
		console.log('option box selected: ' + answerOptionValue);
		var model = new Model();
		if (answerOptionValue === model.rounds[this.currentRound-1].correctAnswer) {
			this.updateScoreOfCurrentTeamGuessing(this.currentTeamGuessing);
			this.display.showAnswerFeedbackModal(AnswerFeedback.Correct);
		} else {
			this.display.showAnswerFeedbackModal(AnswerFeedback.Incorrect);
		}
		var self = this;
		self.currentRoundHasEnded = true;
		setTimeout(function() {
			self.handleEndOfRound();
		}, 3500);
	};

	Game.prototype.handleEndOfRound = function() {
		this.display.stopMusic();
		if (this.currentRound === this.totalRounds ) {
			var winnintTeam;
			var team1 = this.teams[0];
			var team2 = this.teams[1];
			if (team1.score > team2.score) {
				winningTeam = team1;
			} else if (team2.score > team1.score) {
				winningTeam = team2;
			} else {
				winningTeam = null;
			}
			this.display.showEndGameModal(winningTeam);
			return;
		} else {
			this.startANewRound();
		}
	};

	Game.prototype.startANewRound = function() {
		console.log('startANewRound');
		var lastTeamGuessing = this.currentTeamGuessing;
		this.currentRound++;
		this.currentTeamGuessing = this.calculateCurrentTeamGuessingBasedOnRoundsAndNumberOfTeams();
		this.secondsLeftInRound = this.secondsPerRound;
		this.currentRoundHasEnded = false;
		this.display.displayNewRound(this.currentRound, this.totalRounds, this.currentTeamGuessing, lastTeamGuessing);
		this.setTimer();
		this.currentRoundHasEnded = false;
		this.shouldStopTimer = false;
	};

	Game.prototype.updateScoreOfCurrentTeamGuessing = function(team) {
		team.score++;
		this.display.updateTeamScore(team);
	};

	Game.prototype.setTimer = function() {
		var self = this;

		var intervalId = setInterval(function() {
			if (self.secondsLeftInRound === 0) {
				self.onTimerEnded(intervalId);
			} 
			if (self.shouldStopTimer) {
				self.stopTimer(intervalId);
			}
			document.getElementById('secondsLeftText').innerHTML = self.convertSecondsLeftToDisplayText(self.secondsLeftInRound);
			self.secondsLeftInRound--;

		}, 1000);
	};

	Game.prototype.stopTimer = function(intervalId) {
		clearInterval(intervalId);
	};

	Game.prototype.convertSecondsLeftToDisplayText = function (secondsLeft) {
		var displayText;
		if (secondsLeft < 10) {
			return '00:0' + secondsLeft;
		} 
		return '00:' + secondsLeft;
	};

	Game.prototype.onTimerEnded = function(intervalId) {
		document.getElementById('secondsLeftText').innerHTML = '00:00';
		document.getElementById('secondsLeftText').classList.add('timesUpSecondStyle');
		clearInterval(intervalId);
		var self = this;
		self.currentRoundHasEnded = true;
		setTimeout(function() {
			self.display.showAnswerFeedbackModal(AnswerFeedback.TimesUp);
		}, 1000);

		setTimeout(function() {
			self.handleEndOfRound();
		}, 4000);
	};