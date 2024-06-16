function downloadThumbnail(event) {
    event.preventDefault();

    let videoUrl = document.getElementById("videoUrl").value;

    let videoId = extractVideoId(videoUrl);

    if (videoId) {
        let thumbnail = document.getElementById("thumbnail");

        let url = "https://img.youtube.com/vi/" + videoId + "/maxresdefault.jpg";
        thumbnail.src = url;

        window.downloadUrl = url;
        window.downloadFilename = videoId + ".jpg";
    } else {
        alert("Invalid video URL");
    }
}

function extractVideoId(url) {
    let match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|\/)([^"&?\/\s]{11})/i);
    return match ? match[1] : null;
}

function downloadImage() {
    if (window.downloadUrl && window.downloadFilename) {
        fetch(window.downloadUrl)
            .then(response => response.blob())
            .then(blob => {
                let a = document.createElement("a");
                a.href = window.URL.createObjectURL(blob);
                a.download = window.downloadFilename;
                a.click();
            });
    } else {
        alert("Please enter a valid video URL and click on the 'Get Thumbnail' button first.");
    }
}
