import express from "express";
import cors from "cors";
import router from "./routes/router.js";
import databaseConfig from "./database/databaseConfig.js";
import sequelizeInstance from "./database/sequelizeInstance.js";

sequelizeInstance.sync({ alter: true });

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
