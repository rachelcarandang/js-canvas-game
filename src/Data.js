	function Model() {
			var round1 = new DisplayConfigurationRound1();
			var round2 = new DisplayConfigurationRound2();
			this.rounds = [ round1, round2, new DisplayConfigurationRound3(),
			new DisplayConfigurationRound4()];
		};

		function DisplayConfigurationRound1() {
			this.question = 'What song is this?';
			this.songUrl = '';
			this.answerOptionA = 'Love Story';
			this.answerOptionB = 'Viva La Vida';
			this.answerOptionC = 'You Really Got Me';
			this.answerOptionD = 'All Star';
			this.correctAnswer= this.answerOptionA;
		};

		function DisplayConfigurationRound2() {
			this.question = 'What song is this?';
			this.songUrl = '';
			this.answerOptionA = 'Hands To Myself';
			this.answerOptionB = 'What Makes You Beautiful';
			this.answerOptionC = 'Kiss Me';
			this.answerOptionD = 'Baby';
			this.correctAnswer = this.answerOptionB;
		};

		function DisplayConfigurationRound3() {
			this.question = 'What song is this?';
			this.songUrl = '';
			this.answerOptionA = 'Love Story';
			this.answerOptionB = 'Viva La Vida';
			this.answerOptionC = 'You Really Got Me';
			this.answerOptionD = 'All Star';
			this.correctAnswer= this.answerOptionA;
		};

		function DisplayConfigurationRound4() {
			this.question = 'What song is this?';
			this.songUrl = '';
			this.answerOptionA = 'Hands To Myself';
			this.answerOptionB = 'What Makes You Beautiful';
			this.answerOptionC = 'Kiss Me';
			this.answerOptionD = 'Baby';
			this.correctAnswer = this.answerOptionB;
		};
