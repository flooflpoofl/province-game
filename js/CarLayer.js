class CarLayer {

    constructor(canvasElement, blueprints, callbacks) {
        this.ctx = canvasElement.getContext('2d');
        this.blueprints = blueprints;
        this.callbacks = callbacks;

        this.carCallbacks = {
            onCityReached: (carId) => this.onCityReached(carId)
        }

        this.cars = undefined;
        this.setInit();

        this.isAnimating = false;
        this.animation = undefined;
        this.boundUpdate = this.update.bind(this);
    }

    setInit() {
        this.cars = [
            new Car(this.ctx, 0, this.blueprints, this.carCallbacks),
            new Car(this.ctx, 1, this.blueprints, this.carCallbacks),
            new Car(this.ctx, 2, this.blueprints, this.carCallbacks)
        ];
    }

    update() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

        this.cars.forEach(car => {
            car.update();
        });

        if (this.isAnimating) {
            this.animation = requestAnimationFrame(this.boundUpdate);
        }
    }

    startAnimation() {
        this.animation = requestAnimationFrame(this.boundUpdate);
        this.isAnimating = true;
    }

    stopAnimation() {
        cancelAnimationFrame(this.animation);
        this.isAnimating = false;
    }

    drive(carId) {
        const car = this.cars.find(car => car.id === carId);
        car.velocity.y = -car.car.speed;
    }


    onCityReached(carId) {
        this.cars = this.cars.filter(car => car.id != carId);
        this.callbacks.onCityReached(carId);
    }
}