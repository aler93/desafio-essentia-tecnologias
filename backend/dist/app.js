"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const api_routes_1 = __importDefault(require("./routes/api.routes"));
const cors = require('cors');
//import cors from 'cors';
const app = (0, express_1.default)();
// Middlewares
app.use(cors());
app.use(express_1.default.json());
// Rotas
app.use("/api", api_routes_1.default);
// Front
const frontendPath = path_1.default.join(__dirname, "../../frontend/dist/frontend/browser");
app.use(express_1.default.static(frontendPath));
app.get("*", (_req, res) => {
    res.sendFile(path_1.default.join(frontendPath, "index.html"));
});
exports.default = app;
