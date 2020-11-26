import { Router } from "https://deno.land/x/oak@v6.3.2/mod.ts"

const router = new Router()

router.get("/status", (ctx) => {
    ctx.response.body = "OK"
    ctx.response.status = 200
})

export {router as default}