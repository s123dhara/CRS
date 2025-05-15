import React, { useState } from 'react'
import './chat.css';
import { VideoChat } from './VideoCall';
const generateRoomId = () => {
    return Math.random().toString(36).substring(2, 8); // 6-character random ID
};
const JoinRoom = () => {

    const [roomId, setRoomId] = useState('');
    const [inCall, setInCall] = useState(false);

    const createRoom = () => {
        const newRoomId = generateRoomId();
        console.log('new room id = ', newRoomId);
        setRoomId(newRoomId);
        setInCall(true);
    };

    const joinRoom = () => {
        if (roomId.trim()) {
            setInCall(true);
        }
    };
    return (
        <div className="app">
            {!inCall ? (
                <div className="join-room">
                    <button onClick={createRoom}>Create New Room</button>
                    <div className="or-divider">OR</div>
                    <input
                        type="text"
                        value={roomId}
                        onChange={(e) => setRoomId(e.target.value)}
                        placeholder="Enter room ID"
                    />
                    <button onClick={joinRoom}>Join Room</button>
                </div>
            ) : (
                <VideoChat roomId={roomId} />
            )}
        </div>
    )
}


export default JoinRoom
