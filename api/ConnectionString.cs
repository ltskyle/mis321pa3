namespace api
{
    public class ConnectionString
    {
        public string cs {get; set;}

        public ConnectionString() {
            string server = "w3epjhex7h2ccjxx.cbetxkdyhwsb.us-east-1.rds.amazonaws.com";
            string database = "tsldq520l58kscm6";
            string port = "3306";
            string userName = "ybbubhfanuzaepwy";
            string password = "qe4r27bvjkeql4fm";

            cs = $@"server = {server};user={userName};database={database};port={port};password={password};";
        }
    }
}