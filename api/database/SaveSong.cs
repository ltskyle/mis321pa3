using mis321pa3;
using mis321pa3.interfaces;
using System.Data;
using MySql.Data;
using MySql.Data.MySqlClient;
using api.Models;
using api;

namespace mis321pa3.database
{
    public class SaveSong : ISaveSong
    {
        public static void CreateSongTable() {
            ConnectionString myConnection = new ConnectionString();
            string cs = myConnection.cs;

            using var con = new MySqlConnection(cs);
            con.Open();

            string stm = @"CREATE TABLE if not exists songs(id TEXT, title TEXT, artist TEXT, dateadded TEXT, favorited TEXT, deleted TEXT, numID int auto_increment primary key)";

            using var cmd = new MySqlCommand(stm, con);

            cmd.ExecuteNonQuery();   
        }

        public void CreateSong(Song mySongs)
        {
            ConnectionString myConnection = new ConnectionString();
            string cs = myConnection.cs;
            using var con = new MySqlConnection(cs);
            con.Open();
        
            string stm = @"INSERT INTO songs(id, title, artist, dateadded, favorited, deleted) VALUES(@id, @title, @artist, @dateadded, @favorited, @deleted)";

            using var cmd = new MySqlCommand(stm, con);

            cmd.Parameters.AddWithValue("@id", mySongs.SongID);
            cmd.Parameters.AddWithValue("@Title", mySongs.Title);
            cmd.Parameters.AddWithValue("@Artist", mySongs.Artist);
            cmd.Parameters.AddWithValue("@DateAdded", mySongs.DateAdded);
            cmd.Parameters.AddWithValue("@Favorited", mySongs.Favorited);
            cmd.Parameters.AddWithValue("@Deleted", mySongs.Deleted);

            cmd.Prepare();

            cmd.ExecuteNonQuery();
        }

        public void UpdateSong(Song updateSong){
            ConnectionString myConnection = new ConnectionString();
            string cs = myConnection.cs;
            using var con = new MySqlConnection(cs);
            con.Open();
            string stm = @$"Update tsldq520l58kscm6.songs SET favorited=@Favorited, deleted=@Deleted, title=@title, artist=@artist WHERE numID =@numID";

            using var cmd = new MySqlCommand(stm, con);
        
            cmd.Parameters.AddWithValue("@id",updateSong.SongID);
            cmd.Parameters.AddWithValue("@title",updateSong.Title);
            cmd.Parameters.AddWithValue("@artist",updateSong.Artist);
            cmd.Parameters.AddWithValue("@favorited",updateSong.Favorited);
            cmd.Parameters.AddWithValue("@deleted",updateSong.Deleted);
            cmd.Parameters.AddWithValue("@numID",updateSong.numID);
            cmd.Prepare();

            cmd.ExecuteNonQuery();
        }
        void ISaveSong.SaveSong(Song mySongs)
        {
            throw new System.NotImplementedException();
        }
    }
}