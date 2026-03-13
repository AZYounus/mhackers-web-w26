const table = document.getElementById("playlist");
const API_KEY="AIzaSyAsHM_lJDSkYSxyPOHkH1hIooa1abjvPj4";

table.addEventListener('click', e => {
    const row = e.target.closest("tr");

    const title = row.querySelector(".song_title").innerText;
    const author = row.querySelector(".song_author").innerText;

    console.log(`${title} ${author}`);
    fetchYoutubeVideo(`${title} ${author}`);
})

function fetchYoutubeVideo(query)
{
    const url = `https://www.googleapis.com/youtube/v3/videos/search?part=snippet&q=${encodeURIComponent(query)}&type=video&maxResults=1&key=${API_KEY}`;

    fetch(url)
        .then(response => response.json())
        .then(data => console.log("got here", data))
}