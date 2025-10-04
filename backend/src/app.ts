import express from "express";
import path from "path";
import api from "./routes/api.routes";
const cors = require('cors');
//import cors from 'cors';

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas
app.use("/api", api);

// Front
const frontendPath = path.join(__dirname, "../../frontend/dist/frontend/browser");
app.use(express.static(frontendPath));

app.get("*", (_req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
});

export default app;
