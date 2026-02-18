import React, { useState, useContext } from 'react';
import { SocketContext } from '../context/SocketContext';
import { MdAssignment, MdPhone, MdPhoneDisabled, MdPerson, MdLink } from 'react-icons/md';

const Options = ({ children }) => {
    const { me, callAccepted, name, setName, callEnded, leaveCall, callUser } = useContext(SocketContext);
    const [idToCall, setIdToCall] = useState('');

    const handleCopy = () => {
        navigator.clipboard.writeText(me);
        // Using a modern notification style is better than an alert, but let's keep it simple for now
        alert("ID Copied! Share this with your friend.");
    };

    return (
        <div className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

                {/* Account Info Section */}
                <div className="flex flex-col gap-5 p-2">
                    <div className="flex items-center gap-2 border-b border-slate-700 pb-2">
                        <MdPerson className="text-indigo-400 text-xl" />
                        <h2 className="text-xl font-bold text-white tracking-wide">Your Profile</h2>
                    </div>

                    <div className="group flex flex-col gap-2">
                        <label className="text-sm font-semibold text-slate-400 group-focus-within:text-indigo-400 transition-colors">
                            Display Name
                        </label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Type your name..."
                            className="w-full bg-slate-900/50 border-2 border-slate-700 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all shadow-inner"
                        />
                    </div>

                    <button
                        onClick={handleCopy}
                        className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold py-3 px-4 rounded-xl shadow-lg shadow-indigo-500/20 transition-all active:scale-[0.98]"
                    >
                        <MdAssignment fontSize={22} /> Copy Your ID
                    </button>
                </div>

                {/* Make a Call Section */}
                <div className="flex flex-col gap-5 p-2">
                    <div className="flex items-center gap-2 border-b border-slate-700 pb-2">
                        <MdLink className="text-emerald-400 text-xl" />
                        <h2 className="text-xl font-bold text-white tracking-wide">Establish Connection</h2>
                    </div>

                    <div className="group flex flex-col gap-2">
                        <label className="text-sm font-semibold text-slate-400 group-focus-within:text-emerald-400 transition-colors">
                            Receiver ID
                        </label>
                        <input
                            type="text"
                            value={idToCall}
                            onChange={(e) => setIdToCall(e.target.value)}
                            placeholder="Paste friend's ID here..."
                            className="w-full bg-slate-900/50 border-2 border-slate-700 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all shadow-inner"
                        />
                    </div>

                    {callAccepted && !callEnded ? (
                        <button
                            onClick={leaveCall}
                            className="w-full flex items-center justify-center gap-3 bg-rose-600 hover:bg-rose-500 text-white font-bold py-3 px-4 rounded-xl shadow-lg shadow-rose-500/20 transition-all active:scale-[0.98]"
                        >
                            <MdPhoneDisabled fontSize={22} /> Terminate Call
                        </button>
                    ) : (
                        <button
                            onClick={() => callUser(idToCall)}
                            className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold py-3 px-4 rounded-xl shadow-lg shadow-emerald-500/20 transition-all active:scale-[0.98]"
                        >
                            <MdPhone fontSize={22} /> Start Video Call
                        </button>
                    )}
                </div>
            </div>

            {/* Notifications Area */}
            {children && (
                <div className="mt-10 animate-in slide-in-from-bottom-4 duration-500">
                    {children}
                </div>
            )}
        </div>
    );
};

export default Options;