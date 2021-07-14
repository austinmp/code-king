const axios = require('axios');
const submissionHistoryServiceURL = "http://submission-history:5050/";

exports.getUserProfile = async (req, res, next) => {
    const username = req.headers.username;

    const userSubmissionHisUrl = submissionHistoryServiceURL + "getUserSubmissions?userId=" + req.body.username;    

    let responseData = null;
    try {
        const response = await axios.get(userSubmissionHisUrl);
        responseData = response.data;
    } catch (err) {
        console.log(err);
    } 

    // Get 10 most recent submission from SubmissionHistory MicroService

    res.status(200).json({
        status: "success",
        message: "User Profile successfully retrieved.",
        data: {
            username: username,
            ...responseData
        }  
    })
}