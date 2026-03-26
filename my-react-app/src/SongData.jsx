function SongData({title, author, album, duration})
{
    return(
        <>
            <tr>
                <td><h4>1</h4></td>
                <td>
                    <h4 className="song_title">{title}</h4>
                    <h5 className="song_author">{author}</h5>
                </td>
                <td><h5>{album}</h5></td>
                <td><h5>{duration}</h5></td>
            </tr>
        </>
    )
}

export default SongData