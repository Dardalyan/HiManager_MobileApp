import * as r from 'react';
import * as rn from 'react-native';

class RightMenuBar extends r.Component {
    constructor(props) {
        super(props);
    }

    logout = ()=>{
      rn.Alert.alert('Are you sure ?','You are about to logout.',[
          {
              text: 'OK',
              onPress: ()=>{
                  this.props.navigation.navigate('Login');
              },
          },
          {
              text: 'Cancel',
              onPress:()=>{},
          },
      ]);
    };

    profile = ()=>{
        this.props.navigation.navigate('Profile');
    };

    changePass = ()=>{
        this.props.navigation.navigate('ChangePass');
    };

    render = ()=>{
        return(
            <rn.View style={this.styles.menuBar}>

                {/* PROFILE BUTTON*/}
                <rn.TouchableOpacity id={'profileButton'} disabled={this.props.title === 'Profile' ? true : false} onPress={this.profile} style={this.styles.options}>
                    <rn.Text style={this.styles.text}>Profile</rn.Text>
                </rn.TouchableOpacity>

                {/* CHANGE PASSWORD BUTTON*/}
                <rn.TouchableOpacity id={'changePassbutton'} disabled={this.props.title === 'New Password' ? true : false} onPress={this.changePass} style={this.styles.options}>
                    <rn.Text style={this.styles.text}>Change Password</rn.Text>
                </rn.TouchableOpacity>

                {/* LOGOUT BUTTON*/}
                <rn.TouchableOpacity id={'logoutButton'}
                    onPress={this.logout} style={this.styles.options}>
                    <rn.Text style={this.styles.text}>Logout</rn.Text>
                </rn.TouchableOpacity>
            </rn.View>
        );
    };

    styles = rn.StyleSheet.create({
       menuBar:{
           display:'flex',
           flexDirection:'column',
           width:'60%',
           justifyContent:'center',
           backgroundColor:'#DE4B8B',
           marginLeft:'40%',
           position:'absolute',
           top:'100%',
           zIndex:1,
       },
        options:{
           borderColor:'white',
            borderStyle:'solid',
            borderWidth:2,
            borderTopWidth:0,
            borderRightWidth:0,
            padding:15,
            zIndex:1,
        },
        text:{
           textAlign:'center',
            fontSize:20,
            color:'#FFFFFF',
            zIndex:1,
        },
    });

}

export  default  RightMenuBar;
