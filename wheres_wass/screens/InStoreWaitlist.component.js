import React, { Component  } from 'react';
import { StyleSheet,
         Text, 
         View,
         ScrollView,
         Button,
         TouchableOpacity,
         TextInput
         } from 'react-native';
import { FontAwesome  } from '@expo/vector-icons';
import firebase from '../config';
import { FloatingAction } from 'react-native-floating-action';
import Waitlist from './WaitlistScreen.component';
import DialogInput from 'react-native-dialog-input';

firebaseDatabase = firebase.database();

class InStoreWaitlist extends Component{
    constructor(props){
        super(props)
        this.state = {
            isDialogVisible : true,
        }
        this.waitlistRef = firebaseDatabase.ref('waitList')
    }

    static navigationOptions = {
        tabBarLabel : 'In store waitlist',

    }

    submitToWaitlist(nameInput){
        this.waitlistRef.push({name : nameInput})
        this.setState({
            isDialogVisible:false
        })
    }

    addClient() {
        this.setState({
            isDialogVisible : true
        })
    }
    


    render(){
        console.log('We are re-rendering InStoreWaitlist')
        return(
            <View style={{flex:1}}>
                <DialogInput isDialogVisible={this.state.isDialogVisible}
                    title={"Add to Waitlist"}
                    message={"Please enter your name to be added to the waitlist"}
                    hintInput ={"John Doe"}
                    textInputProps={{autoCapitalize:'words'}}
                    submitInput = {(inputtext) => this.submitToWaitlist(inputtext)}
                    closeDialog = {() => this.setState({isDialogVisible:false})}>
                </DialogInput>
                <Waitlist style = {{flex:3}} removable = {false}/>
                <TouchableOpacity onPress={() => this.addClient()} style={styles.fab}>
                    <Text style={styles.fabIcon}>+</Text>
                </TouchableOpacity>
            </View>
           
        )

    }

    
}

const styles = StyleSheet.create({ 
    fab: { 
      position: 'absolute', 
      width: 56, 
      height: 56, 
      alignItems: 'center', 
      justifyContent: 'center', 
      right: 20, 
      bottom: 20, 
      backgroundColor: 'black', 
      borderRadius: 30, 
      elevation: 8 
      }, 
      fabIcon: { 
        fontSize: 40, 
        color: 'white' 
      }
  });



export default InStoreWaitlist;