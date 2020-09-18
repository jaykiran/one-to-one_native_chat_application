import firebase from 'firebase';
import {YellowBox} from 'react-native';

class fire {
    constructor() {
        this.init()
        this.checkAuth()
    }

    init = () => {
        if(!firebase.apps.length) {
            firebase.initializeApp({
                apiKey: "AIzaSyBg7cLEUuiS9TmbSd2El337uvM0ZpHDdas",
                authDomain: "react-native-chat-d2e95.firebaseapp.com",
                databaseURL: "https://react-native-chat-d2e95.firebaseio.com",
                projectId: "react-native-chat-d2e95",
                storageBucket: "react-native-chat-d2e95.appspot.com",
                messagingSenderId: "861071053347",
                appId: "1:861071053347:web:7098280a283e2d73929796"
            });
        }

        YellowBox.ignoreWarnings(['Setting a timer for a long period of time'])
    };

    checkAuth = () => {
        firebase.auth().onAuthStateChanged(user => {
            if(!user) {
                firebase.auth().signInAnonymously();
            }
        });
    };

    send = messages => {
        messages.forEach(item => {
            const message = {
                text: item.text,
                timestamp: firebase.database.ServerValue.TIMESTAMP,
                user: item.user
            };

            this.db.push(message)
        });
    };

    parse = message => {
        const { user, text, timestamp } = message.val();
        const { key: _id } = message;
        const createdAt = new Date(timestamp);

        return {
            _id,
            createdAt,
            text,
            user
        };
    };

    get = callback => {
        this.db.on("child_added", snapshot => callback(this.parse(snapshot)));
    };

    off() {
        this.db.off()
    }

    get db() {
        return firebase.database().ref("messages");
    }
    
    get uid() {
        return (firebase.auth().currentUser || {}).uid
    }
}

export default new fire();