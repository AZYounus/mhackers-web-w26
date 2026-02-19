const table = document.getElementById("playlist");
const API_KEY = "AIzaSyBNAhypwv4ndyZiM41_lRI5nm5_AIYGyeg";

table.addEventListener('click', (e) => {
    const row = e.target.closest("tr");

    const title = row.querySelector(".song_title").innerText;
    const author = row.querySelector(".song_author").innerText;

    console.log(`${title} ${author}`);
    fetchYouTubeVideo(`${title} ${author}`);
})


function fetchYouTubeVideo(query) {
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&type=video&maxResults=1&key=${API_KEY}`;

    fetch(url)
    .then(response => response.json())
    .then(data => {
        if (data.items.length > 0) {
            const videoId = data.items[0].id.videoId;
            displayVideo(videoId);
        } else {
            console.log("No video found");
        }
    })
    .catch(error => console.error("Error:", error));
}

function displayVideo(videoId) {
    const container = document.getElementById("videoContainer");
    const screenContainer = document.querySelector(".screen_container");

    container.innerHTML = `
        <iframe width="${screenContainer.offsetWidth}" height="${screenContainer.offsetHeight}"
            src="https://www.youtube.com/embed/${videoId}?origin=http://localhost:8000"
            frameborder="0"
            allowfullscreen>
        </iframe>
    `;
}