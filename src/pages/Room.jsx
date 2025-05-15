import React from "react";
import VideoCall2 from "./VideoCall2";
import { useParams } from "react-router-dom";

const Room = () => {
    let { roomID } = useParams();
    roomID = "supriyo";
    const userID = String(Math.floor(Math.random() * 100000));
    const userName = "User_" + userID;

    return <VideoCall2 roomID={roomID} userID={userID} userName={userName} />;
};
export default Room;