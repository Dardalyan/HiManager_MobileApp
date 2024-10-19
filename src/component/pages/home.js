import * as r from 'react';
import * as rn from 'react-native';
import Navbar from '../navbar/TopNavBar';
import GET from '../../requests/get/request';
import SearchBar from '../buttons/SearchBar';
import DeveloperInfo from '../developer/MyInfo';
import LoadingCircle from '../buttons/LoadingCircle';
import DELETE from '../../requests/delete/request';

class HomePage extends r.Component{
    constructor(props) {
        super(props);
    }
    state = {
        users:null,
        searchResult: null,
        onSearching: false,
        loading:true,
    };

    getAllUsers = async ()=>{
        let users = await GET.getAllUsers();
        if(users != null && users !== 401){
            this.setState({users:users,loading:false,searchResult:null,onSearching: false,});
        }else if(users === 401){
            rn.Alert.alert('Your session has expired ! ');
            this.props.navigation.navigate('Login');
        }
        else{
            rn.Alert.alert('Access Denied','You are not authorized !');
            this.props.navigation.navigate('Login');
        }
    };

    componentDidMount() {
        this.getAllUsers();

        this.focusListener = this.props.navigation.addListener('focus', () => {
            this.getAllUsers();
        });
    }

    componentWillUnmount() {
        if (this.focusListener) {
            this.focusListener();
        }
    }

    deleteUsers = ()=>{
        rn.Alert.alert('Are you sure ?',`You are deleting the user with ID:${this.state.searchResult.at(0).id}, ${this.state.searchResult.at(0).name} ${this.state.searchResult.at(0).surname}`,[

            // OPTION DELETE
            {
                text: 'Delete',
                onPress: async ()=>{
                    let user = await DELETE.deleteUser(this.state.searchResult.at(0));
                    let message = '';

                    if(user != null && user !== 401){
                        message += `The user with ID: ${user.id}, ${user.name} ${user.surname}\n has been deleted !`;
                        rn.Alert.alert('Successful', message);
                        await this.getAllUsers();
                    }else if(user === 401){
                        rn.Alert.alert('Your session has expired ! ');
                        this.props.navigation.navigate('Login');
                    }
                    else {
                        user = this.state.searchResult.at(0);
                        message += `For the user with ID: ${user.id}, ${user.name} ${user.surname} cannot be deleted !`;
                        rn.Alert.alert('Failed',message);
                        await this.getAllUsers();
                    }
                },
            },

            // OPTION CANCEL
            {
                text: 'Cancel',
                onPress:()=>{},
            },
        ]);
    };

    onChangeSearch = (text)=>{
        this.setState({onSearching: true});
        let isSearchingID =  Number.isNaN(parseInt(text));

        // To handle some letters like 'İ,Ğ and etc.'
        const stringNormalization = (str)=>{
            return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        };

        let searchedUsers = isSearchingID ? this.state.users.filter(
            user=> stringNormalization(user.name).toLowerCase().includes(stringNormalization(text).toLowerCase())
                || stringNormalization(user.surname).toLowerCase().includes(stringNormalization(text).toLowerCase()))
           : this.state.users.filter(user => user.id == text);

        this.setState({searchResult: searchedUsers});

        if(text.trim().length <= 0){
            this.setState({onSearching: false,searchResult: null});
        }
    };

    allUsersInScrollView = (inSearchView = this.state.onSearching) => {
        let userList = inSearchView ? this.state.searchResult : this.state.users;
        if(this.state.loading){
            // On loading in the scroll view
            return (
                <rn.SafeAreaView style={{alignItems: 'center',marginTop:'20%'}}>
                    {/* LOADING CIRCLE */}
                    <LoadingCircle></LoadingCircle>
                </rn.SafeAreaView>
            );
        }else{
            return userList && userList.map(user=>{
                return (
                    <rn.TouchableOpacity key={user.id} style={this.styles.usersMap.button}
                    onPress={()=>{
                        this.props.navigation.navigate('UserInfo',{uid:user.id});
                    }}>

                        {/* FOR EACH USER IS A BUTTON TO GET MORE INFORMATION AND TO MAKE SOME OPERATIONS */}
                        <rn.View key={user.id} style={this.styles.usersMap.textView}>
                            <rn.Text style={this.styles.usersMap.text}>{user.id}</rn.Text>
                        </rn.View>
                        <rn.View key={user.name} style={this.styles.usersMap.textView}>
                            <rn.Text style={this.styles.usersMap.text} >{user.name}</rn.Text>
                        </rn.View>
                        <rn.View key={user.surname} style={this.styles.usersMap.textView}>
                            <rn.Text style={this.styles.usersMap.text}>{user.surname}</rn.Text>
                        </rn.View>

                    </rn.TouchableOpacity>
                );
            });
        }
    };



