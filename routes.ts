import {Router} from "https://deno.land/x/oak@v6.3.2/mod.ts"
import {helpers} from "https://deno.land/x/oak/mod.ts" //para leer el id del endpoint
//import { v4 } from "https://deno.land/std/uuid/mod.ts";

import {postClient} from "./controllers/postClient.ts"
import {getStatus} from "./controllers/getStatus.ts"
import {getClient1, getClient} from "./controllers/getClient.ts"


const router = new Router()

router.get("/status", getStatus)
router.get("/client", getClient1)
router.get("/client/:id", getClient)
router.post("/client", postClient)

export {router as default}