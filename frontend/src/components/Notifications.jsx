import React, { useContext } from 'react';
import { SocketContext } from '../context/SocketContext';
import { MdPhoneInTalk } from 'react-icons/md';

const Notifications = () => {
    const { answerCall, call, callAccepted } = useContext(SocketContext);

    return (
        <>
            {call.isReceivedCall && !callAccepted && (
                <div className="flex flex-col items-center justify-center p-6 bg-indigo-600/20 border border-indigo-500 rounded-2xl animate-pulse">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="bg-indigo-500 p-3 rounded-full animate-bounce">
                            <MdPhoneInTalk className="text-white text-2xl" />
                        </div>
                        <h1 className="text-xl font-bold text-white">
                            {call.name || 'Someone'} is calling...
                        </h1>
                    </div>

                    <button
                        onClick={answerCall}
                        className="w-full md:w-auto bg-indigo-500 hover:bg-indigo-400 text-white font-bold py-3 px-12 rounded-full shadow-lg transition-all hover:scale-105 active:scale-95"
                    >
                        Answer Call
                    </button>
                </div>
            )}
        </>
    );
};

export default Notifications;