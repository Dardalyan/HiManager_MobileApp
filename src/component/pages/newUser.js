import * as r from 'react';
import * as rn from 'react-native';
import DeveloperInfo from '../developer/MyInfo';
import Navbar from '../navbar/TopNavBar';
import SelectableButton from '../buttons/SelectableButton';
import Role from '../../model/Role';
import {Text} from 'react-native';
import POST from '../../requests/post/request';

class CreateUserPage extends r.Component {
    constructor(props) {
        super(props);
        this.possibleRoles = [Role.admin,Role.owner,Role.manager,Role.moderator,Role.employee]
    }

    state = {
        selectedRoles:[],
        email:null,
        password:null,
        name:null,
        surname:null,
        newUser: null,
    };

    create = async ()=>{
        let newUser = {
            'email':this.state.email,
            'password':this.state.password,
            'name':this.state.name,
            'surname':this.state.surname,
        };

        let result = await POST.createUser(newUser);
        if(result != null && result !== 401){
            this.setState({newUser:result});

            result = await POST.addRole(this.state.newUser.id,this.state.selectedRoles);
            if(result){
                rn.Alert.alert('Succcesful','User has been created !');
                this.props.navigation.navigate('Home');
            }else if(result === 401){
                rn.Alert.alert('Your session has expired ! ');
                this.props.navigation.navigate('Login');
            }
            else{
                rn.Alert.alert('Warning','User has been created but roles cannot be appointed !');
                this.props.navigation.navigate('Home');
            }
        }else if(result === 401){
            rn.Alert.alert('Your session has expired ! ');
            this.props.navigation.navigate('Login');
        }
        else{
            rn.Alert.alert('Failed','User is already exist or cannot be created !');
        }
    };

    emailOnChange = (text)=>{
        this.setState({email:text});
    };
    nameOnChange = (text)=>{
        this.setState({name:text});
    };
    surnameOnChange = (text)=>{
        this.setState({surname:text});
    };
    passwordOnChange = (text)=>{
        this.setState({password:text});
    };

    render = ()=>{
        return (
                <rn.SafeAreaView id={'safeView'} style={this.styles.outerSafeView}>

                    {/* NAVBAR */}
                    <Navbar navigation={this.props.navigation} title={'New User'}></Navbar>

                    {/* FORM */}
                    <rn.View id={'formView'} style={this.styles.user.view}>

                        {/* USER EMAIL*/}
                        <rn.View id={'emailView'} style={this.styles.user.info.view}>
                            <rn.Text id={'label_email'} style={this.styles.user.info.text}>Email*</rn.Text>
                            <rn.TextInput id={'email'} autoCapitalize={'none'} onChangeText={this.emailOnChange} style={[this.styles.user.info.text,this.styles.user.info.textInput]}>@himanager.com</rn.TextInput>
                        </rn.View>

                        {/* USER PASSWORD*/}
                        <rn.View id={'passwordView'} style={this.styles.user.info.view}>
                            <rn.Text id={'label_password'}  style={this.styles.user.info.text}>Password*</rn.Text>
                            <rn.TextInput id={'password'} autoCapitalize={'none'} onChangeText={this.passwordOnChange} style={[this.styles.user.info.text,this.styles.user.info.textInput]}></rn.TextInput>
                        </rn.View>

                        {/* USER NAME*/}
                        <rn.View id={'nameView'} style={this.styles.user.info.view}>
                            <rn.Text id={'label_name'}  style={this.styles.user.info.text}>Name*</rn.Text>
                            <rn.TextInput id={'name'} autoCapitalize={'none'} onChangeText={this.nameOnChange} style={[this.styles.user.info.text,this.styles.user.info.textInput]}></rn.TextInput>
                        </rn.View>

                        {/* USER SURNAME*/}
                        <rn.View id={'surnameView'} style={this.styles.user.info.view}>
                            <rn.Text id={'label_surname'}  style={this.styles.user.info.text}>Surname*</rn.Text>
                            <rn.TextInput id={'surname'} autoCapitalize={'none'} onChangeText={this.surnameOnChange} style={[this.styles.user.info.text,this.styles.user.info.textInput]}></rn.TextInput>
                        </rn.View>
                    </rn.View>

                    {/* ROLE TITLE */}
                    <rn.View id={'roleTitleView'} style={this.styles.user.roles.titleView}>
                        <Text id={'roleTitle'} style={this.styles.user.roles.title}>Roles</Text>
                    </rn.View>

                    {/*  ROLES  */}
                    <rn.View id={'rolesView'} style={this.styles.user.roles.view}>
                        {this.possibleRoles.map(role=>{
                            return(
                                <SelectableButton key={role} onPressIn={()=>{
                                    const roles = [];
                                    if(this.state.selectedRoles.includes(role)){
                                        this.state.selectedRoles.forEach(r=>{
                                            if(role != r)
                                                roles.push(r);
                                        });
                                    }else{
                                        roles.push(role);
                                        this.state.selectedRoles.forEach(r=>{
                                            roles.push(r);
                                        });
                                    }
                                    this.setState({selectedRoles:roles});
                                }} isSelected={this.state.selectedRoles.some(r=>r === role)} style={this.styles.user.roles} selectedColor={'#1ED8AD'} text={role}></SelectableButton>
                            );
                        })}
                    </rn.View>

                    {/* CREATE */}
                    <rn.View id={'buttonView'} style={this.styles.apply.view}>
                        <rn.TouchableOpacity onPress={this.create} id={'createButton'} style={this.styles.apply.button}>
                            <rn.Text style={this.styles.apply.text}>CREATE</rn.Text>
                        </rn.TouchableOpacity>
                    </rn.View>

                    {/* MY INFO */}
                    <DeveloperInfo></DeveloperInfo>
                </rn.SafeAreaView>
            );
        };

