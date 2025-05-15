// VideoCall.js
import React, { useEffect, useRef } from 'react';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';

const VideoCall2 = ({ roomID, userID, userName }) => {
    const containerRef = useRef(null);

    useEffect(() => {
        const appID = 266739108; // replace with your actual AppID
        const serverSecret = '0a1f3922a9464b08008fc37d7f9eeb6c'; // replace with your ServerSecret
        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
            appID,
            serverSecret,
            roomID,
            userID,
            userName
        );

        const zp = ZegoUIKitPrebuilt.create(kitToken);
        zp.joinRoom({
            container: containerRef.current,
            sharedLinks: [
                {
                    name: 'Copy Link',
                    url: `${window.location.origin}/room/${roomID}`,
                },
            ],
            scenario: {
                mode: ZegoUIKitPrebuilt.GroupCall,
            },
            urnOnCameraWhenJoining: true,
            turnOnMicrophoneWhenJoining: true,
            showMyCameraToggleButton: true,
            showMyMicrophoneToggleButton: true,
        });
    }, [roomID, userID, userName]);

    return <div ref={containerRef} style={{ width: '100%', height: '100vh' }} />;
};

export default VideoCall2;
