import React, { createContext, useState, useRef, useEffect } from 'react';
import { io } from 'socket.io-client';
import Peer from 'simple-peer/simplepeer.min.js';

const SocketContext = createContext();

const socket = io(import.meta.env.VITE_BACKEND_URL, {
    transports: ['websocket'],
    withCredentials: true
});

const ContextProvider = ({ children }) => {
    const [stream, setStream] = useState(null);
    const [me, setMe] = useState('');
    const [call, setCall] = useState({});
    const [callAccepted, setCallAccepted] = useState(false);
    const [callEnded, setCallEnded] = useState(false);
    const [name, setName] = useState(() => {
        const savedUser = JSON.parse(localStorage.getItem('user'));
        return savedUser ? savedUser.username : '';
    });

    const myVideo = useRef();
    const userVideo = useRef();
    const connectionRef = useRef();

    // --- FIX FOR DEPLOYED VIDEO: The Stream Watcher ---
    useEffect(() => {
        if (stream && myVideo.current) {
            myVideo.current.srcObject = stream;
        }
    }, [stream]);

    useEffect(() => {
        // Request Camera Access
        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            .then((currentStream) => {
                setStream(currentStream);
                if (myVideo.current) {
                    myVideo.current.srcObject = currentStream;
                }
            })
            .catch((err) => {
                console.error("Camera access denied:", err);
            });

        socket.on('me', (id) => setMe(id));

        socket.on('callUser', ({ from, name: callerName, signal }) => {
            setCall({ isReceivedCall: true, from, name: callerName, signal });
        });

        return () => {
            socket.off('me');
            socket.off('callUser');
        };
    }, []);

    const answerCall = () => {
        setCallAccepted(true);
        const peer = new Peer({ initiator: false, trickle: false, stream });

        peer.on('signal', (data) => {
            socket.emit('answerCall', { signal: data, to: call.from });
        });

        peer.on('stream', (remoteStream) => {
            if (userVideo.current) {
                userVideo.current.srcObject = remoteStream;
            }
        });

        peer.signal(call.signal);
        connectionRef.current = peer;
    };

    const callUser = (id) => {
        if (!stream) return alert("Camera not ready");

        const peer = new Peer({ initiator: true, trickle: false, stream });

        peer.on('signal', (data) => {
            socket.emit('callUser', {
                userToCall: id,
                signalData: data,
                from: me,
                name: name,
            });
        });

        peer.on('stream', (remoteStream) => {
            if (userVideo.current) {
                userVideo.current.srcObject = remoteStream;
            }
        });

        socket.on('callAccepted', (signal) => {
            setCallAccepted(true);
            peer.signal(signal);
        });

        connectionRef.current = peer;
    };

    const leaveCall = () => {
        setCallEnded(true);
        if (connectionRef.current) connectionRef.current.destroy();
        window.location.reload();
    };

    return (
        <SocketContext.Provider value={{
            call, callAccepted, myVideo, userVideo, stream,
            name, setName, callEnded, me, callUser, leaveCall, answerCall,
        }}>
            {children}
        </SocketContext.Provider>
    );
};

export { ContextProvider, SocketContext };