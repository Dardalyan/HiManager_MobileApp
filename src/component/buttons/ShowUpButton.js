import * as r from 'react';
import * as rn from 'react-native';
import {Image} from 'react-native';


class ShowUpButton extends r.Component {
    constructor(props) {
        super(props);
    }

    render = ()=>{
        return (
            <rn.TouchableOpacity style={this.props.style}  onPress={this.props.onPressShowUp}>
                <Image style={this.styles.image} source={require('../../icons/menu.png')}></Image>
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

export default ShowUpButton;
