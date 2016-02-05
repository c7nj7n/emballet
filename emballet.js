javascript: (function () {
    var waitExtra       = 3;     // wait until next video initialised
    var waitTimeout;

    // get video container
    var videoContainer = $('#course_player');

    waitUntilVideoReady();

    // video list
    var videos         = videoContainer.find('ul.scrollbox li span:not(.validated)');
    var videosWatched  = videoContainer.find('ul.scrollbox li span.validated').length;
    var videosWaiting  = videos.length;
    console.log(videosWaiting + ' videos to be watched, ' + videosWatched + ' already watched.');

    play();

    // identify video and start
    function play () {
        // get reference to first video
        videoCurrent = videoContainer.find('ul.scrollbox li span:not(.validated):first');
        videoCurrent.click();

        // give the video time to load so that we can determine the play time
        setTimeout(scheduleVideo, 1000 * waitExtra);
    }

    // determine the play time and schedule next
    function scheduleVideo () {
        var wait = getVideoDuration();
        console.log('Video "' + videoCurrent.text().trim() + '" started and will take ' + wait + ' seconds.');

        // schedule next iteration
        waitTimeout = setTimeout(play, 1000 * wait);
    }

    // determine duration of video
    function getVideoDuration () {
        var timers = videoContainer.find('.pptimeleft');
        var hours = parseInt(timers.find('.pphr_dur').text(), 10);
        var minutes = parseInt(timers.find('.ppmin_dur').text(), 10);
        var seconds = parseInt(timers.find('.ppsec_dur').text(), 10);

        return hours * 3600 + minutes * 60 + seconds;
    }

    // wait for video to show
    function waitUntilVideoReady () {
        if (!videoContainer.find(".slidenav").length) {
            console.log("Waiting for video to load...");
            window.requestAnimationFrame(waitUntilVideoReady);
        }

        console.log("Videoplayer ready.");
    }
}());