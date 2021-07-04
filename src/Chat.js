import React, { useState, useEffect } from 'react';
import "./Chat.css";
import { Avatar, IconButton } from "@material-ui/core";
import { SearchOutlined, AttachFile, MoreVert, InsertEmoticon, Mic } from "@material-ui/icons";
import { useParams } from 'react-router-dom';
import db from './firebase';
import { useStateValue } from './StateProvider';
import firebase from 'firebase'


function Chat() {

    const [input, setInput] = useState("");
    const { roomId } = useParams();
    const [roomName, setroomName] = useState("");
    const [messages, setmessages] = useState([]);
    const [{ user }, dispatch] = useStateValue();

    useEffect(() => {
        if (roomId) {
            db.collection('rooms').doc(roomId).onSnapshot(snapshot => {
                setroomName(snapshot.data().name)
            });

            db.collection('rooms')
                .doc(roomId)
                .collection('messages')
                .orderBy('timestamp')
                .onSnapshot(snapshot => (
                    setmessages(snapshot.docs.map(doc => doc.data()))
                ))
        }
    }, [roomId])

    const sendMessage = async (e) => {
        e.preventDefault();
        db.collection('rooms').doc(roomId).collection('messages').add({
            message: input,
            name: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        });


        setInput('');
    }

    return (
        <div className="chat">
            <div className="chat_header">
                <Avatar src="" />
                <div className="chat_headerInfo">
                    <h3>{roomName}</h3>
                    <p>Last seen {" "}
                        {new Date(messages[messages.length-1]?.timestamp?.toDate()).toUTCString()}</p>
                </div>
                <div className="chat_headerRight">
                    <IconButton>
                        <SearchOutlined />
                    </IconButton>
                    <IconButton>
                        <AttachFile />
                    </IconButton>
                    <IconButton>
                        <MoreVert />
                    </IconButton>
                </div>
            </div>

            <div className="chat_body">
                {messages.map(message => (
                    <p className={`chat_message ${message.name === user.displayName && "chat_reciever"}`}>
                        <span className="chat_name">{message.name}</span>
                        {message.message}
                        <span className="chat_timestamp">
                            {new Date(message.timestamp?.toDate()).toUTCString()}
                        </span>
                    </p>
                ))}


            </div>

            <div className="chat_footer">
                <InsertEmoticon />
                <form >
                    <input value={input} onChange={e => setInput(e.target.value)} placeholder="Type a message" type="text" />
                    <button onClick={sendMessage} type="submit">Send a message</button>
                </form>
                <Mic />
            </div>

        </div>
    )
}

export default Chat;
