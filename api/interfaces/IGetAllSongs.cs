using mis321pa3.interfaces;
using mis321pa3.database;
using mis321pa3;
using api.Models;
using System.Data;
using MySql.Data;
using MySql.Data.MySqlClient;
using api;
using System.Collections.Generic;

namespace mis321pa3.interfaces
{
    public interface IGetAllSongs
    {
        public List<Song> GetAllSongs();
    }
    
}