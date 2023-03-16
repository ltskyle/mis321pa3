using mis321pa3.interfaces;
using mis321pa3.database;
using System;
using api.Controllers;

namespace api.Models
{
    public class Song
    {
        public string SongID {get; set;}
        public string Title {get; set;}
        public string Artist {get; set;}
        public string DateAdded {get; set;}
        public string Favorited {get; set;}
        public string Deleted {get; set;}
        public int numID {get; set;}
        public ISaveSong Save {get; set;}

        public Song(){
            SongID = Guid.NewGuid().ToString();
            DateAdded = DateTime.Now.ToString("M/d/yyyy");
            Save = new SaveSong();
        }

        public string MyToString() {
            return $"{SongID} {Title} {Artist} {DateAdded} {Favorited} {Deleted}";
        }

    }
}