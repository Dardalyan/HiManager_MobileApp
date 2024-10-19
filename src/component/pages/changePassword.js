import {Component} from 'react';
import * as rn from 'react-native';
import DeveloperInfo from '../developer/MyInfo';
import Navbar from '../navbar/TopNavBar';
import GET from '../../requests/get/request';
import PUT from '../../requests/put/request';
import LoadingCircle from '../buttons/LoadingCircle';


class ChangePasswordPage extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        password: '',
        confirmPassword: '',
        loading:true,
        user:null,
    }

    getCurrentUser = async ()=>{
        let user = await GET.getCurrentUser();
        if(user != null && user !== 401){
            this.setState({user:user,loading:false});
        }else if(user === 401){
            rn.Alert.alert('Your session has expired ! ');
            this.props.navigation.navigate('Login');
        }else{
            rn.Alert.alert('404','User cannot be found !');
            this.props.navigation.navigate('Home');
        }
    };

    componentDidMount() {
        this.getCurrentUser();

        this.focusListener = this.props.navigation.addListener('focus', () => {
            this.getCurrentUser();
        });
    }

    componentWillUnmount() {
        if (this.focusListener) {
            this.focusListener();
        }
    }

    updatePassword = (text)=>{
        if(!text.includes(' ')){
            this.setState({password: text});
        }else{
            rn.Alert.alert('Alert','You cannot enter spaces in your password.');
        }
    }
    updateConfirmPassword = (text)=>{
        if(!text.includes(' ')){
            this.setState({confirmPassword: text});
        }else{
            rn.Alert.alert('Alert','You cannot enter spaces in your password.');
        }    }
    controlPass = ()=>{
        if(this.state.password !== this.state.confirmPassword ){
            rn.Alert.alert('Passwords not matched !','Please enter your passwords properly... ');
            return false;
        }
        if((this.state.password === "".trim() && this.state.confirmPassword === "".trim())){
            rn.Alert.alert('Alert','Please enter your new password.');
            return false;
        }
        if(this.state.password.length < 8 || this.state.confirmPassword < 8){
            rn.Alert.alert('Alert','Your password must be at least 8 characters.');
            return false;
        }
        return true;
    }
    changePassword  = async ()=>{
        if(this.controlPass()){
            let user = await PUT.updatePassword(this.state.user.email,this.state.password);
            if(user == null){
                rn.Alert.alert('Failed','Your password could not be changed.');
                await this.getCurrentUser();
            }
            if( user === 401){
                rn.Alert.alert('Your session has expired ! ');
                this.props.navigation.navigate('Login');
            }
            rn.Alert.alert('Successful','Your password has been changed.');
            this.props.navigation.navigate('Login');
        }
    }

    render = ()=>{
        if(this.state.loading){
            return (
                <rn.SafeAreaView style={this.styles.safeView}>
                    <Navbar navigation={this.props.navigation} title={'New Password'}></Navbar>

                    <LoadingCircle></LoadingCircle>

                    <DeveloperInfo></DeveloperInfo>
                </rn.SafeAreaView>
            );
        } else {
            return (
                <rn.SafeAreaView style={this.styles.safeView}>

                    {/* NAVBAR */}
                    <Navbar showUpDisplay={'none'} navigation={this.props.navigation} title={'New Password'}></Navbar>

                    {/* FORM */}
                    <rn.View id={'formView'} style={this.styles.formView}>

                        {/* PASSWORD  */}
                        <rn.View id={'passView'} style={this.styles.passView}>
                            <rn.View id={'labelView1'} style={this.styles.labelView}>
                                <rn.Text id={'label1'} style={this.styles.label}>Password*</rn.Text>
                            </rn.View>

                            <rn.TextInput value={this.state.password} onChangeText={this.updatePassword}
                                          secureTextEntry={true} placeholder={'Enter your new password...'}
                                          autoCapitalize={'none'}
                                          id={'passwordInput'} style={this.styles.input}></rn.TextInput>
                        </rn.View>

                        {/* CONFIRM PASSWORD */}
                        <rn.View id={'rePassView'} style={this.styles.passView}>
                            <rn.View id={'labelView2'} style={this.styles.labelView}>
                                <rn.Text id={'label2'} style={this.styles.label}>Confirm Password*</rn.Text>
                            </rn.View>

                            <rn.TextInput value={this.state.confirmPassword} onChangeText={this.updateConfirmPassword}
                                          secureTextEntry={true} placeholder={'Please confirm your password...'}
                                          autoCapitalize={'none'}
                                          id={'rePasswordInput'} style={this.styles.input}></rn.TextInput>
                        </rn.View>

                        {/* APPLY  */}
                        <rn.View id={'applyView'} style={this.styles.apply.view}>
                            {/* APPLY BUTTON (CHAGE PASSWORD) */}
                            <rn.TouchableOpacity onPress={this.changePassword} id={'applyButton'}
                                                 style={this.styles.apply.button}>
                                <rn.Text style={this.styles.apply.text}>Change Password</rn.Text>
                            </rn.TouchableOpacity>
                        </rn.View>

                    </rn.View>

                    {/* MY INFO :) */}
                    <DeveloperInfo></DeveloperInfo>
                </rn.SafeAreaView>
            );
        }
    };


    styles = rn.StyleSheet.create({
        safeView: {
            borderWidth:5,
            height:'100%',
            zIndex:-1
        },
        formView: {
            height:'auto',
            width:'100%',
            marginTop:'40%',
            zIndex:-1
        },
        passView: {
            margin:5,
            marginTop:'3%',
            marginBottom:'3%',
        },
        label: {
            textDecorationLine:'underline',
            fontSize:20,
        },
        input: {
            marginTop:'3%',
            marginBottom:'3%',
            fontSize:20,
            height:'auto',
            borderBottomWidth:2,
        },
        apply:{
            view:{
                padding:5,
                marginTop:'3%',
            },
            button:{
                borderWidth:3,
                alignItems:'center',
                width:'80%',
                borderColor:'black',
                backgroundColor:'#D83275',
                borderRadius:5,
                height:50,
                margin:'auto',

            },
            text: {
                margin:'auto',
                fontSize:20,
                color:'white',
            },
        },
    });
}

export default ChangePasswordPage;
