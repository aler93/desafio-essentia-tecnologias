"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const PORT = process.env.APP_PORT;
if (PORT === undefined) {
    console.error("O arquivo .env não foi carregado corretamente");
}
app_1.default.listen(PORT, () => {
    console.log(`Servidor iniciado na porta ${PORT}`);
});
