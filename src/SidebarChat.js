import React, {useState, useEffect} from 'react';
import "./SidebarChat.css";
import { Avatar } from "@material-ui/core";
import db from './firebase';
import {Link} from 'react-router-dom'

function SidebarChat({ id, name, addNewChat }) {

    const [messages, setmessages] = useState('');

    useEffect(() => {
        if(id) {
            db.collection('rooms')
            .doc(id)
            .collection('messages')
            .orderBy('timestamp', 'desc')
            .onSnapshot(snapshot => (
                setmessages(snapshot.docs.map(doc => doc.data()))
            ))
        }
    }, [id])

    const createChat = () => {
        const roomName = prompt("Please enter name for chat room")

        if (roomName) {
            db.collection('rooms').add({
                name: roomName,
            });
        }

    }
    return !addNewChat ? (
        <Link to={`/rooms/${id}`}>
            <div className="sidebarChat">
                <Avatar />
                <div className="sidebarChat__info">
                    <h2>{name}</h2>
                    <p>{messages[0]?.message}</p>
                </div>
            </div>
        </Link>
    ) : (
        <div onClick={createChat} className="sidebarChat">
            <h2>Add new Chat</h2>
        </div>
    )
}

export default SidebarChat
