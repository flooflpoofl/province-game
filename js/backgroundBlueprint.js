const backgroundBlueprint = (cvsWidth, cvsHeight) => {

    const blueprint = {
        horizon: {
            location: 12/24 * cvsHeight
        },
        sky: {
            sun: {
                location: {
                    x: 1/7 * cvsWidth,
                    y: 1/6 * cvsHeight
                },
                size: {
                    outerRadius: 1/12 * cvsWidth,
                    innerRadius: 1/15 * cvsWidth
                },
                style: {
                    color: {
                        inner: '#F2B84B',
                        outer: '#F2D95C'
                    }
                }
            },
            clouds: {},
            style: {
                color: '#7fcde7'
            }
        },
        ground: {
            hills: {
                primary: {
                    points: [
                        { x: 0, y: 0},
                        { x: 1/4 * cvsWidth, y: -3/12 * cvsHeight},
                        { x: 1/3 * cvsWidth, y: 0},
                        { x: cvsWidth, y: 0}
                    ],
                    style: {
                        color: '#3f8b4e',
                    }
                },
                secondary: {
                    points: [
                        { x: 1/2 * cvsWidth, y: 0},
                        { x: cvsWidth, y: -3/12 * cvsHeight},
                        { x: 4/3 * cvsWidth, y: 0},
                        { x: 5/3 * cvsWidth, y: 0}
                    ],
                    style: {
                        color: '#3b7145'
                    }
                }
            },
            style: {
                color: '#3f8b4e'
            }
        }
    };

    return blueprint;
};