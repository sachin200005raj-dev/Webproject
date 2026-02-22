import React, { useContext } from 'react'
import Spinner from '../helpers/Spinner'
import { AlbumContextAPI } from './../context/AlbumContext';
import { NavLink } from 'react-router-dom';
const Dashboard = () => {
    let {albums,isLoading}=useContext(AlbumContextAPI)
   console.log(albums);
    
  return (
    <div className='p-8 w-[80%]'>
        <h2 className='text-3xl  text-white font-semibold'>Album</h2>
        <section className='mt-4 flex gap-6 overflow-x-auto scrollbar-hide'>
            {albums.map((album)=>{
                return(
                <NavLink to="/album-detail"
                state={{album}}
                key={album.albumId} className='p-4 bg-black rounded-lg shrink-0'>
                    <img src={album.albumPoster}alt='' className='w-[150px]  text-white h-[180px] rounded-lg'/>
                    <h3 className='mt-2 text-center text-white  text-xl font-semibold'> {album.albumTitle}</h3>
                    </NavLink>
                );
            })}
        </section>
      {isLoading && <Spinner/>}
    </div>
  )
}

export default Dashboard