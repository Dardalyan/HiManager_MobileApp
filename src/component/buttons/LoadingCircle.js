import * as r from 'react';
import * as rn from 'react-native';


class LoadingCircle extends r.Component {
    constructor(props) {
        super(props);
        this.spinValue = new rn.Animated.Value(0);
    }

    spin = () => {
        rn.Animated.loop(
            rn.Animated.timing(this.spinValue, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
            })
        ).start();
    };

    componentDidMount() {
        this.spin();
    }

    render = ()=>{
        const spin = this.spinValue.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '360deg'],
        });
        return (
            <rn.View style={this.styles.view}>
                <rn.Animated.View
                    style={[this.styles.circle, { transform: [{ rotate: spin }] }]}
                />
            </rn.View>
        );
    };

    styles = rn.StyleSheet.create({
        view: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'transparent',
        },
        circle: {
            width: 60,
            height: 60,
            borderRadius: 30,
            borderWidth: 5,
            borderColor: '#DE4B8B',
            borderTopColor: 'transparent',
        },
    });
}


export default LoadingCircle;
