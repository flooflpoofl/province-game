{
    function init() {
        
        const gameWidth = 640;
        const gameHeight = Math.round(gameWidth * 3/4);
        const game = new ProvinceProficiency(gameWidth, gameHeight);

    }

    document.addEventListener('DOMContentLoaded', () => {
        init();
    });
}