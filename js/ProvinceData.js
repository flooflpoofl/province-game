class ProvinceData {

    constructor(provinceData) {
        this.provinceData = provinceData;
    }

    getProvinces() {
        return this.provinceData.map(data => data.province);
    }

    getRandomProvince() {
        return this.randFromArray(this.getProvinces());
    }

    getRandomCityFromProvince(provinceName) {
        const province = this.provinceData.find(data => data.province === provinceName);
        return this.randFromArray(province.cities);
    }

    generateRandomQuestion(numberOfOptions) {

        const correctProvince = this.getRandomProvince();
        const correctCity = this.getRandomCityFromProvince(correctProvince);

        const correct = { province: correctProvince, city: correctCity };

        let optionProvinces = this.provinceData.filter(data => data.province !== correctProvince);
        let options = [correct];

        for (let i = 0; i < (numberOfOptions - 1); i++) {

            const optionProvince = this.randFromArray(optionProvinces).province;
            const optionCity = this.getRandomCityFromProvince(optionProvince);

            options.push( { province: optionProvince, city: optionCity } );
            optionProvinces = optionProvinces.filter(data => data.province !== optionProvince);
        }

        // Shuffle the options
        this.shuffleArray(options);

        return { correct, options };
    }

    generateRandomQuiz(numberOfQuestions, numberOfOptions) {

        let quiz = [];

        for (let i = 0; i < numberOfQuestions; i++) {
            quiz.push(this.generateRandomQuestion(numberOfOptions));
        }

        return quiz;
    }

    randFromArray(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    }

    shuffleArray(arr) {
        // Taken from stack overflow
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
    }
}