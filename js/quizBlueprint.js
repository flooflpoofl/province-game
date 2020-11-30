const quizBlueprint = (cvsWidth, cvsHeight) => {

    const blueprint = {
        header: {
            firstLine: {
                position: {
                    x: 1/2 * cvsWidth,
                    y: 12/100 * cvsHeight
                },
                style: {
                    color: '#f8f8f8',
                    fontFamily: 'Grandstander',
                    fontSize: 1/16 * cvsHeight
                }
            },
            secondLine: {
                position: {
                    x: 1/2 * cvsWidth,
                    y: 22/100 * cvsHeight
                },
                style: {
                    color: 'white',
                    fontFamily: 'Grandstander',
                    fontSize: 1/12 * cvsHeight
                }
            },
            
        },
        signs: {
            width: {
                min: 1/6 * cvsWidth,
                max: 1/4 * cvsWidth
            },
            legs: {
                size: {
                    height: 1/25 * cvsHeight,
                    width: 1/150 * cvsWidth
                },
                margin: 1/50 * cvsWidth,
                style: {
                    color: '#555555'
                }
            },
            style: {
                color: {
                    background: '#095390',
                    foreground: 'white',
                    border: 'white'
                },
    
                fontFamily: 'RoadSign',
                fontSize: 1/30 * cvsHeight,
    
                lineWidth: 1/300 * cvsWidth
            }
        }
    };
    
    return blueprint;
};