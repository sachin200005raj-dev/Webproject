import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import { AlbumContextAPI } from "../context/AlbumContext";
const AlbumDetails = () => {
  let data = useLocation();
  let {
    state: { album },
  } = data;
  // console.log(album);
  let {
    songs,
    setSongs,
    isPlaying,
    setIsPlaying,
    currentSongIndex,
    setCurrentSongIndex,
  } = useContext(AlbumContextAPI);

  let handleClick = (index) => {
    setSongs(album.songs);
    setCurrentSongIndex(index);
    if (currentSongIndex === index) {
      setIsPlaying(!isPlaying);
    } else {
      setIsPlaying(true);
    }
  };

  const formatduration = (durationInSeconds) => {
    let minutes = Math.floor(durationInSeconds / 60);
    let seconds = Math.floor(durationInSeconds % 60);
    return ` ${minutes} : ${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <section className="p-6">
      <article className="flex gap-8 bg-black hover:bg-slate-950 p-4 rounded-lg border-transparent border-1   hover:border-blue-500">
        <aside className="shrink-0">
          <img
            src={album.albumPoster}
            className="h-[370px] w-[320px] rounded-md"
          />
        </aside>
        <aside className="">
          <h2 className="text-3xl font-semibold font-serif">
            {album.albumTitle}
          </h2>
          <ul className="mt-4 flex flex-col gap-3 text-lg ">
            <li className="flex ">
              <span className="w-[130px] font-serif font-bold">Title</span>
              <span className="w-[20px] ">:</span>
              <span className="text-[20px] text-gray-500 font-semibold font-[Courier] ">
                {album.albumTitle}
              </span>
            </li>
            <li className="flex ">
              <span className="w-[130px] font-serif font-bold ">
                No.of.Tracks
              </span>
              <span className="w-[20px] ">:</span>
              <span className="text-[20px] text-gray-500 font-semibold font-[Courier]">
                {album.songs.length}
              </span>
            </li>
            <li className="flex">
              <span className="w-[130px] font-serif font-bold ">
                Release Data
              </span>
              <span className="w-[20px] ">:</span>
              <span className="text-[20px] text-gray-500 font-semibold font-[Courier]">
                {album.albumReleaseDate}
              </span>
            </li>
            <li className="flex">
              <span className="w-[130px] font-serif font-bold ">Languages</span>
              <span className="w-[20px] ">:</span>
              <span className="text-[20px] text-gray-500 font-semibold font-[Courier]">
                {album.albumLanguages}
              </span>
            </li>
            <li className="flex">
              <span className="w-[130px]  font-serif  font-bold shrink-0 ">
                Description
              </span>
              <span className="w-[20px]   shrink-0">:</span>
              <span className="text-[20px] text-gray-500 font-semibold font-[Courier]">
                {album.albumDescription}
              </span>
            </li>
          </ul>
        </aside>
      </article>
      <main className={`p-2 mt-4 bg-slate-900 rounded-lg ${currentSongIndex !== null && "mb-[120px]"}`}>
        <h3 className="text-xl  px-4 font-bold font-serif">Songs List</h3>
        <table className="w-full mt-4 text-left rounded-lg overflow-hidden">
          <thead className="bg-black uppercase w-full  font-bold text-[14px] ">
            <tr>
              <th className="px-4 py-3 text-center"></th>
              <th className="px-4  py-3 ">Track</th>
              <th className="px-2 py-3 text-center">Song Name</th>
              <th className="px-2 py-3 text-center">Singers</th>
              <th className="px-2 py-3 text-center">Director</th>
              <th className="px-2 py-3 text-center">Mood</th>
              <th className="px-2 py-3 text-center">Duration</th>
            </tr>
          </thead>
          <tbody className="w-full ">
            {album.songs.map((song, index) => {
              return (
                <tr
                  className="border-y-2 border-black hover:border-slate-500 cursor-pointer font-[mono]"
                  onClick={() => handleClick(index)}
                >
                  <td className="py-2 text-center">{index + 1}</td>
                  <td className="py-2 text-center">
                    <img
                      src={song.songThumbnailURL}
                      alt=""
                      className="w-[70%] h-12 rounded-lg "
                    />
                  </td>
                  <td className="py-2 text-center">{song.songName}</td>
                  <td className="py-2 text-center">{song.songSingers}</td>
                  <td className="py-2 text-center">{song.songDirector}</td>
                  <td className="py-2 text-center">{song.songMood}</td>
                  <td className="py-2 text-center">
                    {formatduration(song.songDuration)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </main>
    </section>
  );
};

export default AlbumDetails;