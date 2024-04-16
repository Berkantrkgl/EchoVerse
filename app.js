const express = require("express");
const app = express();
const path = require("path");
const appRouter = require("./src/routes/appRoutes");
const userRouter = require("./src/routes/userRoutes");
const models = require("./src/models");
const port = 3000;

// Database connection
models.connectToDatabase();

// Server side configurations
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src/views"));

// Routing
app.use("/", appRouter);
app.use("/user", userRouter);

// Running the server
app.listen(port, () => {
    console.log(`App is running on port ${port}`);
});
