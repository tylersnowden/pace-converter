export default class PaceConverter {

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
        var seconds = Math.round(secondsTotal % 60).toString();
        while (seconds.length < 2) seconds = "0" + seconds;
        return minutes + ":" + seconds;
    }

}