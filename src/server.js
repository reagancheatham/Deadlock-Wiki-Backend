import express from "express";
import cors from "cors";
var corsOptions = {
    origin: "http://localhost:5173",
    credentials: true,
};

import router from "./routes/router.js";
import databaseConfig from "./database/databaseConfig.js";
import Database from "./models/database.model.js";

Database.SequelizeInstance.sync({ alter: true }).then(() => {
    Database.SequelizeInstance.query("CALL GetHealthyCharacters();").then(
        (result) => {
            console.log("Healthy Characters: " + JSON.stringify(result));
        }
    ); 

    Database.SequelizeInstance.query("SELECT * FROM character_data").then(
        (result) => {
            console.log("Character Data: " + JSON.stringify(result));
        }
    )
});

const app = express();
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = databaseConfig.PORT || 3000;

app.listen(port, () => {
    console.log(`Server listening on port ${port}.`);
});

app.use("/", router);
