class QuizLayer {

    constructor(canvasElement, blueprints) {
        this.ctx = canvasElement.getContext('2d');

        this.roads = blueprints.roads;
        this.quiz = blueprints.quiz;
    }

    draw(questionData) {

        this.ctx.clearRect(
            0, 0,
            this.ctx.canvas.width,
            this.ctx.canvas.height
        );

        this.drawHeader(questionData.province);
        if (questionData.feedback) { this.drawFeedback(questionData.feedback)};
        this.drawSigns(questionData.options);
    }

    drawHeader(province) {
        // Make sure province is uppercase
        province = province.toUpperCase() + '!';

        // Handle island prepositions
        let headerText;
        if ( province === 'GOTLAND!' || province === 'ÖLAND!') {
            headerText = `KÖR TILL EN ORT PÅ...`;
        } else {
            headerText = `KÖR TILL EN ORT I...`;
        }

        // Apply general text styles
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';

        // Draw first line
        this.ctx.font = `${this.quiz.header.firstLine.style.fontSize}px ${this.quiz.header.firstLine.style.fontFamily}`;
        this.ctx.fillStyle = this.quiz.header.firstLine.style.color;

        this.ctx.fillText(
            headerText,
            this.quiz.header.firstLine.position.x,
            this.quiz.header.firstLine.position.y
        );

        // Draw second line
        this.ctx.font = `${this.quiz.header.secondLine.style.fontSize}px ${this.quiz.header.secondLine.style.fontFamily}`;
        this.ctx.fillStyle = this.quiz.header.secondLine.style.color;

        this.ctx.fillText(
            province,
            this.quiz.header.secondLine.position.x,
            this.quiz.header.secondLine.position.y
        );
    }

    drawSigns(cities) {
        
        for (let i = 0; i < cities.length; i++) {
            this.drawCitySign(
                this.roads.toCities.locations[i],
                this.roads.main.location - this.roads.toCities.lengths[i],
                cities[i]
            );
        }
    }

    drawCitySign(x, y, city) {

        // Make sure text is uppercase
        city = city.toUpperCase();

        // Apply sign text styles
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.font = `${this.quiz.signs.style.fontSize}px ${this.quiz.signs.style.fontFamily}`;

        // Calculate sign size
        const signWidth = Math.max(this.quiz.signs.style.fontSize * city.length, this.quiz.signs.width.min);
        const signHeight = this.quiz.signs.style.fontSize * 2; // swish-swosh

        // Apply leg color styles
        this.ctx.fillStyle = this.quiz.signs.legs.style.color;

        // Draw legs
        this.ctx.beginPath();
        this.ctx.rect(
            x - this.quiz.signs.width.min/2 - this.quiz.signs.legs.size.width/2 + this.quiz.signs.legs.margin,
            y + signHeight/2,
            this.quiz.signs.legs.size.width,
            this.quiz.signs.legs.size.height
        );
        this.ctx.fill();
        
        this.ctx.beginPath();
        this.ctx.rect(
            x + this.quiz.signs.width.min/2 - this.quiz.signs.legs.size.width/2 - this.quiz.signs.legs.margin,
            y + signHeight/2,
            this.quiz.signs.legs.size.width,
            this.quiz.signs.legs.size.height
        );
        this.ctx.fill();

        // Apply sign color styles
        this.ctx.fillStyle = this.quiz.signs.style.color.background;
        this.ctx.strokeStyle = this.quiz.signs.style.color.border;
        this.ctx.lineWidth = this.quiz.signs.style.lineWidth;

        // Draw sign
        this.ctx.beginPath();
        this.ctx.rect(
            x - signWidth/2,
            y - signHeight/1.9,
            signWidth,
            signHeight
        );
        this.ctx.fill();
        this.ctx.stroke();

        // Draw text
        this.ctx.fillStyle = this.quiz.signs.style.color.foreground;
        this.ctx.fillText(city, x, y);
    }
}