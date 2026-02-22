import React, { useState } from "react";

import { doc, setDoc } from "firebase/firestore";
import { __DB } from "../../backend/FirebaseConfig";

const AddAlbums = () => {
  let [isLoading, setIsLoading] = useState(false);
  let [album, setAlbum] = useState({
    albumTitle: "",
    albumPoster: null,
    albumReleaseDate: "",
    albumLanguages: "",
    albumDescription: "",
  });
  let {
    albumTitle,
    albumPoster,
    albumReleaseDate,
    albumLanguages,
    albumDescription,
  } = album;
  let handleAlbumChange = (e) => {
    let value = e.target.value;
    let key = e.target.name;
    setAlbum({ ...album, [key]: value });
  };
  let handleAlbumPosterChange = (e) => {
    let file = e.target.files[0];
    setAlbum({ ...album, albumPoster: file });
  };

  let initialSongData = {
    songName: "",
    songFile: null,
    songThumbnail: null,
    songSingers: "",
    songMood: "",
    songDirector: "",
  };

  let [songs, setSongs] = useState([initialSongData]);

  let addSongs = () => {
    setSongs([...songs, { ...initialSongData }]);
  };

  let removeSongs = (ind) => {
    let newSongs = songs.filter((value, index) => index !== ind);
    setSongs(newSongs);
  };

  let handleSongChange = (e, index) => {
    let value = e.target.value;
    let key = e.target.name;
    let copy = [...songs];
    copy[index][key] = value;
    setSongs(copy);
  };

  let handleSongFileChange = (e, index) => {
    let file = e.target.files[0];
    let key = e.target.name;
    let copy = [...songs];
    copy[index][key] = file;
    setSongs(copy);
  };

  let handleSubmit = async (e) => {
    e.preventDefault();

    try {
        setIsLoading(true)
      let albumPosterData=new FormData()
      albumPosterData.append("file",albumPoster)
      albumPosterData.append("upload_preset","innovator-hub-music1")
      let response=await   fetch("https://api.cloudinary.com/v1_1/denofamnb/image/upload",{method:"POST",body:albumPosterData})
      let posterResult=await response.json()
      // console.log(posterResult);
      let albumId=posterResult.asset_id;
      let albumPosterURL=posterResult.url
      let albumData={
        albumId:albumId,
        albumTitle:albumTitle,
        albumPoster:albumPosterURL,
        albumReleaseDate:albumReleaseDate,
        albumLanguages:albumLanguages,
        albumDescription:albumDescription
      }
      console.log(albumData);

      let songData=[]

      await Promise.all(songs.map(async (value, index) => {
        console.log(value);
        
        let songThumbnailData = new FormData();
        songThumbnailData.append("file", value.songThumbnail);
        songThumbnailData.append("upload_preset","innovator-hub-music1")
        let songThumbnailResponse = await fetch(
          "https://api.cloudinary.com/v1_1/denofamnb/image/upload",
          { method: "POST", body: songThumbnailData }
        );
        let songThumbnailResult = await songThumbnailResponse.json();
        let songThumbnailURL = songThumbnailResult.url;


        let songFileData = new FormData();
        songFileData.append("file", value.songFile);
        songFileData.append("upload_preset","innovator-hub-music1");
        let songFileResponse = await fetch("https://api.cloudinary.com/v1_1/denofamnb/upload",
          { method: "POST", body: songFileData }
        );
        let songFileResult = await songFileResponse.json();

        //console.log(songFileResult);

        let songFileURL = songFileResult.url;
        let songFileFormat = songFileResult.format;
        let songFileBytes = songFileResult.bytes;
        let songFileId=songFileResult.asset_id;
        let songFileDuration=songFileResult.duration


        let songpayload={
          songId:songFileId,
          songName:value.songName,
          songURL:songFileURL,
          songThumbnailURL:songThumbnailURL,
          songFormat:songFileFormat,
          songBytes:songFileBytes,
          songDuration:songFileDuration,
          songSingers:value.songSingers,
          songMood:value.songMood,
          songDirector:value.songDirector

        }
        songData.push(songpayload)

        
        
        
        
      }));
      let payload={...albumData,songs:songData}
        console.log(payload);
let album_collection=doc(__DB,"album_collection",albumData.albumId)
await setDoc(album_collection,payload)

    } catch (error) {
      console.log(error);
      // toast.error(error)
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <section className="h-[100%] w-[100%] flex justify-center p-6 ">
      <article className="min-h-[800px] w-[75%] bg-slate-900 rounded-xl p-4">
        <h2 className="text-center text-2xl text-white font-semibold">Add Album</h2>
        <form className="mt-3" onSubmit={handleSubmit}>
          <h3 className="text-xl text-white font-semibold">Album Details:</h3>
          <article className="mt-3 flex flex-wrap gap-3">
            <div className="flex flex-col gap-2 w-[48%]">
              <label
                htmlFor="albumTitle"
                className="text-white font-semibold text-xl"
              >
                Album Title:
              </label>
              <input
                type="text"
                id="albumTitle"
                placeholder="Enter Album Title"
                className="outline-none bg-white py-2 px-4 rounded-lg text-black"
                name="albumTitle"
                value={albumTitle}
                onChange={handleAlbumChange}
              />
            </div>
            <div className="flex flex-col gap-2 w-[48%]">
              <label
                htmlFor="albumPoster"
                className="text-white text-xl"
              >
                Album Poster:
              </label>
              <input
                type="file"
                id="albumPoster"
                name="albumPoster"
                onChange={handleAlbumPosterChange}
                className="outline-none bg-white py-2 px-4 rounded-lg text-black file:bg-slate-800 file:rounded-sm file:px-3 file:text-white"
              />
            </div>
            <div className="flex flex-col gap-2 w-[48%]">
              <label
                htmlFor="releaseDate"
                className="text-white text-xl"
              >
                Release Date:
              </label>
              <input
                type="date"
                id="releaseDate"
                name="albumReleaseDate"
                value={albumReleaseDate}
                onChange={handleAlbumChange}
                className="outline-none bg-white py-2 px-4 rounded-lg text-black"
              />
            </div>
            <div className="flex flex-col gap-2 w-[48%]">
              <label
                htmlFor="languages"
                className="text-white text-xl"
              >
                Languages:
              </label>
              <input
                type="text"
                id="languages"
                placeholder="Enter Languages"
                name="albumLanguages"
                value={albumLanguages}
                onChange={handleAlbumChange}
                className="outline-none bg-white py-2 px-4 rounded-lg text-black"
              />
            </div>
            <div className="flex flex-col gap-2 w-[98%]">
              <label
                htmlFor="albumDescription"
                className="text-white text-xl"
              >
                Album Description:
              </label>
              <textarea
                id="albumDescription"
                placeholder="Enter Album Description"
                name="albumDescription"
                value={albumDescription}
                onChange={handleAlbumChange}
                className="outline-none bg-white py-2 px-4 rounded-lg text-black"
              />
            </div>
          </article>
          <h3 className="text-xl text-white font-semibold mt-3">
            Song Details:
          </h3>
          <article className="mt-3 flex flex-col gap-4">
            {songs.map((value, index) => {
              return (
                <section
                  className="bg-slate-700 rounded-lg p-4 w-[98%]"
                  key={index}
                >
                 <h4 className="text-center text-xl text-white font-semibold">Song {index + 1}</h4>
                  <main className="flex flex-wrap gap-3">
                    <div className="flex flex-col gap-2 w-[32%]">
                      <label htmlFor="song name" className="block text-[18px] ">
                        song Name:
                      </label>
                      <input
                        type="text"
                        id="song name"
                        placeholder="Enter song name"
                        className="outline-none bg-white py-2 px-4 rounded-lg text-black "
                        value={value.songName}
                        name="songName"
                        onChange={(e) => handleSongChange(e, index)}
                      />
                    </div>
                    <div className="flex flex-col gap-2 w-[32%]">
                      <label htmlFor="song file" className="block text-[18px] ">
                        song file:
                      </label>
                      <input
                        type="file"
                        id="album title"
                        placeholder="Enter album title"
                        className="outline-none bg-white py-2 px-4 rounded-lg text-black  file:bg-slate-800 file:px-3 file:text-white file:rounded-lg"
                        name="songFile"
                        onChange={(e) => handleSongFileChange(e, index)}
                      />
                    </div>
                    <div className="flex flex-col gap-2 w-[32%]">
                      <label
                        htmlFor="song thumbnail"
                        className="block text-[18px] "
                      >
                        song Thumbnail:
                      </label>
                      <input
                        type="file"
                        id="song thumbnail"
                        placeholder="Enter album title"
                        className="outline-none bg-white py-2 px-4 rounded-lg text-black  file:bg-slate-800 file:px-3 file:text-white file:rounded-lg"
                        name="songThumbnail"
                        onChange={(e) => handleSongFileChange(e, index)}
                      />
                    </div>
                    <div className="flex flex-col gap-2 w-[32%]">
                      <label
                        htmlFor=" songsingers"
                        className="block text-[18px] "
                      >
                        Singers:
                      </label>
                      <input
                        type="text"
                        id="songsingers"
                        placeholder="Enter singer"
                        className="outline-none bg-white py-2 px-4 rounded-lg text-black"
                        value={value.songSingers}
                        name="songSingers"
                        onChange={(e) => handleSongChange(e, index)}
                      />
                    </div>
                    <div className="flex flex-col gap-2 w-[32%]">
                      <label htmlFor="songmood" className="block text-[18px] ">
                        Mood:
                      </label>
                      <input
                        type="text"
                        id="songood"
                        placeholder="Enter Mood"
                        className="outline-none bg-white py-2 px-4 rounded-lg text-black"
                        value={value.songMood}
                        name="songMood"
                        onChange={(e) => handleSongChange(e, index)}
                      />
                    </div>
                    <div className="flex flex-col gap-2 w-[32%]">
                      <label
                        htmlFor="song director"
                        className="block text-[18px] "
                      >
                        Director:
                      </label>
                      <input
                        type="text"
                        id="song director"
                        placeholder="Enter the Director"
                        className="outline-none bg-white py-2 px-4 rounded-lg text-black"
                        value={value.songDirector}
                        name="songDirector"
                        onChange={(e) => handleSongChange(e, index)}
                      />
                    </div>
                    <div className="flex justify-between w-[100%]">
                      <div>
                        {songs.length - 1 === index && (
                          <input
                            type="button"
                            value="Add song"
                            className="py-2 px-4 bg-green-600 rounded-lg cursor-pointer font-semibold"
                            onClick={addSongs}
                          />
                        )}
                      </div>
                      <div>
                        {songs.length > 1 && (
                          <input
                            type="button"
                            value="Remove song"
                            className="py-2 px-4 bg-red-600 rounded-lg cursor-pointer font-semibold"
                            onClick={() => removeSongs(index)}
                          />
                        )}
                      </div>
                    </div>
                  </main>
                </section>
              );
            })}
          </article>
          <button className="w-[98%] py-2 mt-3 cursor-pointer bg-blue-800 hover:bg-blue-600 rounded-lg">
            Upload album
          </button>
        </form>
      </article>
      {/* {isLoading && <Spinner />} */}
    </section>
  );
};

export default AddAlbums;