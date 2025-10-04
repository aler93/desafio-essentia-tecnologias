import app from "./app";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.APP_PORT;

if( PORT === undefined ) {
    console.error("O arquivo .env não foi carregado corretamente")
}

app.listen(PORT, () => {
    console.log(`Servidor iniciado na porta ${PORT}`);
});
