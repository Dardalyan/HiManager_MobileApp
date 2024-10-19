import * as r from 'react';
import * as rn from 'react-native';
import POST from '../../requests/post/request';
import DeveloperInfo from '../developer/MyInfo';
import AsyncStorageManagement from '../../storage/asyncStorage';


class LoginPage extends r.Component{
    constructor(props) {
        super(props);
    }

    state = {
        email: '',
        password: '',
        animation:{
            title: new rn.Animated.Value(0),
            emailLabel: new rn.Animated.Value(0),
            emailInput: new rn.Animated.Value(0),
            passwordLabel: new rn.Animated.Value(0),
            passwordInput: new rn.Animated.Value(0),
            loginButton: new rn.Animated.Value(0),
        },
    };

    onEmailChange = (email)=>{
        this.setState({email: email});
    };
    onPasswordChange = (password)=>{
        this.setState({password: password});
    };

    handleLogin = async ()=>{
        if(this.state.email && this.state.password){
            let token = await POST.login(this.state.email,this.state.password);
            if(token == null){
                rn.Alert.alert('Failed','Email or password is incorrect !');
            }else if(token === 401){
                rn.Alert.alert('Access Denied','You are not authorized !');
            }else{
                await AsyncStorageManagement.store('token',token);
                this.props.navigation.navigate('Home');
            }
        }else{
            rn.Alert.alert('Warning','Please enter a valid email and password!');
        }
    };


    triggerAnimation = ()=>{
        rn.Animated.stagger(200, [
            rn.Animated.timing(this.state.animation.title, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
            }),
            rn.Animated.timing(this.state.animation.emailLabel, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
            }),
            rn.Animated.timing(this.state.animation.emailInput, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
            }),
            rn.Animated.timing(this.state.animation.passwordLabel, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
            }),
            rn.Animated.timing(this.state.animation.passwordInput, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
            }),
            rn.Animated.timing(this.state.animation.loginButton, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
            }),
        ]).start();
    };

    componentDidMount() {
        this.triggerAnimation();

        this.focusListener = this.props.navigation.addListener('focus', () => {
            this.setState(prevState => ({
                email: '',
                password: '',
                animation: {
                    title: new rn.Animated.Value(0),
                    emailLabel: new rn.Animated.Value(0),
                    emailInput: new rn.Animated.Value(0),
                    passwordLabel: new rn.Animated.Value(0),
                    passwordInput: new rn.Animated.Value(0),
                    loginButton: new rn.Animated.Value(0),
                },
            }), this.triggerAnimation);
        });
    }

    componentWillUnmount() {
        if (this.focusListener) {
            this.focusListener();
        }
    }

    render = ()=>{

        return (
            <rn.SafeAreaView style={this.styles.safeView}>

                <rn.Animated.View style={{opacity:this.state.animation.title}}>
                    <rn.View id={'titleView'} style={this.styles.title.view}>
                        <rn.Text id={'title'} style={this.styles.title.text}>Welcome To HiManager !</rn.Text>
                    </rn.View>
                </rn.Animated.View>

                {/* FORM */}
                <rn.View id={'formView'} style={this.styles.formView}>

                    {/* EMAIL */}
                    <rn.View id={'emailView'} style={this.styles.inView}>
                        <rn.Animated.View style={{opacity: this.state.animation.emailLabel}}>
                            <rn.View id={'labelView1'} style={this.styles.labelView}>
                                <rn.Text id={'label1'} style={this.styles.label}>Email*</rn.Text>
                            </rn.View>
                        </rn.Animated.View>

                        <rn.Animated.View style={{opacity: this.state.animation.emailInput}}>
                            <rn.TextInput onChangeText={this.onEmailChange} placeholder={'Please enter your email...'}
                                          autoCapitalize={'none'} value={this.state.email}
                                          id={'emailInput'} style={this.styles.input}></rn.TextInput>
                        </rn.Animated.View>
                    </rn.View>

                    {/* PASSWORD */}
                    <rn.View id={'passView'} style={this.styles.inView}>
                        <rn.Animated.View style={{opacity: this.state.animation.passwordLabel}}>
                            <rn.View id={'labelView2'} style={this.styles.labelView}>
                                <rn.Text id={'label2'} style={this.styles.label}>Password*</rn.Text>
                            </rn.View>
                        </rn.Animated.View>

                        <rn.Animated.View style={{opacity: this.state.animation.passwordInput}}>
                            <rn.TextInput onChangeText={this.onPasswordChange}
                                          secureTextEntry={true} placeholder={'Please enter your password...'}
                                          autoCapitalize={'none'} value={this.state.password}
                                          id={'passwordInput'} style={this.styles.input}></rn.TextInput>
                        </rn.Animated.View>


                    </rn.View>

                    {/* LOGIN BUTTON */}
                    <rn.Animated.View style={{opacity: this.state.animation.loginButton}}>
                        <rn.View id={'loginView'} style={this.styles.loginButton.view}>
                            <rn.TouchableOpacity onPress={this.handleLogin} key={'loginButton'}
                                                 style={this.styles.loginButton.button}>
                                <rn.Text id={'loginText'} style={this.styles.loginButton.text}>LOGIN</rn.Text>
                            </rn.TouchableOpacity>
                        </rn.View>
                    </rn.Animated.View>


                </rn.View>

                {/* MY INFO :) */}
                <DeveloperInfo></DeveloperInfo>
            </rn.SafeAreaView>
        );
    };


    styles = rn.StyleSheet.create({
        safeView: {
            borderWidth:5,
            height:'100%',
        },
        title:{
            view:{
                width:'100%',
                margin:'auto',
                marginBottom:'25%',
                marginTop:'25%',
            },
          text:{
                textAlign:'center',
                fontSize:25,
          },
        },
        formView: {
            height:'auto',
            width:'100%',
            marginTop:'1%',
        },
        inView: {
            margin:5,
            marginTop:'3%',
            marginBottom:'3%',

        },
        labelView:{
            marginTop:'1%',
            marginBottom:'1%',
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
        loginButton:{
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


export default LoginPage;
