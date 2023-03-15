using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using api.Models;
using api.Handler;
using mis321pa3.database;
using mis321pa3.interfaces;
using api.Controllers;
using api.Handler;
using api.Models;
using System.Collections.Generic;

namespace api.Controllers
{
    [Route("api/song")]
    [ApiController]
    public class SongController : ControllerBase
    {
        // GET: api/Song
        [HttpGet]
        public IEnumerable<Song> Get()
        {
            // SongHandler mySongHandler = new SongHandler();
            // var mySongs = mySongHandler.GetAllSongs();
            // GetSongs getSongs = new GetSongs();
            // var mySongs = getSongs.GetAllSongs();
            List<Song> mySongs = new List<Song>();
            try{
                IGetAllSongs readObject = new GetSongs();
                mySongs = readObject.GetAllSongs();
                string waste = mySongs[0].ToString();
            } catch {
                mySongs = new List<Song>();
            }
            return mySongs;
        }

        // GET: api/Song/5
        [HttpGet("{id}", Name = "Get")]
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Song
        [HttpPost]
        public void Post([FromBody] Song value)
        {
            SongHandler mySongHandler = new SongHandler();
            SaveSong mySaveSong = new SaveSong();
            mySongHandler.AddSong(value);
            SaveSong.CreateSongTable();
            Song mySong = new Song(){SongID = value.SongID, Title = value.Title, Artist = value.Artist, DateAdded = value.DateAdded.ToString(), Favorited = value.Favorited, Deleted = value.Deleted};
            System.Console.WriteLine(mySong);
            mySong.Save.CreateSong(value);
        }

        // PUT: api/Song/5
        [HttpPut("{id}")] //UPDATE
        public void Put(int id, [FromBody] Song updateSong)
        {
            SaveSong mySaveSong = new SaveSong();
            mySaveSong.UpdateSong(updateSong);
        }

        // DELETE: api/Song/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            System.Console.WriteLine("inside the delete");
            System.Console.WriteLine(id);
        }
    }
}
