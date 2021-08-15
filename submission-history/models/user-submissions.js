const db = require('../database/db');
const config = require('../config/config');

const submissionSchema = new db.Schema({
    _id: Number,
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
    code: {
        type: String,
    },
    dateSubmitted:{
        type: Date, 
        default: Date.now         
    }
});

const userSubmissionsSchema = new db.Schema({
    _id: String,
    userName: {
        type: String,
        required: [true, 'User name is required'],
        maxlength: [128, 'User name exceeds max character limit'],
    },
    submissions: [submissionSchema]
},

{ collection: `${config.database.collection}`}

);

 const UserSubmissions = new db.model("UserSubmissions", userSubmissionsSchema);
 module.exports = UserSubmissions;