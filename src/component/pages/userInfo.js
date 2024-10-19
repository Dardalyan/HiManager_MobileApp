import * as r from 'react';
import * as rn from 'react-native';
import DeveloperInfo from '../developer/MyInfo';
import Navbar from '../navbar/TopNavBar';
import SelectableButton from '../buttons/SelectableButton';
import Role from '../../model/Role';
import {Text} from 'react-native';
import POST from '../../requests/post/request';
import GET from '../../requests/get/request';
import LoadingCircle from '../buttons/LoadingCircle';


class UserInfoPage extends r.Component {
    constructor(props) {
        super(props);
        this.possibleRoles = [Role.admin,Role.owner,Role.manager,Role.moderator,Role.employee]
    }

    state = {
        selectedRoles:[],
        loading:true,
        user:null,
    };

    getUserById = async ()=>{
        let user = await GET.getUserById(this.uid);
        if(user != null && user !== 401){
            this.setState({user:user,loading:false,selectedRoles:user.roles.map(r => r.roleName)});
        }else if(user === 401){
            rn.Alert.alert('Your session has expired ! ');
            this.props.navigation.navigate('Login');
        }
        else{
            rn.Alert.alert('404','User cannot be found !');
            this.props.navigation.navigate('Home');
        }
    };

    componentDidMount() {
        this.uid = this.props.route.params?.uid;
        if(this.uid){
            this.getUserById();
        }else{
            this.props.navigation.navigate('Home');
        }

        this.focusListener = this.props.navigation.addListener('focus', () => {
            this.getUserById();
        });
    };

    componentWillUnmount() {
        if (this.focusListener) {
            this.focusListener();
        }
    }

    apply = async ()=>{
        let result = await POST.addRole(this.state.user.id,this.state.selectedRoles);
        if(result){
            rn.Alert.alert('Succesful','Roles has been appointed !');
            this.props.navigation.navigate('UserInfo');
        }else if(result === 401){
            rn.Alert.alert('Your session has expired ! ');
            this.props.navigation.navigate('Login');
        }
        else{
            rn.Alert.alert('Failed','Roles cannot be appointed !');
        }
    };

    return= ()=>{
        this.props.navigation.goBack();
    };



    render = ()=>{
        if(this.state.loading){
            return (
                <rn.SafeAreaView style={this.styles.outerSafeView}>
                    {/* NAVBAR */}
                    <Navbar navigation={this.props.navigation} title={'Info'}></Navbar>

                    {/* LOADING CIRCLE*/}
                    <LoadingCircle></LoadingCircle>

                    {/* MY INFO :) */}
                    <DeveloperInfo></DeveloperInfo>
                </rn.SafeAreaView>
            );
        } else {
            return (
                <rn.SafeAreaView id={'safeView'} style={this.styles.outerSafeView}>

                    {/* NAVBAR */}
                    <Navbar navigation={this.props.navigation} onPressReturn={this.returnToHome} title={'Info'}></Navbar>

                    {/* FORM */}
                    <rn.View id={'formView'} style={this.styles.user.view}>

                        {/* USER ID*/}
                        <rn.View id={'idView'} style={this.styles.user.info.view}>
                            <rn.Text id={'label_id'} style={this.styles.user.info.text}>User ID*</rn.Text>
                            <rn.Text id={'id'}  style={this.styles.user.info.text}>{this.state.user.id}</rn.Text>
                        </rn.View>

                        {/* USER EMAIL*/}
                        <rn.View id={'emailView'} style={this.styles.user.info.view}>
                            <rn.Text id={'label_email'} style={this.styles.user.info.text}>Email*</rn.Text>
                            <rn.Text id={'email'} style={this.styles.user.info.text}>{this.state.user.email}</rn.Text>
                        </rn.View>

                        {/* USER NAME*/}
                        <rn.View id={'nameView'} style={this.styles.user.info.view}>
                            <rn.Text id={'label_name'} style={this.styles.user.info.text}>Name*</rn.Text>
                            <rn.Text id={'name'} style={this.styles.user.info.text}>{this.state.user.name}</rn.Text>
                        </rn.View>

                        {/* USER SURNAME*/}
                        <rn.View id={'surnameView'} style={this.styles.user.info.view}>
                            <rn.Text id={'label_surname'} style={this.styles.user.info.text}>Surname*</rn.Text>
                            <rn.Text id={'surname'} style={this.styles.user.info.text}>{this.state.user.surname}</rn.Text>
                        </rn.View>
                    </rn.View>

                    {/* ROLES TITLE */}
                    <rn.View id={'roleTitleView'} style={this.styles.user.roles.titleView}>
                        <Text id={'roleTitle'} style={this.styles.user.roles.title}>Roles</Text>
                    </rn.View>

                    {/* ROLES */}
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
                                }} isSelected={this.state.user.roles.some(r=>r.roleName === role)} style={this.styles.user.roles} selectedColor={'#1ED8AD'} text={role}></SelectableButton>
                            );
                        })}
                    </rn.View>

                    {/* APPLY */}
                    <rn.View id={'buttonView'} style={this.styles.apply.view}>
                        <rn.TouchableOpacity onPress={this.apply} id={'applyButton'} style={this.styles.apply.button}>
                            <rn.Text style={this.styles.apply.text}>APPLY</rn.Text>
                        </rn.TouchableOpacity>
                    </rn.View>

                    {/* MY INFO :) */}
                    <DeveloperInfo></DeveloperInfo>
                </rn.SafeAreaView>
            );
        }
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
        }
    });
}

export default UserInfoPage;
