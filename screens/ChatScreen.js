import React from 'react';
import { Platform, KeyboardAvoidingView, SafeAreaView } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import fire from '../firebase';


export default class ChatScreen extends React.Component {

    state = {
        messages: []
    }

    get user() {
        return {
            _id: fire.uid,
            name: this.props.navigation.state.params.name
        }
    }

    componentDidMount() {
        fire.get(message =>
            this.setState(previous => ({
                messages: GiftedChat.append(previous.messages, message)
            }))
        );
    }

    componentWillUnmount() {
        fire.off();
    }

    render() {
        //const chat = <GiftedChat messages={this.state.messages} onSend={fire.send} user={this.user} />

        // if(Platform.OS === 'android') {
        //     return(
        //         <KeyboardAvoidingView style={{flex: 1}} behavior="padding" keyboardVerticalOffset={10} enabled>
        //             {chat}
        //         </KeyboardAvoidingView>
        //     )
        // }
        
        return <GiftedChat messages={this.state.messages} onSend={fire.send} user={this.user} />
        //return <SafeAreaView>{chat}</SafeAreaView>
    }
}
