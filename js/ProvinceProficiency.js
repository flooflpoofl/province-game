class ProvinceProficiency {

    constructor(width, height) {
        this.width = width;
        this.height = height;

        // Province data
        this.provinceData = new ProvinceData(SAMPLE_DATA);
        this.currentQuestion = this.provinceData.generateRandomQuestion(3);

        // Canvas layers
        this.canvasContainer = document.getElementById('canvas-container');

        this.canvasContainer.style.width = width + 'px';
        this.canvasContainer.style.height = height + 'px';

        this.canvases = {
            background: this.createGameCanvas(),
            cars: this.createGameCanvas(),
            quiz: this.createGameCanvas()
        };

        // Blueprints
        this.blueprints = {
            background: backgroundBlueprint(this.canvases.background.width, this.canvases.background.height),
            roads: roadsBlueprint(this.canvases.background.width, this.canvases.background.height),
            quiz: quizBlueprint(this.canvases.background.width, this.canvases.background.height),
            car: carBlueprint(this.canvases.background.width, this.canvases.background.height)
        };

        this.carLayerCallbacks = {
            onCityReached: (driveButtonId) => this.onCityReached(driveButtonId)
        };

        this.layers = {
            background: new BackgroundLayer(
                this.canvases.background,
                { background: this.blueprints.background, roads: this.blueprints.roads}
            ),
            cars: new CarLayer(
                this.canvases.cars,
                { roads: this.blueprints.roads, car: this.blueprints.car },
                this.carLayerCallbacks
            ),
            quiz: new QuizLayer(
                this.canvases.quiz,
                { roads: this.blueprints.roads, quiz: this.blueprints.quiz }
            )
        };

        // Button controls
        this.driveClickHandler = this.onDriveButtonClick.bind(this);
        this.driveButtons = this.setupDriveButtons();

        // Menus
        this.startMenu = document.getElementById('start-menu');
        this.startClickHandler = this.onStartButtonClick.bind(this);
        this.startButton = this.setupStartButton();

        this.nextMenu = document.getElementById('next-menu');
        this.nextClickHandler = this.onNextButtonClick.bind(this);
        this.nextButton = this.setupNextButton();


    }

    createGameCanvas() {
        const canvas = document.createElement('canvas');
        canvas.classList.add('game-canvas');

        // Handle size and pixel ratio
        canvas.style.width = this.canvasContainer.offsetWidth + 'px';
        canvas.style.height = this.canvasContainer.offsetHeight + 'px';
        
        canvas.width = this.canvasContainer.offsetWidth * devicePixelRatio;
        canvas.height = this.canvasContainer.offsetHeight * devicePixelRatio;

        this.canvasContainer.append(canvas);

        return canvas;
    }

    setupDriveButtons() {
        const driveButtonElements = document.getElementsByClassName('drive-button');
        let driveButtons = [];
        for (let i = 0; i < driveButtonElements.length; i++) {
            driveButtonElements[i].addEventListener('click', this.driveClickHandler);

            driveButtons.push( { element: driveButtonElements[i], isActive: true} );
        }

        return driveButtons;
    }

    setupStartButton() {
        const playButton = document.getElementById('start-button');
        playButton.addEventListener('click', this.startClickHandler);

        return playButton;
    }

    setupNextButton() {
        const nextButton = document.getElementById('next-button');
        nextButton.addEventListener('click', this.nextClickHandler);

        return nextButton;
    }

    onStartButtonClick() {
        this.newQuestion();

        // Hide start menu
        this.startMenu.style.display = 'none';
    }

    onNextButtonClick() {
        this.newQuestion();

        // Hide next menu
        this.nextMenu.style.display = 'none';
    }

    newQuestion() {

        // Reset cars and start animating them
        this.layers.cars.setInit();
        this.layers.cars.startAnimation();

        // Reset buttons
        this.driveButtons.forEach(button => {
            button.element.className = 'drive-button';
            button.element.innerHTML = 'KÖR';
            button.element.addEventListener('click', this.clickHandler);

            button.isActive = true;
        });

        // New question
        this.currentQuestion = this.provinceData.generateRandomQuestion(3);
        const questionData = {
            province:  this.currentQuestion.correct.province,
            options: this.currentQuestion.options.map(option => option.city)
        };

        this.layers.quiz.draw(questionData);
    }

    onCorrect(driveButton) {

        // Style button
        driveButton.element.classList.add('correct');
        driveButton.element.innerHTML = 'RÄTT';

        // Deactivate buttons
        this.driveButtons.forEach(button => {
            button.element.classList.add('inactive');
            button.element.removeEventListener('click', this.clickHandler);
        });

        // Stop animation of cars
        this.layers.cars.stopAnimation();

        // Show next menu (button)
        this.nextMenu.style.display = 'flex';
    }

    onIncorrect(driveButton) {
        // Style button
        driveButton.element.classList.add('incorrect');
        driveButton.element.innerHTML = 'FEL';
    }

    onDriveButtonClick(event) {

        // Make buttons unclickable
        this.driveButtons.forEach(button => {
            button.element.classList.add('inactive');
            button.element.removeEventListener('click', this.clickHandler);
        });

        const buttonIndex = +event.target.dataset.id;

        this.driveButtons[buttonIndex].isActive = false;
        this.layers.cars.drive(buttonIndex);
    }

    onCityReached(driveButtonId) {

        // Make buttons clickable
        this.driveButtons.forEach(button => {

            if (button.isActive) {
                button.element.classList.remove('inactive');
                button.element.classList.add('active');
                button.element.addEventListener('click', this.clickHandler);
            }
        });

        // Check if correct
        if (this.currentQuestion.correct.city === this.currentQuestion.options[driveButtonId].city) {
            this.onCorrect(this.driveButtons[driveButtonId]);
        } else {
            this.onIncorrect(this.driveButtons[driveButtonId]);
        }
        
    }
}