import React, { createContext, useState, useRef, useEffect } from 'react';
import { io } from 'socket.io-client';
import Peer from 'simple-peer/simplepeer.min.js';

const SocketContext = createContext();

// Connect to the socket server
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

    // Initialize name from localStorage for persistent identity
    const [name, setName] = useState(() => {
        const savedUser = JSON.parse(localStorage.getItem('user'));
        return savedUser ? savedUser.username : '';
    });

    const myVideo = useRef();
    const userVideo = useRef();
    const connectionRef = useRef();

    useEffect(() => {
        // 1. Request camera and microphone access
        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            .then((currentStream) => {
                setStream(currentStream);
                if (myVideo.current) {
                    myVideo.current.srcObject = currentStream;
                }
            })
            .catch((err) => {
                console.error("Camera access denied:", err);
                alert("Please enable camera access to use video calling.");
            });

        // 2. Capture our unique Socket ID from server
        socket.on('me', (id) => setMe(id));

        // 3. Listen for incoming call signals
        socket.on('callUser', ({ from, name: callerName, signal }) => {
            setCall({ isReceivedCall: true, from, name: callerName, signal });
        });

        // Cleanup on unmount
        return () => {
            socket.off('me');
            socket.off('callUser');
            socket.off('callAccepted');
        };
    }, []);

    const answerCall = () => {
        setCallAccepted(true);

        const peer = new Peer({
            initiator: false,
            trickle: false,
            stream: stream // Ensure our stream is shared
        });

        peer.on('signal', (data) => {
            socket.emit('answerCall', { signal: data, to: call.from });
        });

        peer.on('stream', (remoteStream) => {
            if (userVideo.current) {
                userVideo.current.srcObject = remoteStream;
            }
        });

        // Inject the signal we received from the caller
        peer.signal(call.signal);

        connectionRef.current = peer;
    };

    const callUser = (id) => {
        if (!stream) {
            alert("Camera not initialized yet. Please wait.");
            return;
        }

        const peer = new Peer({
            initiator: true,
            trickle: false,
            stream: stream
        });

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
        if (connectionRef.current) {
            connectionRef.current.destroy();
        }
        // Hard reset to ensure all streams are closed and states cleared
        window.location.reload();
    };

    return (
        <SocketContext.Provider value={{
            call,
            callAccepted,
            myVideo,
            userVideo,
            stream,
            name,
            setName,
            callEnded,
            me,
            callUser,
            leaveCall,
            answerCall,
        }}>
            {children}
        </SocketContext.Provider>
    );
};

export { ContextProvider, SocketContext };