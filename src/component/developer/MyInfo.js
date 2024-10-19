import {Component} from 'react';
import * as rn from 'react-native';


class DeveloperInfo extends Component {

    constructor(props) {
        super(props);
    }

    render = ()=> {
        return (
            <rn.SafeAreaView style={this.styles.developer.safeView}>
                <rn.Text style={this.styles.developer.text}>Designed and Implemented</rn.Text>
                <rn.Text style={this.styles.developer.text}>by</rn.Text>
                <rn.Text style={this.styles.developer.text}>Dardalyan</rn.Text>
            </rn.SafeAreaView>
        );
    };

    styles = rn.StyleSheet.create({
        developer:{
            safeView:{
                marginTop:'auto',
                marginBottom:0,
                alignItems:'center',
                padding:5,
            },
            text:{
                padding:2,
            },
        },
    })
}

export default DeveloperInfo;
