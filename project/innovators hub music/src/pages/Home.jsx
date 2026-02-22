import React, { useContext } from 'react'
import { AlbumContextAPI } from '../context/AlbumContext';
import { Outlet } from 'react-router-dom';

import CustomAudioPlayer from 'react-pro-audio-player';
import Sidebar from '../home/Siderbar';

const Home = () => {
  // let {album}=useContext(AlbumcontextAPI)
  // console.log(album);
  

   let {
      songs,
      setSongs,
      isPlaying,
      setIsPlaying,
      currentSongIndex,
      setCurrentSongIndex,
    } = useContext(AlbumContextAPI);

  return (<>
    <div className='flex bg-slate-800 min-h[calc(100vh-70px)] '>
      <Sidebar />
      <Outlet/>

    </div>
    {currentSongIndex !== null && (
      <div className=''>
      <CustomAudioPlayer
        songs={songs}
        isPlaying={isPlaying}
        currentSongIndex={currentSongIndex}
        onPlayPauseChange={setIsPlaying}
        onSongChange={setCurrentSongIndex}
        songUrlKey="songURL"
        songNameKey="songName"
        songThumbnailKey="songThumbnailURL"
        songSingerKey="songSingers"
      />
      </div>
    )}
    </>
  )
}

export default Home