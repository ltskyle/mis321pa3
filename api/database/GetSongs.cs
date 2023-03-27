using mis321pa3;
using mis321pa3.interfaces;
using System.Data;
using MySql.Data;
using MySql.Data.MySqlClient;
using api.Models;
using api;
using mis321pa3.database;
using System.Collections.Generic;

namespace mis321pa3.database
{
    public class GetSongs : IGetAllSongs
    {

        public List<Song> GetAllSongs()
        {
            List<Song> allSongs = new List<Song>();
            ConnectionString myConnection = new ConnectionString();
            string cs = myConnection.cs;
            using var con = new MySqlConnection(cs);
            con.Open();
            string stm = @"SELECT * FROM tsldq520l58kscm6.songs";
            using var cmd = new MySqlCommand(stm, con);
            using MySqlDataReader rdr = cmd.ExecuteReader();

            while (rdr.Read()) {
                Song temp = new Song(){SongID=rdr.GetString(0), Title=rdr.GetString(1), Artist=rdr.GetString(2), DateAdded=rdr.GetString(3), Favorited=rdr.GetString(4), Deleted=rdr.GetString(5), numID=rdr.GetInt32(6)};
                allSongs.Insert(0, temp);
            }

            return allSongs;
        }

        public Song GetSong(string id)
        {
            ConnectionString myConnection = new ConnectionString();
            string cs = myConnection.cs;
            using var con = new MySqlConnection(cs);
            con.Open();
            string stm = @"SELECT * FROM tsldq520l58kscm6.songs WHERE id = @id";
            using var cmd = new MySqlCommand(stm, con);
            cmd.Parameters.AddWithValue("@id", id);
            cmd.Prepare();
            using MySqlDataReader rdr = cmd.ExecuteReader();
            rdr.Read();
            return new Song(){SongID=rdr.GetString(0), Title=rdr.GetString(1), Artist=rdr.GetString(2), DateAdded=rdr.GetString(3), Favorited=rdr.GetString(4), Deleted=rdr.GetString(5), numID=rdr.GetInt32(6)};
        }
    }
}