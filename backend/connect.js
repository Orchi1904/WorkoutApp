import mysql from "mysql";

//Connect to MYSQL
export const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123456",
    database: "workout"
})