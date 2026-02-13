const table = document.getElementById("playlist");

table.addEventListener('click', (e) => {
    const row = e.target.closest("tr");

    const title = row.querySelector(".song_title");
    const author = row.querySelector(".song_author");
    console.log(title);
    console.log(author);
    
})