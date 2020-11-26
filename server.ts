import { Application } from "https://deno.land/x/oak@v6.3.2/mod.ts"
import "https://deno.land/x/dotenv/load.ts" //para cargar .env

//archivos propios
import router from "./routes.ts"



//lanzar el servidor
const app: Application = new Application()

//pasar base de datos al contexto
app.use(async (ctx, next) => {
    await next()
})

app.use(router.routes())
app.use(router.allowedMethods())

//esperar escuchando en el puerto
const PORT: number = Number(Deno.env.get("PORT")) || 8000
console.log(`Listening on port ${PORT}`)
await app.listen({port:PORT})