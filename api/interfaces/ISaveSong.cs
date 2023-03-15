using mis321pa3.interfaces;
using mis321pa3.database;
using mis321pa3;
using api.Models;

namespace mis321pa3.interfaces
{
    public interface ISaveSong
    {
         public void CreateSong(Song mySong);
         public void SaveSong(Song mySong);
    }
    
}