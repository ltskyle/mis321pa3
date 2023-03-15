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
            // AllSongs.Add(new Song(){SongID = 1, Title = "Mr. Brightside", Artist = "The Killers", DateAdded = "3/13/2023", Favorited = false, Deleted = false});

        }

        public List<Song> GetAllSongs()
        {
            AllSongs.Reverse();
            System.Console.WriteLine(AllSongs);
            return AllSongs;
        }

        public void AddSong(Song newSong)
        {
            AllSongs.Insert(0, newSong);
            PrintAll();
        }

        public void PrintAll()
        {
            foreach(Song song in AllSongs) {
                System.Console.WriteLine(song.MyToString());
            }
        }

        public void Favorite(string id, Song favoriteSong){
            int index = AllSongs.FindIndex(s => s.SongID==id);
            AllSongs[index].Favorited="true";
        }

    }
}