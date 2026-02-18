import React, { useContext } from 'react';
import { SocketContext } from '../context/SocketContext';

const VideoPlayer = () => {
    const { name, callAccepted, myVideo, userVideo, callEnded, stream, call } = useContext(SocketContext);

    return (
        <div className="relative w-full h-full min-h-[400px]">
            {/* Grid container for Desktop, Relative for Mobile Overlay */}
            <div className={`grid gap-4 w-full h-full ${callAccepted && !callEnded ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'}`}>

                {/* Our own video */}
                {stream && (
                    <div className={`relative bg-slate-800 rounded-3xl overflow-hidden border-2 border-slate-700 shadow-2xl transition-all duration-500
                        ${callAccepted && !callEnded
                            ? 'absolute bottom-4 right-4 w-32 h-44 z-20 md:relative md:w-auto md:h-full md:bottom-0 md:right-0'
                            : 'w-full h-full'}`}>

                        <div className="absolute top-2 left-2 z-10 bg-slate-900/60 px-2 py-0.5 rounded-full backdrop-blur-md md:top-4 md:left-4">
                            <p className="text-[10px] md:text-sm font-medium text-white">{name || 'Me'}</p>
                        </div>

                        <video
                            playsInline
                            muted
                            ref={myVideo}
                            autoPlay
                            className="w-full h-full object-cover min-h-[200px] md:min-h-[350px] scale-x-[-1]"
                        />
                    </div>
                )}

                {/* Friend's video (Remote) */}
                {callAccepted && !callEnded && (
                    <div className="relative bg-slate-800 rounded-3xl overflow-hidden border-2 border-indigo-500 shadow-2xl animate-in fade-in zoom-in duration-500 h-full w-full">
                        <div className="absolute top-4 left-4 z-10 bg-indigo-600/90 px-3 py-1 rounded-full backdrop-blur-md shadow-lg">
                            <p className="text-sm font-medium text-white">{call.name || 'Friend'}</p>
                        </div>
                        <video
                            playsInline
                            ref={userVideo}
                            autoPlay
                            className="w-full h-full object-cover min-h-[400px]"
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default VideoPlayer;