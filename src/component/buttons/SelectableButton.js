import * as r from 'react';
import * as rn from 'react-native';


class SelectableButton extends r.Component {
    constructor(props) {
        super(props);
    }

    state = {
        isSelected:this.props.isSelected,
    };



    render = ()=>{

        const isSelectedColor = {backgroundColor: this.state.isSelected ? this.props.selectedColor:'gray'};

      return (
          <rn.TouchableOpacity disabled={this.props.disabled} onPressIn={this.props.onPressIn} onPress={()=>{this.setState({isSelected:!this.state.isSelected});}}  style={[this.props.style.button]}>
              <rn.Text style={[this.props.style.text, isSelectedColor]}>{this.props.text}</rn.Text>
          </rn.TouchableOpacity>
      );
    };



}

export default SelectableButton;
