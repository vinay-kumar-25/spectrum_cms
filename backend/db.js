    import mysql2 from "mysql2/promise"
    let db;
    try{

        db = await mysql2.createConnection({
            host:"localhost",
            user:"root",
            password:"vinaykumar",
            database:"spectrum"
        })
        console.log("Database connected successfully ");
        
    }
    catch{(err)=>{console.log(err)}}

    export default db;