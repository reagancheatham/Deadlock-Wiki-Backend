import express from "express";
import router from "./routes/router.js";
import databaseConfig from "./database/databaseConfig.js";

const app = express();
const port = databaseConfig.PORT || 3000;

app.use("/deadlock-wiki", router);
