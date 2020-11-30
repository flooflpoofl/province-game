class Car {

    constructor(ctx, id, blueprints, callbacks) {
        this.ctx = ctx;
        this.id = id;
        this.callbacks = callbacks;
        
        this.roads = blueprints.roads;
        this.car = blueprints.car;

        this.position = { x: undefined, y: undefined };
        this.velocity = { x: undefined, y: undefined };

        this.svgPath = 'M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z';
        this.body = new Path2D(this.svgPath);

        this.setInit();
    }

    setInit() {
        this.position = {
            x: this.roads.toCities.locations[this.id],
            y: this.roads.main.location + this.roads.main.width/2
        };
        this.velocity = {
            x: this.car.wiggle.speed * (Math.random() + 1),
            y: 0
        };
    }

    update() {

        const roadEnd = this.roads.main.location - this.roads.toCities.lengths[this.id];
        const wiggleLeft = this.roads.toCities.locations[this.id] - this.car.wiggle.left;
        const wiggleRight = this.roads.toCities.locations[this.id] + this.car.wiggle.right;

        if (this.position.y < roadEnd) this.callbacks.onCityReached(this.id);

        if (this.position.x <= wiggleLeft) { this.velocity.x *= -1 }
        if (this.position.x >= wiggleRight) { this.velocity.x *= -1 }

        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        this.draw();
    }

    draw() {

        this.ctx.save();
        const inputStart = this.roads.main.location + this.roads.main.width/2;
        const inputEnd = this.roads.main.location - this.roads.toCities.lengths[this.id];
        const outputStart = 1;
        const outputEnd = 0;

        const slope = (outputEnd - outputStart) / (inputEnd - inputStart);
        const output = Math.max(1 + slope * (this.position.y - inputStart), 0);

        this.ctx.globalAlpha = output;
        this.drawBody();

        this.ctx.restore();
    }

    drawBody() {

        this.ctx.save();

        this.ctx.translate(
            this.position.x - this.car.size/2,
            this.position.y - this.car.size/2
        );

        this.ctx.scale(this.car.size/24, this.car.size/24);

        this.ctx.fillStyle = this.car.style.colors[this.id];
        this.ctx.fill(this.body);

        this.ctx.restore();
    }

        

}