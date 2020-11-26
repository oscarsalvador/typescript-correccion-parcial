import {Database} from "https://deno.land/x/mongo@v0.13.0/ts/database.ts"

import {IClientSchema, IClient} from "../types.ts"
import type {IContext} from "../types.ts"


const postClient = async (ctx: IContext) => {
    try {
        if (ctx.request.headers.get("content-type") !== "application/json") {
            ctx.response.status = 400
            //content-type incorrecto
            ctx.response.body = "Bad request"
            return
        }

        //con esto se acogen los datos
        const data = await ctx.request.body().value
        
        //inspeccion de datos de entrada
        const requiredData = ["name", "cif", "address", "mail", "phone"]
        Object.keys(data).forEach(key => {
            if(!requiredData.includes(key)) throw new Error(`Tiene una llave (${key}) no aceptada`); 
        })
        if(!(data.name && data.cif && data.address)) throw new Error("Falta una llave obligatoria")

        //establecer una conexion a la coleccion de mongo
        const db:Database = ctx.state.db
        const clientsCollection = db.collection<IClientSchema>("ClientsCollection")

        //introduccion de cliente a la copia si no exite
        //found e insertOne son asincrono para no congelar el programa hasta tener respuesta
        if (await clientsCollection.count() !== 0) {
            const found = await clientsCollection.find({ cif: data.cif })
            if (found) throw new Error(`El cliente ${data.cif} ya existe`)
        }
        //subir los datos a mongo
        await clientsCollection.insertOne(data)
        
        ctx.response.status = 200
        ctx.response.body = "OK"
    }catch (e) {
        ctx.response.status = 500
        ctx.response.body = "Unexpected Server Error"

        console.log(e)
    }
}

export {postClient}