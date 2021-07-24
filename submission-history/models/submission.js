const db = require('../database/db');
const config = require('../config/config');

const submissionSchema = new db.Schema({
    userId: {
        type: Number,
        required: [true, 'UserId is required']
    },
    userName: {
        type: String,
        required: [true, 'User name is required'],
        maxlength: [128, 'User name exceeds max character limit'],
    },
    challengeId: {
        type: Number,
        required: [true, 'ChallengeId is required']
    },
    challengeName: {
        type: String,
        required: [true, 'Challenge name is required'],
        maxlength: [128, 'Challenge name exceeds max character limit'],
    },
    programmingLanguage: {
        type: String,
        required: [true, 'Programming language is required'],
        maxlength: [128, 'Programming language exceeds max character limit'],
    },
    executionTime: {
        type: Number,
        required: [true, 'Execution time is required'],
    },
    didAllTestsPass:{
        type: Boolean,
        required: [true, 'DidAllTestsPass is required'],

    },
    dateSubmitted:{
        type: Date, 
        default: Date.now         
    }
},

{ collection: `${config.database.collection}`}

);

const submission = new db.model("submission", submissionSchema);
module.exports = submission;