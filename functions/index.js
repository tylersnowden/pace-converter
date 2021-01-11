const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors')({origin: true});
const app = express();
app.use(cors);

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
        return seconds * this.constants.kmPerMile;
    }

    convertPaceToKm(seconds) {
        return seconds * this.constants.milePerKm;
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

    handleKmRequest(pace) {
        var seconds = paceConverter.convertStringToSeconds(pace);

        const secondsKm = paceConverter.convertPaceToKm(seconds);
        const paceInKm = this.convertSecondsToString(secondsKm);

        // World Record Km - Noah Ngeny 2:11/km
        const comparedToRecordSeconds = secondsKm - 131;
        const comparedToRecord = this.convertSecondsToString(comparedToRecordSeconds);
        let recordLabel = "";

        if (comparedToRecordSeconds > 0) {
            recordLabel = comparedToRecord + " slower than world record minute/kilometer pace.";
        } else {
            recordLabel = comparedToRecord + " faster than world record minute/kilometer pace.";
        }

        return {
            pace: paceInKm,
            human: paceInKm + " min/km",
            comparedToWorldRecord: recordLabel,
            worldRecord: "Noah Ngeny 2:11/km"
        }
    }

    handleMiRequest(pace) {
        var seconds = paceConverter.convertStringToSeconds(pace);

        const secondsMi = paceConverter.convertPaceToMi(seconds);
        const paceInMi = this.convertSecondsToString(secondsMi);

        // World Record Mile - Hicham El Guerrouj 3:43/mile
        const comparedToRecordSeconds = secondsMi - 223;
        const comparedToRecord = this.convertSecondsToString(comparedToRecordSeconds);
        let recordLabel = "";

        if (comparedToRecordSeconds > 0) {
            recordLabel = comparedToRecord + " slower than world record minute/mile pace.";
        } else {
            recordLabel = comparedToRecord + " faster than world record minute/mile pace.";
        }

        return {
            pace: paceInMi,
            human: paceInMi + " min/mile",
            comparedToWorldRecord: comparedToRecord + " slower than world record minute/mile pace.",
            worldRecord: "Hicham El Guerrouj 3:43/mile"
        }
    }
}

const paceConverter = new PaceConverter();

app.get('/to-mile/:pace', (req, res) => {
    res.json(paceConverter.handleMiRequest(req.params.pace));
});

app.get('/to-miles/:pace', (req, res) => {
    res.json(paceConverter.handleMiRequest(req.params.pace));
});

app.get('/to-mi/:pace', (req, res) => {
    res.json(paceConverter.handleMiRequest(req.params.pace));
});

app.get('/to-km/:pace', (req, res) => {
    res.json(paceConverter.handleKmRequest(req.params.pace));
});

app.get('/to-kilometer/:pace', (req, res) => {
    res.json(paceConverter.handleKmRequest(req.params.pace));
});

app.get('/to-kilometers/:pace', (req, res) => {
    res.json(paceConverter.handleKmRequest(req.params.pace));
});

exports.converter = functions.https.onRequest(app);