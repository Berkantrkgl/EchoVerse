const express = require("express");
const app = express();
const path = require("path");
const appRouter = require("./src/routes/appRoutes");
const userRouter = require("./src/routes/userRoutes");
const models = require("./src/models");
const methodOverride = require("method-override");

// Send messages to user
const session = require("express-session");
const flash = require("connect-flash");

const sessionOptions = {
    secret: "thisisnotgoodsecret",
    resave: false,
    saveUninitialized: false,
};

app.use(session(sessionOptions));
app.use(flash());

// Port number
const port = 3000;

// Database connection
models.connectToDatabase();

// Server side configurations
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src/views"));
app.use(methodOverride("__method"));

// Routing
app.use("/", appRouter);
app.use("/user", userRouter);

// Flash middleware
app.use((req, res, next) => {
    res.locals.message = req.flash("success");
    next();
});

// Running the server
app.listen(port, () => {
    console.log(`App is running on port ${port}`);
});
