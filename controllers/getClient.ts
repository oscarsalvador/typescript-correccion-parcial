import {Database} from "https://deno.land/x/mongo@v0.13.0/mod.ts"

import {IClientSchema} from "../types.ts"
import type {IContext} from "../types.ts"
import { RouterContext } from "https://deno.land/x/oak@v6.3.2/router.ts";


const searchClient = async (ctx: IContext, clientId: string) => {
    try {
        const db: Database = ctx.state.db;
        const clientsCollection = db.collection<IClientSchema>(
        "ClientsCollection"
        );

        //busca en toda la coleccion la fila que contenga el json donde la clave "cif" contenga el contenido "clientId"
        //clientId tiene ! para forzar que "cif", que en IClientSchema esta definido como string, acepte un "null"
        const found = (await clientsCollection.find({ cif: clientId! })) || undefined
        if (!found) throw new Error(`El cliente ${clientId} no existe`)

        return found
    } catch (e) {
        return undefined
    }
}

//version no REST, por parametros de consulta
const getClient1 = async (ctx: IContext) => {
    // /client?clientId=b512
    const clientId = ctx.request.url.searchParams.get("clientId")

    const found = await searchClient(ctx, clientId!)

    if (found !== (undefined || null)) {
        ctx.response.status = 200
        ctx.response.body = found
    } else {
        ctx.response.status = 404
        ctx.response.body = "Cliente no encontrado"
    }
}

//version rest, con barras
const getClient = async (ctx: RouterContext<Record<string | number, string | undefined>>) => {
    // /client/b512
    const clientId = ctx.params.id
    
    const found = await searchClient(ctx, clientId!)

    if (found !== (undefined || null)) {
        ctx.response.status = 200
        ctx.response.body = found
    } else {
        ctx.response.status = 404
        ctx.response.body = "Cliente no encontrado"
    }
}

export {getClient1, getClient}
