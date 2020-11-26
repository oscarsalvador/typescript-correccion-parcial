import {MongoClient} from "https://deno.land/x/mongo@v0.13.0/mod.ts"

import type {IContext} from "../types.ts"
import {statusResponse} from "../utilities.ts"


const getStatus = async (ctx: IContext) => {
  try {
    const DB_URL: string = Deno.env.get("DB_URL")!
    const client = new MongoClient()
    client.connectWithUri(DB_URL)

    window.statusval = 200
    window.statusmsg = "OK"
  } catch (e) {
    window.statusval = 500
    window.statusmsg = "Server Error"
  }

  statusResponse(ctx);
}

export {getStatus}