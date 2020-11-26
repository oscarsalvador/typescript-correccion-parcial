import {Application} from "https://deno.land/x/oak@v6.3.2/mod.ts"
import "https://deno.land/x/dotenv/load.ts" //para cargar .env

import {MongoClient} from "https://deno.land/x/mongo@v0.13.0/mod.ts"

import router from "./routes.ts"


declare global {
    var statusval: number;
    var statusmsg: string;
    interface Window {
        statusval: number;
        statusmsg: string;
    }
}

try {
    window.statusval = 200;
    window.statusmsg = "OK";

    const DB_URL = Deno.env.get("DB_URL");
    const DB_NAME = Deno.env.get("DB_NAME");
    if (!DB_URL || !DB_NAME) throw Error("Fallo en carga del .env");

    //conexion a MongoDB
    const client = new MongoClient();
    client.connectWithUri(DB_URL);
    const db = client.database(DB_NAME);

    //lanzar el servidor
    const app: Application = new Application();

    app.use(async (ctx, next) => {
        //para poder usar la base de datos en otros archivos pasarla al contexto
        ctx.state.db = db;

        await next();
    });

    app.use(router.routes());
    app.use(router.allowedMethods());

    //esperar escuchando en el puerto
    const PORT: number = Number(Deno.env.get("PORT")) || 8000;
    console.log(`Listening on port ${PORT}`);
    await app.listen({ port: PORT });
} catch (e) {
    throw(e)
}