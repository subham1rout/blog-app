const express = require("express");
const app = express();

app.use("/blogging", require("./routes/blog-router"));

app.listen(8080, () => console.log("Blog App Listening on port 8080"));