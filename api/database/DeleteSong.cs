using mis321pa3.interfaces;
using System.Data;
using MySql.Data;
using MySql.Data.MySqlClient;
using api.Models;
using api;

namespace mysqlvids.database
{
    public class DeleteSong : IDeleteSong
    {
        public static void DropSongTable(){
            ConnectionString myConnection = new ConnectionString();
            string cs = myConnection.cs;

            using var con = new MySqlConnection(cs);
            con.Open();

            string stm = @"DROP TABLE IF EXISTS songs";

            using var cmd = new MySqlCommand(stm, con);

            cmd.ExecuteNonQuery();

            con.Close();
        }
        void IDeleteSong.DeleteSong(string id)
        {
            throw new System.NotImplementedException();
        }
    }
}