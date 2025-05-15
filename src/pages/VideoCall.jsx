import React, { useEffect, useRef, useState } from 'react';
import { FaVideo, FaVideoSlash, FaMicrophone, FaMicrophoneSlash, FaPhoneSlash } from 'react-icons/fa';
import io from 'socket.io-client';
import './chat.css';
export const VideoChat = ({ roomId }) => {
    const [localStream, setLocalStream] = useState(null);
    const [remoteStreams, setRemoteStreams] = useState([]);
    const [isVideoOn, setIsVideoOn] = useState(true);
    const [isAudioOn, setIsAudioOn] = useState(true);
    const socketRef = useRef();
    const peerConnections = useRef({});
    const localVideoRef = useRef();
    const remoteVideosRef = useRef();

    useEffect(() => {
        // Initialize socket connection
        socketRef.current = io('http://localhost:8000');

        // Get user media
        const initMedia = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: true,
                    audio: true
                });
                setLocalStream(stream);
                localVideoRef.current.srcObject = stream;
            } catch (err) {
                console.error('Failed to get media', err);
            }
        };

        initMedia();

        // Socket event handlers
        socketRef.current.on('connect', () => {
            socketRef.current.emit('join-room', roomId);
        });

        socketRef.current.on('existing-participants', ({ participants }) => {
            participants.forEach(id => createPeerConnection(id));
        });

        socketRef.current.on('new-participant', ({ participantId }) => {
            createPeerConnection(participantId);
        });

        socketRef.current.on('participant-left', ({ participantId }) => {
            removeParticipant(participantId);
        });

        socketRef.current.on('session-description', async ({ senderId, sessionDescription }) => {
            const pc = peerConnections.current[senderId];
            if (!pc) return;

            await pc.setRemoteDescription(new RTCSessionDescription(sessionDescription));
            if (sessionDescription.type === 'offer') {
                const answer = await pc.createAnswer();
                await pc.setLocalDescription(answer);
                socketRef.current.emit('relay-sdp', {
                    targetId: senderId,
                    sessionDescription: answer
                });
            }
        });

        socketRef.current.on('ice-candidate', ({ senderId, candidate }) => {
            const pc = peerConnections.current[senderId];
            if (pc && candidate) {
                pc.addIceCandidate(new RTCIceCandidate(candidate));
            }
        });

        return () => {
            if (socketRef.current) socketRef.current.disconnect();
            if (localStream) localStream.getTracks().forEach(track => track.stop());
            Object.values(peerConnections.current).forEach(pc => pc.close());
        };
    }, [roomId]);

    const createPeerConnection = (participantId) => {
        const pc = new RTCPeerConnection({
            iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
        });

        peerConnections.current[participantId] = pc;

        // Add local tracks
        if (localStream) {
            localStream.getTracks().forEach(track => {
                pc.addTrack(track, localStream);
            });
        }

        // ICE candidate handler
        pc.onicecandidate = (event) => {
            if (event.candidate) {
                socketRef.current.emit('relay-ice', {
                    targetId: participantId,
                    candidate: event.candidate
                });
            }
        };

        // Track handler
        pc.ontrack = (event) => {
            const stream = event.streams[0];
            setRemoteStreams(prev => {
                const existing = prev.find(s => s.id === participantId);
                if (existing) {
                    return prev.map(s =>
                        s.id === participantId ? { ...s, stream } : s
                    );
                }
                return [...prev, { id: participantId, stream }];
            });
        };

        // Create offer if needed
        if (Object.keys(peerConnections.current).length > 1) {
            pc.createOffer()
                .then(offer => pc.setLocalDescription(offer))
                .then(() => {
                    socketRef.current.emit('relay-sdp', {
                        targetId: participantId,
                        sessionDescription: pc.localDescription
                    });
                });
        }
    };

    const removeParticipant = (participantId) => {
        const pc = peerConnections.current[participantId];
        if (pc) {
            pc.close();
            delete peerConnections.current[participantId];
        }
        setRemoteStreams(prev => prev.filter(s => s.id !== participantId));
    };

    const toggleVideo = () => {
        if (localStream) {
            const videoTrack = localStream.getVideoTracks()[0];
            if (videoTrack) {
                videoTrack.enabled = !videoTrack.enabled;
                setIsVideoOn(videoTrack.enabled);
            }
        }
    };

    const toggleAudio = () => {
        if (localStream) {
            const audioTrack = localStream.getAudioTracks()[0];
            if (audioTrack) {
                audioTrack.enabled = !audioTrack.enabled;
                setIsAudioOn(audioTrack.enabled);
            }
        }
    };

    const endCall = () => {
        if (localStream) localStream.getTracks().forEach(track => track.stop());
        Object.values(peerConnections.current).forEach(pc => pc.close());
        if (socketRef.current) socketRef.current.disconnect();
    };

    return (
        <div className="video-chat-container">
            <div className="video-grid">
                <div className="video-item local">
                    <video ref={localVideoRef} autoPlay playsInline muted />
                    <div className="video-label">You</div>
                </div>

                {remoteStreams.map(({ id, stream }) => (
                    <div key={id} className="video-item remote">
                        <video
                            autoPlay
                            playsInline
                            ref={el => el && (el.srcObject = stream)}
                        />
                        <div className="video-label">Participant {id.slice(0, 4)}</div>
                    </div>
                ))}
            </div>

            <div className="controls">
                <button onClick={toggleVideo} className={isVideoOn ? 'active' : ''}>
                    {isVideoOn ? <FaVideo /> : <FaVideoSlash />}
                </button>
                <button onClick={toggleAudio} className={isAudioOn ? 'active' : ''}>
                    {isAudioOn ? <FaMicrophone /> : <FaMicrophoneSlash />}
                </button>
                <button onClick={endCall} className="end-call">
                    <FaPhoneSlash />
                </button>
            </div>
        </div>
    );
};