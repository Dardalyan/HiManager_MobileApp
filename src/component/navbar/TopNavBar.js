import * as r from 'react';
import * as rn from 'react-native';
import {Component} from 'react';
import ReturnButton from '../buttons/ReturnButton';
import ShowUpButton from '../buttons/ShowUpButton';
import RightMenuBar from '../menu/RightMenuBar';

class Navbar extends Component {

    constructor(props) {
        super(props);
    }

    state= {
        showUpDisplay: 'none',
    };

    onPressMenuBar = ()=> {
        this.setState({showUpDisplay: this.state.showUpDisplay === 'flex' ? 'none' : 'flex'});
    };

    componentDidMount() {
        if(this.state.showUpDisplay !== 'none'){
            this.setState({showUpDisplay: 'none'});
        }
        this.focusListener = this.props.navigation.addListener('focus', () => {
            this.setState({showUpDisplay: 'none'});
        });
    }

    componentWillUnmount() {
        if (this.focusListener) {
            this.focusListener();
        }
    }


    render = ()=>{
        return(
            <rn.View>
                <rn.View style={this.styles.navbar}>
                    {/* RETURN BUTTON */}
                    <ReturnButton  disabled={this.props.title == 'Home' ? true : false}
                                   isHome={this.props.title == 'Home' ? true : false}
                                   style={this.styles.returnButton}
                                   onPress={()=>{this.props.navigation.goBack();}}>
                    </ReturnButton>

                    {/* TOP NAVBAR TITLE */}
                    <rn.Text style={this.styles.title}>{this.props.title}</rn.Text>

                    {/* SHOW UP BUTTON (RIGHT MENU BAR) */}
                    <ShowUpButton onPressShowUp={this.onPressMenuBar}
                                  style={this.styles.menu}>
                    </ShowUpButton>
                </rn.View>

                {/* RIGHT MENU BAR & CONDITION*/}
                {this.state.showUpDisplay === 'flex' && (
                    <RightMenuBar title={this.props.title}  navigation={this.props.navigation} />
                )}
            </rn.View>
        );
    };


    styles = rn.StyleSheet.create({
        navbar: {
            height: 60,
            width: '100%',
            backgroundColor: '#DE4B8B',
            display: 'flex',
            flexDirection: 'row',
            borderBottomWidth:1,
            borderBottomColor:'white',
        },
        returnButton: {
            backgroundColor:'transparent',
            justifyContent: 'center',
            marginLeft:0,
            width:'20%',
            borderRightWidth: this.props.title == 'Home' ? 0 : 3,
            borderTopRightRadius:25,
            borderTopLeftRadius:25,
            borderRightColor:'white',

        },
        title:{
            margin:'auto',
            fontSize:30,
            color:'white',
            textAlign:'center',
        },
        menu:{
            backgroundColor:'transparent',
            justifyContent:'center',
            marginRight:0,
            width:'20%',
            borderLeftWidth:3,
            borderLeftColor:'white',

            borderTopRightRadius:25,
            borderTopLeftRadius:25,
        },
    });
}

export  default Navbar;
