const express = require('express');
const commentRouter = require("./router/comment");
const blogRouter = require("./router/blog");
const userRouter = require("./router/user")
const dotenv = require('dotenv');
const loaddb = require("./utils/db");
const app = express();
const cors = require('cors');

dotenv.config();

const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/comment', commentRouter);
app.use('/blog', blogRouter);
app.use('/user', userRouter)


app.get('/', (req, res) => {
    res.send('Hello World!');
    });


app.listen(port, () => {
    console.log('blog app listening on port');
});

