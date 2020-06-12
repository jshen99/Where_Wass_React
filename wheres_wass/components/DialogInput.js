import React, { Component } from 'react';
import { StyleSheet, Text, View, Modal, TextInput, TouchableOpacity,
         Platform } from 'react-native';

class DialogInput extends Component{
  constructor(props){
    super(props);
    this.state = { inputModal: '', opening: true }
  }

  onTextChange = (text) => {
    var cleaned = ('' + text).replace(/\D/g, '')
    var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/)
    if (match) {
        var intlCode = (match[1] ? '+1 ' : ''),
            number = [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('');

        this.setState({
            inputModal: number
        });

        return;
    }

    this.setState({
        inputModal: text
    });
  }

  render(){
    let title = this.props.title || '';
    let hintInput = this.props.hintInput || '';
    let value = '';
    if (!this.state.opening) {
      value = this.state.inputModal;
    }else{
      value = this.props.initValueTextInput ? this.props.initValueTextInput : '';
    }
    console.log('Value is',value)

    let textProps = this.props.textInputProps || null;
    let modalStyleProps = this.props.modalStyle || {};
    let dialogStyleProps = this.props.dialogStyle || {};
    var cancelText = this.props.cancelText || 'Cancel';
    var submitText = this.props.submitText || 'Submit';
    var thirdButtonText = this.props.thirdButtonText || 'Third Button'
    let thirdButton
    if(this.props.thirdButtonText){
      thirdButton = <TouchableOpacity  style={styles.touch_modal}
      onPress={() => {
        this.props.submitThirdButton(this.state.inputModal);
        this.setState({ inputModal: '',opening: true })
      }}>
      <Text style={styles.btn_modal_right}>{thirdButtonText}</Text>
    </TouchableOpacity>
    }
    else{
      thirdButton=null
    }


    return(
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.props.isDialogVisible}
      	onRequestClose={() => {
          this.props.closeDialog();
          this.setState({ inputModal: '' });
      	}}>
        <View style={[styles.container, {...modalStyleProps}]}  >
          <TouchableOpacity style={styles.container} activeOpacity={1} onPress={() => { this.props.closeDialog(); this.setState({ inputModal: '',opening: true })}} >
            <View style={[styles.modal_container, {...dialogStyleProps}]} >
              <View style={styles.modal_body} >
                <Text style={styles.title_modal}>{title}</Text>
                <Text style={[this.props.message ? styles.message_modal : {height:0} ]}>{this.props.message}</Text>
                <TextInput style={styles.input_container}
                  autoCorrect={(textProps && textProps.autoCorrect==false)?false:true}
                  autoCapitalize={(textProps && textProps.autoCapitalize)?textProps.autoCapitalize:'none'}
                  clearButtonMode={(textProps && textProps.clearButtonMode)?textProps.clearButtonMode:'never'}
                  clearTextOnFocus={(textProps && textProps.clearTextOnFocus==true)?textProps.clearTextOnFocus:false}
                  keyboardType={(textProps && textProps.keyboardType)?textProps.keyboardType:'default'}
                  maxLength = {(textProps && textProps.maxLength) ? textProps.maxLength:100}
                  autoFocus={true}
                  onKeyPress={() => this.setState({ opening: false })}
                  underlineColorAndroid='transparent'
                  placeholder={hintInput}
                  multiline={true}
                  onChangeText={(textProps && textProps.keyboardType == 'phone-pad') ? this.onTextChange : (inputText) => this.setState({inputModal : inputText})}
                  value={this.state.inputModal}
                  />
              </View>
              <View style={styles.btn_container}>
                <TouchableOpacity style={styles.touch_modal}
                  onPress={() => {
                    this.props.closeDialog();
                    this.setState({ inputModal: '',opening: true })
                  }}>
                  <Text style={styles.btn_modal_left}>{cancelText}</Text>
                </TouchableOpacity>
                <View style={styles.divider_btn}></View>
                <TouchableOpacity  style={styles.touch_modal}
                  onPress={() => {
                    this.props.submitInput(this.state.inputModal);
                    this.setState({ inputModal: '',opening: true })
                  }}>
                  <Text style={styles.btn_modal_right}>{submitText}</Text>
                </TouchableOpacity>
                <View style={styles.divider_btn}></View>
                  {thirdButton}
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  }
}
const styles = StyleSheet.create({
  container:{
    flex:1,
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      android:{
        backgroundColor: 'rgba(0,0,0,0.62)'
      }
    }),
  },
  modal_container:{
    marginLeft: 30,
    marginRight: 30,
    ...Platform.select({
      ios: {
        backgroundColor:'#E3E6E7',
        borderRadius: 10,
        minWidth: 300,
      },
      android: {
        backgroundColor:'#fff',
        elevation: 24,
        minWidth: 280,
        borderRadius: 5,
      },
    }),
  },
  modal_body:{
    ...Platform.select({
      ios: {
        padding: 10,
      },
      android: {
        padding: 24,
      },
    }),
  },
  title_modal:{
    fontWeight: 'bold',
    fontSize: 20,
    ...Platform.select({
      ios: {
        marginTop: 10,
        textAlign:'center',
        marginBottom: 5,
      },
      android: {
        textAlign:'left',
      },
    }),
  },
  message_modal:{
    fontSize: 16,
    ...Platform.select({
      ios: {
        textAlign:'center',
        marginBottom: 10,
      },
      android: {
        textAlign:'left',
        marginTop: 20
      },
    }),
  },
  input_container:{
    textAlign:'left',
    fontSize: 16,
    color: 'rgba(0,0,0,0.54)',
    ...Platform.select({
      ios: {
        backgroundColor: 'white',
        borderRadius: 5,
        paddingTop: 5,
	      borderWidth: 1,
        borderColor: '#B0B0B0',
        paddingBottom: 5,
        paddingLeft: 10,
        marginBottom: 15,
        marginTop: 10,
      },
      android: {
        marginTop: 8,
        borderBottomWidth: 2,
        borderColor: '#009688',
      },
    }),
  },
  btn_container:{
    flex: 1,
    flexDirection: 'row',
    ...Platform.select({
      ios: {
        justifyContent: 'center',
        borderTopWidth: 1,
        borderColor: '#B0B0B0',
        maxHeight: 48,
      },
      android:{
        alignSelf: 'flex-end',
        maxHeight: 52,
        paddingTop: 8,
        paddingBottom: 8,
      }
    }),
  },
  divider_btn:{
    ...Platform.select({
      ios:{
      	width: 1,
        backgroundColor: '#B0B0B0',
      },
      android:{
	      width: 0
      },
    }),
  },
  touch_modal:{
    ...Platform.select({
      ios: {
        flex: 1,
      },
      android:{
        paddingRight: 8,
        minWidth: 64,
        height: 36,
      }
    }),
  },
  btn_modal_left:{
    ...Platform.select({
      fontWeight: "bold",
      ios: {
        fontSize:18,
        color:'#408AE2',
        textAlign:'center',
        borderRightWidth: 5,
        borderColor: '#B0B0B0',
        padding: 10,
	      height: 48,
	      maxHeight: 48,
      },
      android: {
        textAlign:'right',
        color:'#009688',
        padding: 8
      },
    }),
  },
  btn_modal_right:{
    ...Platform.select({
      fontWeight: "bold",
      ios: {
        fontSize:18,
        color:'#408AE2',
        textAlign:'center',
        padding: 10,
      },
      android: {
        textAlign:'right',
        color:'#009688',
        padding: 8
      },
    }),
  },
});
export default DialogInput;