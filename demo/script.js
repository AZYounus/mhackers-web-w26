const table = document.getElementById("playlist");
const API_KEY = "AIzaSyBNAhypwv4ndyZiM41_lRI5nm5_AIYGyeg";
const curr_video_length = 0;

table.addEventListener('click', (e) => {
    const row = e.target.closest("tr");
    if (!row) return;

    const title_el = row.querySelector(".song_title");
    const author_el = row.querySelector(".song_author");
    // ignore header/other rows
    if (!title_el || !author_el) return;

    // indicate which row is currently playing
    const prevActive = table.querySelector('.active_song');
    if (prevActive) prevActive.classList.remove('active_song');

    const title = title_el.innerText;
    const author = author_el.innerText;

    fetchYouTubeVideo(`${title} ${author}`);
    row.classList.add("active_song");
})

function fetchYouTubeVideo(query) {
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&type=video&maxResults=1&key=${API_KEY}`;

    fetch(url)
    .then(response => response.json())
    .then(data => {
        if (data.items.length > 0) {
            const videoId = data.items[0].id.videoId;
            fetchVideoDuration(videoId).then(durationSeconds => {
                    console.log(`Video duration: ${durationSeconds}s`);
                    displayVideo(videoId);
            });
        } else {
            console.log("No video found");
        }
    })
    .catch(error => console.error("Error:", error));
}

function fetchVideoDuration(videoId) {
    const url = `https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=${videoId}&key=${API_KEY}`;

    return fetch(url)
        .then(response => response.json())
        .then(data => {
            const duration = data.items?.[0]?.contentDetails?.duration;
            return parseISODuration(duration);
        })
        .catch(() => 0);
}

function parseISODuration(isoDuration) {
    if (!isoDuration) return 0;

    const match = isoDuration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
    if (!match) return 0;

    const hours = parseInt(match[1] || "0", 10);
    const minutes = parseInt(match[2] || "0", 10);
    const seconds = parseInt(match[3] || "0", 10);

    return hours * 3600 + minutes * 60 + seconds;
}

function displayVideo(videoId) {
    const container = document.getElementById("videoContainer");

    container.innerHTML = `
        <iframe
            src="https://www.youtube.com/embed/${videoId}?origin=http://localhost:8000"
            frameborder="0"
            allowfullscreen>
        </iframe>
    `;
}
