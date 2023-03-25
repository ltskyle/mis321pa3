using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using api.Models;
using mis321pa3.database;
using mis321pa3.interfaces;
using api.Controllers;
using api.Models;
using System.Collections.Generic;

namespace api.Controllers
{
    [Route("api/song")]
    [ApiController]
    public class SongController : ControllerBase
    {
        public static List<Song> AllSongs = new List<Song>();
        // GET: api/Song
        [HttpGet]
        public IEnumerable<Song> Get()
        {
            try{
                IGetAllSongs readObject = new GetSongs();
                AllSongs = readObject.GetAllSongs();
                string waste = AllSongs[0].ToString();
            } catch {
                AllSongs = new List<Song>();
            }
            return AllSongs;
        }

        // GET: api/Song/5
        [HttpGet("{id}", Name = "Get")]
        public Song Get(string id)
        {
            GetSongs readObject = new GetSongs();
            return readObject.GetSong(id);
        }

        // POST: api/Song
        [HttpPost]
        public void Post([FromBody] Song value)
        {
            SaveSong.CreateSongTable();
            Song mySong = new Song(){SongID = value.SongID, Title = value.Title, Artist = value.Artist, DateAdded = value.DateAdded.ToString(), Favorited = value.Favorited, Deleted = value.Deleted};
            mySong.Save.CreateSong(value);
        }

        // PUT: api/Song/5
        [HttpPut("{id}")] //UPDATE
        public void Put(string id, [FromBody] Song value)
        {
            SaveSong mySaveSong = new SaveSong();
            mySaveSong.UpdateSong(value);

        }

        // DELETE: api/Song/5
        [HttpDelete("{id}")]
        public void Delete(string id)
        {
            System.Console.WriteLine("inside the delete");
            System.Console.WriteLine(id);
        }
    }
}
