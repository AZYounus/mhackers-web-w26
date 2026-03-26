import SongData from "./SongData"

function SongTable()
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
        }
    ]
    return (
        <>
            <table id="playlist">
                <tr>
                    <th><h5>#</h5></th>
                    <th><h5>Title</h5></th>
                    <th><h5>Album</h5></th>
                    <th><h5>Duration</h5></th>
                </tr>
                {playlist_info.map((data, index) => {
                    return <SongData
                        key={index}
                        title={data.title}
                        author={data.author}
                        album={data.album}
                        duration={data.duration}
                    />
                })}
            </table>
        </>
    )
}

export default SongTable