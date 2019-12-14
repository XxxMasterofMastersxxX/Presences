var presence = new Presence({
    clientId: "548806815614500874",
    mediaKeys: false
}), strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
});
var browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", () => {
    let presenceData = {
        largeImageKey: "replitlogo"
    };
    if (document.location.hostname == "repl.it") {
        presenceData.startTimestamp = browsingStamp;
        if (document.location.pathname.includes("/~")) {
            presenceData.details = "Viewing The Home";
        } else if (document.location.pathname.includes("/create")) {
            presenceData.details = "Creating a New Project";
        } else if (document.location.pathname.includes("/repls")) {
            presenceData.details = "Viewing The Repls";
        } else if (document.location.pathname.includes("/templates")) {
            presenceData.details = "Viewing Templates";
        } else if (document.location.pathname.includes("/@")) {
            presenceData.details = "Editing a Project/Viewing a User";
        } else if (document.location.pathname.includes("/languages")) {
            presenceData.details = "Choosing a Language";
        }
    }
    if (presenceData.details == null) {
        presence.setTrayTitle();
        presence.setActivity();
    }
    else {
        presence.setActivity(presenceData);
    }

});
function getTimestamps(videoTime, videoDuration) {
    var startTime = Date.now();
    var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
}