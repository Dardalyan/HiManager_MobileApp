import * as r from 'react';
import * as rn from 'react-native';


class ReturnButton extends r.Component {
    constructor(props) {
        super(props);
    }

    render = ()=>{
        return (
            <rn.TouchableOpacity disabled={this.props.disabled} style={this.props.style}  onPress={this.props.onPress}>
                <rn.Image style={this.styles.image} source={this.props.isHome ? '' : require('../../icons/back.png')}></rn.Image>
            </rn.TouchableOpacity>
        );
    };

    styles = rn.StyleSheet.create({
        image:{
          width:45,
          height:45,
          margin:'auto',
        },
    });
}

export default ReturnButton;
