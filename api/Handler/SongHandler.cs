using api.Models;
using api.Controllers;
using api.Handler;
using mis321pa3.database;
using mis321pa3.interfaces;
using System.Data;
using MySql.Data;
using System.Collections.Generic;
using MySql.Data.MySqlClient;

namespace api.Handler
{
    public class SongHandler
    {
        public static List<Song> AllSongs = new List<Song>();

        public SongHandler()
        {

        }

        public List<Song> GetAllSongs()
        {
            AllSongs.Reverse();
            return AllSongs;
        }

        public void AddSong(Song newSong)
        {
            AllSongs.Insert(0, newSong);
        }
    }
}