const functions = require('firebase-functions');
const cors = require('cors')({origin: true});

class PaceConverter {

    constructor() {
        this.constants = {
            kmPerMile: 1.60934,
            milePerKm: 0.621371
        };
    }

    /**
     * Convert Pace to both Ki and Mi
     * 
     * @param {string} pace Pace e.g. 10:25 minutes
     */
    convertPaceToMi(seconds) {
        return this.convertSecondsToString(seconds * this.constants.kmPerMile);
    }

    convertPaceToKm(seconds) {
        return this.convertSecondsToString(seconds * this.constants.milePerKm);
    }

    convertStringToSeconds(pace) {
        var minsec = pace.split(":");
        return parseInt(minsec[0] * 60) + parseInt(minsec[1]);
    }

    convertSecondsToString(secondsTotal) {
        var minutes = Math.floor(secondsTotal / 60);
        var seconds = Math.floor(secondsTotal % 60).toString();
        while (seconds.length < 2) seconds = "0" + seconds;
        return minutes + ":" + seconds;
    }
}

const paceConverter = new PaceConverter();

exports.toKm = functions.https.onRequest((request, response) => {
    const pace = request.query.pace;
    var seconds = paceConverter.convertStringToSeconds(pace);

    const paceInKm = paceConverter.convertPaceToKm(seconds);

    cors(request, response, () => {
        response.status(200).json(paceInKm);
    })
});

exports.toMi = functions.https.onRequest((request, response) => {
    const pace = request.query.pace;
    var seconds = paceConverter.convertStringToSeconds(pace);

    const paceInMi = paceConverter.convertPaceToMi(seconds);

    cors(request, response, () => {
        response.status(200).json(paceInMi);
    })
});