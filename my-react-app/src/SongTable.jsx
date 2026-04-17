import SongData from "./SongData"
import { useState } from "react";
const API_KEY = "AIzaSyBNAhypwv4ndyZiM41_lRI5nm5_AIYGyeg";

function SongTable({ onVideoFound })
{
    let playlist_info = [
        {
            "title": "Ever Seen",
            "author": "beadobee",
            "album": "This Is How Tomorrow Moves",
            "duration": "3:23"
        },
        {
            "title": "Strawberry Milk",
            "author": "zeph",
            "album": "crush (demos)",
            "duration": "0:50"
        },
        {
            "title": "My Fault",
            "author": "zeph",
            "album": "crush (demos)",
            "duration": "1:00"
        },
        {
            "title": "Diamond",
            "author": "Dreamcatcher",
            "album": "The End of Nightmare",
            "duration": "3:21"
        },
        {
            "title": "Shatter",
            "author": "Dreamcatcher",
            "album": "[VillainS]",
            "duration": "2:48"
        },
        {
            "title": "Wonderland",
            "author": "Dreamcatcher",
            "album": "Alone in the City",
            "duration": "3:11"
        },
        {
            "title": "Sneeze",
            "author": "P-Lo, Kehlani",
            "album": "SHINE",
            "duration": "2:35"
        },
        {
            "title": "Forrest Gump",
            "author": "Frank Ocean",
            "album": "channel ORANGE",
            "duration": "3:14"
        },
        {
            "title": "Yoshiwara Lament",
            "author": "WagakkiBand",
            "album": "Vocal Zanmai",
            "duration": "3:53"
        },
        {
            "title": "Principles of Lust: Sadness / Find Love / Sadness (Reprise)",
            "author": "Enigma",
            "album": "MCMXC a.D.",
            "duration": "11:43"
        },
        {
            "title": "let you",
            "author": "iann dior",
            "album": "let you",
            "duration": "2:31"
        },
        {
            "title": "UNETHICAL",
            "author": "Faouzia",
            "album": "FILM NOIR",
            "duration": "2:56"
        },
        {
            "title": "The Summoning",
            "author": "Sleep Token",
            "album": "The Summoning",
            "duration": "6:35"
        },
        {
            "title": "Gira Gira",
            "author": "Ado",
            "album": "Kyougen",
            "duration": "4:36"
        },
        {
            "title": "Over the Moon",
            "author": "The Mar&#x00ED;as",
            "album": "Superclean, Vol. II",
            "duration": "3:02"
        },
        {
            "title": "See you",
            "author": "amin, Dept",
            "album": "See you",
            "duration": "3:06"
        }
    ]
    const [activeId, setActiveId] = useState(null);

    
    async function fetchYoutubeVideo(query) {
        const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&type=video&maxResults=1&key=${API_KEY}`;

        const res = await fetch(url)
        const data = await res.json();
        if (data.items.length > 0) {
            onVideoFound(data.items[0].id.videoId);
            // fetchVideoDuration(videoId).then(durationSeconds => {
            //     console.log(`Video duration: ${durationSeconds}s`);
            // });
        }
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

    function handleSongClick(query) {
        fetchYoutubeVideo(query);
    }

    return (
        <>
            <table id="playlist">
                <tbody>
                    <tr>
                        <th><h5>#</h5></th>
                        <th><h5>Title</h5></th>
                        <th><h5>Album</h5></th>
                        <th><h5>Duration</h5></th>
                    </tr>
                    {playlist_info.map((data, index) => {
                        return <SongData
                            key={index}
                            index={index + 1}
                            title={data.title}
                            author={data.author}
                            album={data.album}
                            duration={data.duration}
                            onClick={handleSongClick}
                        />
                    })}
                </tbody>
            </table>
        </>
    )
}

export default SongTable