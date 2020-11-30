class BackgroundLayer {

    constructor(canvasElement, blueprints) {
        this.ctx = canvasElement.getContext('2d');
        this.blueprints = blueprints;

        this.background = blueprints.background;
        this.roads = blueprints.roads;

        this.draw();
    }


    draw() {
        this.drawSky();
        this.drawGrass();
        this.drawHills();
        this.drawRoads();
    }

    drawSky() {
        // Heaven
        this.ctx.fillStyle = this.background.sky.style.color;
        this.ctx.fillRect(
            0, 0,
            this.ctx.canvas.width,
            this.background.horizon.location);

        // Sun
        this.drawSun();
    }

    drawSun() {

        this.ctx.save();
        this.ctx.translate(
            this.background.sky.sun.location.x,
            this.background.sky.sun.location.y
        );
        // Outer layer
        this.ctx.fillStyle = this.background.sky.sun.style.color.outer;
        this.ctx.beginPath();
        this.ctx.arc(0, 0, this.background.sky.sun.size.outerRadius, 0, 2*Math.PI);
        this.ctx.fill();

        // Inner layer
        this.ctx.fillStyle = this.background.sky.sun.style.color.inner;
        this.ctx.beginPath();
        this.ctx.arc(0, 0, this.background.sky.sun.size.innerRadius,
            0, 2*Math.PI);
        this.ctx.fill();

        this.ctx.restore();
    }

    drawGrass() {
        const horizon = this.background.horizon.location

        this.ctx.fillStyle = this.background.ground.style.color;
        this.ctx.fillRect(
            0,
            horizon,
            this.ctx.canvas.width,
            this.ctx.canvas.height - horizon
        );
    }

    drawHills() {
        const horizon = this.background.horizon.location;

        // Secondary
        const sPoints = this.background.ground.hills.secondary.points;
        
        this.ctx.beginPath();
        this.ctx.moveTo(
            sPoints[0].x,
            sPoints[0].y + horizon
            );
        this.ctx.bezierCurveTo(
            sPoints[1].x,
            sPoints[1].y + horizon,

            sPoints[2].x,
            sPoints[2].y + horizon,

            sPoints[3].x,
            sPoints[3].y + horizon
        );
        this.ctx.closePath();

        this.ctx.fillStyle = this.background.ground.hills.secondary.style.color;
        this.ctx.fill();

        // Primary
        const pPoints = this.background.ground.hills.primary.points;

        this.ctx.beginPath();
        this.ctx.moveTo(
            pPoints[0].x,
            pPoints[0].y + horizon
            );
        this.ctx.bezierCurveTo(
            pPoints[1].x,
            pPoints[1].y + horizon,

            pPoints[2].x,
            pPoints[2].y + horizon,

            pPoints[3].x,
            pPoints[3].y + horizon
        );
        this.ctx.closePath();

        this.ctx.fillStyle = this.background.ground.hills.primary.style.color;
        this.ctx.fill();
    }

    drawRoads() {

        this.drawMainRoad();
        this.drawCityRoads();

    }

    drawMainRoad() {
        this.ctx.beginPath()
        this.ctx.rect(
            0,
            this.roads.main.location,
            this.ctx.canvas.width,
            this.roads.main.width
        );
        
        this.ctx.fillStyle = this.roads.style.color;
        this.ctx.fill();
    }

    drawCityRoads() {

        const roadStart = this.roads.main.location;
        const closeWidth = this.roads.toCities.width.close;
        const farWidth = this.roads.toCities.width.far;

        const roadLocations = this.roads.toCities.locations;
        const roadLengths = this.roads.toCities.lengths;

        for (let i = 0; i < 3; i++) {

            this.ctx.beginPath();

            // First point
            this.ctx.moveTo(
                roadLocations[i] - closeWidth/2,
                roadStart
            );

            // (Line to) Second point
            this.ctx.lineTo(
                roadLocations[i] - farWidth/2,
                roadStart - roadLengths[i]
            );
            

            // (Line to) Third point
            this.ctx.lineTo(
                roadLocations[i] + farWidth/2,
                roadStart - roadLengths[i]
            );

            // (Line to) Fourth point
            this.ctx.lineTo(
                roadLocations[i] + closeWidth/2,
                roadStart
            );

            // Close
            this.ctx.closePath();
            
            this.ctx.fillStyle = this.roads.style.color;
            this.ctx.fill();
        }
    }
}