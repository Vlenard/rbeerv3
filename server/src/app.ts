import express from "express"

const app = express();
const port = process.env.PORT || 3000

const init = () => {

    app.use(express.json());
    app.use(express.static("public"));

};

const listen = () => {

    app.listen(port, () => {
        console.log("Server runs on http://localhost:" + port);
    });

};


export default {
    init,
    listen
}