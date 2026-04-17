import { useState } from 'react'
import './App.css'
import SongTable from './SongTable'

function App() {
  const [videoId, setVideoId] = useState(null);

  return (
    <>
      <div className="background_container">
        <div className="playlist_container">
            <img src="/album_image.png" alt="image of four album covers" />
            <p>Private Playlist</p>
            <h1>Go Out On A Chewsday</h1>
            <ul className="playlist_description">
                <li><span>Zohra Sin</span></li>
                <li><span>1 save</span></li>
                <li><span>2026 songs, about 6072 hours</span></li>
            </ul>
            <hr></hr>
            <SongTable onVideoFound={setVideoId}/>
        </div>

        <div className="device_container">
          <div className="device_container_box-1"></div>
          <div className="device_container_box-2"></div>
          <div className="device_container_box-3">
            <div className="screen_container">
              <div className="screen_glass">
                <div id="videoContainer" className="videoContainer">
                  {videoId && (
                    <iframe
                      src={`https://www.youtube.com/embed/${videoId}?origin=http://localhost:3000`}
                      frameBorder="0"
                      allowFullScreen
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="device_btn_groups">
              <div className="device_left_group">
                  <div className="pm_container">
                      <i className="fa fa-plus device_btn"></i>
                      <i className="fa fa-minus device_btn"></i>
                  </div>
                  <div className="lr_container">
                      <i className="fa fa-caret-left device_btn"></i>
                      <i className="fa fa-caret-right device_btn"></i>
                  </div>
              </div>
              <div className="device_middle_group">
                  <i className="fa fa-fast-backward device_btn"></i>
                  <i className="fa fa-pause device_btn"></i>
                  <i className="fa fa-play device_btn"></i>
                  <i className="fa fa-fast-forward device_btn"></i>
              </div>
              <div className="device_right_group">
                  <i className="fa fa-power-off device_btn"></i>
                  <i className="fa fa-home device_btn"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
