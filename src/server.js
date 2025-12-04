import express from "express";
import cors from "cors";
import router from "./routes/router.js";
import databaseConfig from "./database/databaseConfig.js";
import Database from "./models/database.model.js";

Database.SequelizeInstance.sync({ alter: true });

var corsOptions = {
    origin: "http://localhost:5173",
    credentials: true,
};

const app = express();
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = databaseConfig.PORT || 3000;

app.listen(port, () => {
    console.log(`Server listening on port ${port}.`);
});

app.use("/", router);
