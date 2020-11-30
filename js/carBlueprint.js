const carBlueprint = (cvsWidth, cvsHeight) => {

    const blueprint = {
        size: 1/8 * cvsWidth,

        speed: 3,

        wiggle: {
            speed: 1/4,
            left: 1/100 * cvsWidth,
            right: 1/100 * cvsWidth
        },
        fading: {
            opacity: {
                min: 0,
                max: 1
            }
        },
        scaling: {
            scale: {
                min: 0.5,
                max: 1
            }
        },
        style: {
            colors: ['#FFED43', '#66B2ED', '#D90C05']
        }
    };

    return blueprint;
};