    styles = rn.StyleSheet.create({
        outerSafeView: {
            height: '100%',
            width: '100%',
            borderWidth:3,
        },
        user:{
            view:{
                borderWidth:3,
                borderRadius:10,
                margin:5,
                borderColor:'gray',
                padding:10,
                display:'flex',
                flexDirection:'column',
                marginTop:'5%',
                zIndex:-1,
            },
            info:{
                view:{
                    borderBottomWidth:2,
                    borderBottomColor:'#00B7BD',
                    padding:5,
                    display:'flex',
                    flexDirection:'row',
                    justifyContent:'space-between',
                    marginTop:'3%',
                },
                text:{
                    fontSize:19,
                },
                textInput:{
                    textAlign:'right',
                    width:'60%',
                },
            },
            roles:{
                titleView:{
                    margin:'auto',
                    width:'50%',
                    borderBottomWidth:0,
                    borderTopWidth:2,
                    borderLeftWidth:2,
                    borderRightWidth:2,
                    borderRadius:5,
                    borderBottomRightRadius:0,
                    borderBottomLeftRadius:0,
                    marginBottom:0,
                },
                title:{
                    fontSize:25,
                    textAlign:'center',
                    backgroundColor:'#00B7BD',
                    color:'white',

                },
                view:{
                    display:'flex',
                    flexDirection:'column',
                    width:'100%',
                    justifyContent:'center',
                    alignItems:'center',
                    borderBottomWidth:3,
                    borderTopWidth:3,
                    borderBottomRadius:10,
                    padding:15,
                },
                button:{
                    margin:4,
                    width:'40%',
                    borderWidth:3,
                    borderRadius:5,
                },
                text:{
                    textAlign:'center',
                    fontSize:20,
                },
            },
        },
        apply:{
            view:{
                padding:5,
                marginTop:'3%',
            },
            button:{
                borderWidth:3,
                alignItems:'center',
                width:'100%',
                borderColor:'black',
                backgroundColor:'#D83275',
                borderRadius:5,
                height:50,

            },
            text: {
                margin:'auto',
                fontSize:20,
                color:'white',
            },
        },
    });
}

export default CreateUserPage;