    render = ()=>{
        const dynamicRemoveButtonBGColor = {
            backgroundColor: this.state.onSearching ? (this.state.searchResult && this.state.searchResult.length == 0 ? 'gray' : (this.state.searchResult.length !== 1 ? 'gray' : '#C11755')) : 'gray'
        };

        return(
          <rn.SafeAreaView id={'safeview'} style={{height:'100%',zIndex:-1}}>

              {/* NAVBAR */}
              <Navbar showUpDisplay={'none'} navigation={this.props.navigation}  title={'Home'} ></Navbar>

              {/* SHOWING ALL USERS */}
              <rn.SafeAreaView id={'contentView'} style={{marginTop:'2%',zIndex:-1}}>
                  {/* USER TITLE */}
                  <rn.View id={'userTitleView'} style={this.styles.usersMap.title}>
                      <rn.Text style={{fontSize: 20, color: 'white'}}>Users</rn.Text>
                  </rn.View>

                  {/* SUB TITLES */}
                  <rn.View id={'subtitleView'} style={this.styles.usersMap.subTitle}>
                      <rn.Text id={'subTitleID'} style={{flex: 1, textAlign: 'center'}}>ID</rn.Text>
                      <rn.Text id={'subTitleNAME'} style={{flex: 1, textAlign: 'center'}}>NAME</rn.Text>
                      <rn.Text id={'subTitleSURNAME'} style={{flex: 1, textAlign: 'center'}}>SURNAME</rn.Text>
                  </rn.View>

                   {/* USERS */}
                  <rn.ScrollView id={'usersScrollView'} style={this.styles.usersMap.scrollView}>
                      {this.allUsersInScrollView()}
                  </rn.ScrollView>

              </rn.SafeAreaView>

              {/* SEARCHING USERS */}
              <rn.SafeAreaView id={'searchView'} style={this.styles.search.safeView}>

                  {/* SEARCH TITLE */}
                  <rn.View id={'searchTitleview'} style={this.styles.search.title}>
                      <rn.Text id={'searchTitle'} style={{fontSize: 20, color: 'black'}}>Find User</rn.Text>
                  </rn.View>

                  {/* SEARCH BAR */}
                  <SearchBar onChangeText={this.onChangeSearch}></SearchBar>

              </rn.SafeAreaView>

              {/* BUTTONS */}
              <rn.SafeAreaView id={'buttonsView'} style={this.styles.manage.safeView}>

                  {/* CREATE BUTTON */}
                  <rn.TouchableOpacity id={'createButton'} style={this.styles.manage.createButton}
                                       onPress={()=>{this.props.navigation.navigate('CreateUser')}}
                  >
                      <rn.Text id={'createButtonText'} style={this.styles.manage.createButtonText}>Add New User</rn.Text>

                  </rn.TouchableOpacity>

                  {/* REMOVE BUTTON */}
                  <rn.TouchableOpacity id={'removeButton'} onPress={this.deleteUsers} style={[this.styles.manage.removeButton, dynamicRemoveButtonBGColor]}
                  disabled={this.state.onSearching ? (this.state.searchResult && this.state.searchResult.length == 0 ? true : (this.state.searchResult.length !== 1 ? true : false)) : true}>

                      <rn.Text id={'removeButtonText'} style={this.styles.manage.removeButtonText}>Remove</rn.Text>

                  </rn.TouchableOpacity>

              </rn.SafeAreaView>

              {/* MY INFO :) */}
              <DeveloperInfo></DeveloperInfo>

          </rn.SafeAreaView>
      );
    };

    styles = rn.StyleSheet.create({
        usersMap: {
            title: {
                marginTop: '4%',
                width: '50%',
                alignItems: 'center',
                margin:'auto',
                borderBottomWidth:0,
                borderTopWidth:2,
                borderLeftWidth:2,
                borderRightWidth:2,
                borderRadius:5,
                borderBottomRightRadius:0,
                borderBottomLeftRadius:0,
                backgroundColor:'#00B7BD',
            },
            subTitle:{
                borderTopWidth:2,
                borderBottomWidth:2,
                flexDirection:'row',
                justifyContent:'space-between',
                padding:5,
            },
            scrollView: {
                padding: 5,
                borderWidth: 2,
                borderRadius:10,
                borderStyle: 'solid',
                borderColor: 'black',
                width: '100%',
                height: '35%',
                marginTop: '1%',

            },
            button:{
                padding:5,
                margin:10,
                borderWidth:2,
                borderColor:'gray',
                display:'flex',
                flexDirection:'row',
                alignItems:'center',
                justifyContent:'space-between',
                backgroundColor:'#00B7BD',
            },
            textView:{
                flex:1,
                padding:0,
                borderBottomWidth:1,
                margin:5 ,
            },
            text:{
                textAlign:'center',
                color:'white',
                flex:1,
            },
        },
        search:{
            safeView:{
                padding:10,
                marginTop:'3%',
            },
            title:{
                marginTop:'2%',
                width:'100%',
                alignItems:'center',
                borderBottomWidth:2,
                backgroundColor:'transparent',
            },
        },
        manage:{
            safeView:{
                marginTop:'5%',
                width:'100%',
                alignItems:'center',
            },
            createButton:{
                marginTop:'3%',
                width:'95%',
                borderWidth:2,
                borderRadius:10,
                margin:'auto',
                height:50,
                backgroundColor:'#17C12D',
            },
            createButtonText:{
                margin:'auto',
                color:'white',
            },
            removeButton:{
                marginTop:'4%',
                width:'95%',
                borderWidth:2,
                borderRadius:10,
                margin:'auto',
                height:50,
            },
            removeButtonText:{
                margin:'auto',
                color:'white',
            },
        },
    });
}

export default HomePage;
