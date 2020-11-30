const roadsBlueprint = (cvsWidth, cvsHeight) => {

    const blueprint = {
        main: {
            location: 16.5/20 * cvsHeight,
            width: 3.5/20 * cvsHeight,
            markings: {
                locations: [
                    1/8 * cvsWidth,
                    3/8 * cvsWidth,
                    5/8 * cvsWidth,
                    7/8 * cvsWidth
                ],
                size: {
                    length: 1/20 * cvsWidth,
                    height: 1/150 * cvsHeight
                },
                style: {
                    color: '#999999'
                }
            }
        },
        toCities: {
            locations: [
                1/6 * cvsWidth,
                1/2 * cvsWidth,
                5/6 * cvsWidth
            ],
            width: {
                close: 1/6 * cvsWidth,
                far: 1/20 * cvsWidth
            },
            lengths: [
                2.2/12 * cvsHeight,
                2.6/12 * cvsHeight,
                2.4/12 * cvsHeight
            ]
        },
        style: {
            color: '#333333'
        }
    };

    return blueprint;
};