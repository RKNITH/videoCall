/**
 * @desc Handles real-time events for WebRTC signaling
 */
const socketHandler = (io) => {
    io.on("connection", (socket) => {
        console.log(`📡 New connection: ${socket.id}`);

        // 1. Assign ID to user
        // When a user connects, they get their own socket ID automatically
        socket.emit("me", socket.id);

        // 2. Disconnect Logic
        socket.on("disconnect", () => {
            socket.broadcast.emit("callEnded");
            console.log(`🔌 User disconnected: ${socket.id}`);
        });

        /**
         * @desc START A CALL
         * User A sends 'callUser' event to Server
         * Server forwards 'callUser' to User B
         */
        socket.on("callUser", ({ userToCall, signalData, from, name }) => {
            if (!userToCall) return;

            io.to(userToCall).emit("callUser", {
                signal: signalData,
                from,
                name
            });
        });

        /**
         * @desc ANSWER A CALL
         * User B sends 'answerCall' event to Server
         * Server forwards 'callAccepted' back to User A
         */
        socket.on("answerCall", (data) => {
            io.to(data.to).emit("callAccepted", data.signal);
        });

        /**
         * @desc UPDATE ONGOING CALL (ICE Candidates)
         * Sometimes required for network stability during the call
         */
        socket.on("updateMyCanvas", (data) => {
            io.to(data.to).emit("updateAndReceiveCanvas", data);
        });
    });
};

export default socketHandler;