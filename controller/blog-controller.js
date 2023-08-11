var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'newpassword',
    database: 'blog app'
});

connection.connect((err, res) => {
    if (err) {
        console.log("DB connection failed");
    } else {
        console.log("DB conection success");
    }
});


exports.fetchAllPost = (req, res) => {
    if (req.query.ID == undefined) {
        let query = `SELECT * FROM blog`;
        connection.query(query, (err, dbres) => {
            if (err) {
                console.log(err);
                console.log("fetched failed...");
                res.json({ status: -1, statusmessage: "failure", err: err.message });
            }
            console.log("fetched successfully..", JSON.stringify(dbres));
            res.json({ status: 1, statusmessage: "success", message: dbres });
        })
    } else {
        let query = `SELECT * FROM blog WHERE ID=${req.query.ID}`;
        connection.query(query, (err, dbres) => {
            if (err) {
                console.log(err);
                console.log("fetched failed...");
                res.json({ status: -1, statusmessage: "failure", err: err.message });
            }
            console.log("fetched successfully..", JSON.stringify(dbres));
            res.json({ status: 1, statusmessage: "success", message: dbres });
        })
    }
}

exports.savePost = (req, res) => {
    let query = `INSERT INTO blog (Title,Content,Author) VALUES ('${req.body.title}','${req.body.content}', '${req.body.author}');`;
    connection.query(query, (err, dbres) => {
        if (err) {
            console.log(err);
            console.log("failed to insert..");
            res.json({ status: -1, statusmessage: "failure", err: err.message });
        }
        console.log("inserted successfully..", JSON.stringify(dbres));
        res.json({ status: 1, statusmessage: "success", message: "inserted successfully" });
    })
}

exports.updatePost = (req, res) => {
    let { title, content, author } = req.body;
    if (!title && !content && !author) {
        return res.json({ status: 1, statusmessage: "success", message: "nothing to update" });
    }

    var datetime = new Date();

    let query = `UPDATE blog SET Title='${title}',Content='${content}',Author='${author}' WHERE ID=${req.query.ID}`;

    connection.query(query, (err, dbres) => {
        if (err) {
            console.log(err);
            console.log("failed to update..");
            res.json({ status: -1, statusmessage: "failure", err: err.message });
        }
        console.log("updated successfully..", JSON.stringify(dbres));
        res.json({ status: 1, statusmessage: "success", message: "updated successfully" });
    })
}

exports.deletePost = (req, res) => {

    let query = `DELETE FORM blog WHERE ID=${req.query.ID}`;

    connection.query(query, (err, dbres) => {
        if (err) {
            console.log(err);
            console.log("failed to delete..");
            res.json({ status: -1, statusmessage: "failure", err: err.message });
        }
        console.log("deleted successfully..", JSON.stringify(dbres));
        res.json({ status: 1, statusmessage: "success", message: "deleted successfully" });
    })
}