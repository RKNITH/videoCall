import mongoose from 'mongoose';

const callLogSchema = new mongoose.Schema({
    caller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, "Caller information is required"]
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, "Receiver information is required"]
    },
    status: {
        type: String,
        enum: {
            values: ['missed', 'accepted', 'rejected', 'busy'],
            message: '{VALUE} is not a valid call status'
        },
        default: 'missed'
    },
    duration: {
        type: Number, // Store duration in seconds
        default: 0
    },
    startedAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

// Indexing for faster history lookups
callLogSchema.index({ caller: 1, receiver: 1 });

const CallLog = mongoose.model('CallLog', callLogSchema);
export default CallLog;