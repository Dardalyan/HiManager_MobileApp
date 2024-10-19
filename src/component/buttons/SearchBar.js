import * as r from 'react';
import * as rn from 'react-native';
import {Keyboard} from 'react-native';

class SearchBar extends r.Component {
    constructor(props) {
        super(props);
    }

    state = {
        searching : false,
    };

    onClickSearch = ()=>{
        this.setState({searching: true});
        this.setState({editable: true});
    };

    onPressOut = ()=>{
       this.setState({searching: false});
    };


    render = ()=>{
      return(
              <rn.View style={this.styles.barView}>
                  <rn.TextInput onFocus={this.props.onFocus} onChangeText={this.props.onChangeText}
                                onPress={this.onClickSearch}  onBlur={this.onPressOut}
                                clearTextOnFocus={true} style={this.styles.searchBar}>
                  </rn.TextInput>
                  {!this.state.searching &&
                      <rn.Image source={require('../../icons/search.png')} style={this.styles.image}></rn.Image>}
              </rn.View>
      );
    };

    styles = rn.StyleSheet.create({
        barView: {
            display: 'flex',
            flexDirection: 'row',
            marginTop: '3%',
            padding: 0,
            alignItems: 'center',
        },
        image: {
            position: 'absolute',
            right: 10,
            width: 25,
            height:25,
       },
        searchBar:{
            margin:'auto',
            borderWidth:2,
            borderRadius:30,
            height:40,
            width:'100%',
            backgroundColor:'white',
        },
    });
}

export default SearchBar;
