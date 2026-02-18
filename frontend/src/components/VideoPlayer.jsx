import React, { useContext } from 'react';
import { SocketContext } from '../context/SocketContext';

const VideoPlayer = () => {
    const { name, callAccepted, myVideo, userVideo, callEnded, stream, call } = useContext(SocketContext);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full h-full">

            {/* Our own video */}
            {stream && (
                <div className="relative bg-slate-800 rounded-3xl overflow-hidden border-2 border-slate-700 shadow-2xl">
                    <div className="absolute top-4 left-4 z-10 bg-slate-900/60 px-3 py-1 rounded-full backdrop-blur-md">
                        <p className="text-sm font-medium">{name || 'Me (You)'}</p>
                    </div>
                    <video
                        playsInline
                        muted
                        ref={myVideo}
                        autoPlay
                        className="w-full h-full object-cover min-h-[300px] scale-x-[-1]"
                    />
                </div>
            )}

            {/* User's video (Remote) */}
            {callAccepted && !callEnded && (
                <div className="relative bg-slate-800 rounded-3xl overflow-hidden border-2 border-indigo-500/50 shadow-2xl animate-in fade-in zoom-in duration-300">
                    <div className="absolute top-4 left-4 z-10 bg-indigo-600/80 px-3 py-1 rounded-full backdrop-blur-md">
                        <p className="text-sm font-medium">{call.name || 'Remote User'}</p>
                    </div>
                    <video
                        playsInline
                        ref={userVideo}
                        autoPlay
                        className="w-full h-full object-cover min-h-[300px]"
                    />
                </div>
            )}

        </div>
    );
};

export default VideoPlayer;