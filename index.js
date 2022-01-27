import express from "express";
import config from "config";
import bodyParser from "body-parser"

import index from "./routes/v1/index.js";
import characters from "./routes/v1/characters.js";

const app = express();

app.use(express.json());

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))

app.use("/v1/characters", characters.parentNode);
app.use("*", index);


const port = config.get('service.port') || 3030;
const serviceName = config.get('service.name');

app.set('view engine', 'ejs');

app.listen({ port }, async () => {
    console.log(`${serviceName} service running on port - ${port}`);
    if (process.env.NODE_ENV === 'production' || 'develop') {
        console.log(`${process.env.NODE_ENV} Configuration in Use`)
    } else {
        console.log(`${process.env.NODE_ENV} Configuration in Use`)
    }
});

export default app;