const express = require("express");
const app = express();
const path = require("path");

const models = require("./src/models");
const methodOverride = require("method-override");

const indexRouter = require("./src/routes/index");
const wordRouter = require("./src/routes/wordsRoutes");
const userRouter = require("./src/routes/userRoutes");
const practiceRouter = require("./src/routes/practiceRoutes");

// Send messages to user
const session = require("express-session");
const flash = require("connect-flash");

const sessionOptions = {
    secret: "thisisnotgoodsecret",
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7,
    },
};

app.use(session(sessionOptions));
app.use(flash());

// Port number
const port = 3000;

// Database connection
models.connectToDatabase();

app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    next();
});

// Server side configurations
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src/views"));
app.use(methodOverride("__method"));

// Routing
app.use("/", indexRouter);
app.use("/words", wordRouter);
app.use("/practice", practiceRouter);
app.use("/users", userRouter);

// Running the server
app.listen(port, () => {
    console.log(`App is running on port ${port}`);
});
