import './Chat.css'
import React, { useEffect, useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import {onSnapShot} from 'firebase/compat/firestore';
import 'firebase/compat/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore'




firebase.initializeApp({
    apiKey: "AIzaSyA6a2KrgINXs48kh46ujobBHHi2G4DOBSc",
    authDomain: "crm-app-290ad.firebaseapp.com",
    databaseURL: "https://crm-app-290ad-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "crm-app-290ad",
    storageBucket: "crm-app-290ad.appspot.com",
    messagingSenderId: "417688543189",
    appId: "1:417688543189:web:a39ee3eb737363807c675c",
    measurementId: "G-5LNV6GKBVK"
})

const auth = firebase.auth()
const firestore = firebase.firestore()

function ChatMessage(props){
    const {text, photoURL, uid} = props.message

    const messageClass = uid === auth.currentUser.uid ? 'mine' : 'other';

    return (
        <div className={`message ${messageClass}`}>
            <div class="avatar">
                <img src={photoURL} alt="User Avatar" />
            </div>
            <p>{text}</p>
        </div>
    )
}

function ChatRoom(){
    const messagesRef = firestore.collection('messages');
    const query = messagesRef.orderBy('createAt').limit(25);

    const [messages] = useCollectionData(query, {idField: 'id'})

    const [formValue, setFormValue] = useState('');

    const sendMessage = async(e) => {
        e.preventDefault();
        const {uid, photoURL} = auth.currentUser;

        await messagesRef.add({
            text: formValue,
            createAt: firebase.firestore.FieldValue.serverTimestamp(),
            uid,
            photoURL
        })

        setFormValue('')
    }

    return(
        <div class="chat-container">
            <div class="chat-list">
                <div class="chat-item active">
                    <div class="avatar">
                        <img src="avatar1.jpg" alt="User Avatar" />
                    </div>
                    <div class="user-info">
                        <h3>User 1</h3>
                        <p>Last message...</p>
                    </div>
                    <div class="message-time">12:30 PM</div>
                </div>
                <div class="chat-item">
                    <div class="avatar">
                        <img src="avatar2.jpg" alt="User Avatar" />
                    </div>
                    <div class="user-info">
                        <h3>User 2</h3>
                        <p>Last message...</p>
                    </div>
                    <div class="message-time">Yesterday</div>
                </div>
                <div class="chat-item">
                    <div class="avatar">
                        <img src="avatar3.jpg" alt="User Avatar" />
                    </div>
                    <div class="user-info">
                        <h3>User 3</h3>
                        <p>Last message...</p>
                    </div>
                    <div class="message-time">Mon</div>
                </div>
            </div>
            <div class="chat-content">
                <div class="chat-header">
                    <h1>Chat with User 1</h1>
                    <p>User 1 was online 12:27</p>
                </div>
                <div class="chat-messages">
                    {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}
                </div>
                <form onSubmit={sendMessage} class="chat-input">
                    <input type="text" placeholder="Type your message..." value={formValue} onChange={(e) => setFormValue(e.target.value)} />
                    <button type='submit'>Send</button>
                </form>

            </div>
            <SignOut />
        </div>
    )
}

const Chat = (props) => {

    const [user] = useAuthState(auth)

    return (
        <div class='chat'>
            {user ? <ChatRoom /> : <SignIn />}
        </div>
    );
}

function SignIn(){
    const signOnWithGoogle = () => {
        const provider = new firebase.auth.GoogleAuthProvider()
        auth.signInWithPopup(provider)
    }
    return(
        <button onClick={signOnWithGoogle}>Sign In with Google</button>
    )
}

function SignOut() {
    return auth.currentUser && (
        <button onClick={() => auth.signOut()}>Sign Out</button>
    )
}

export default Chat