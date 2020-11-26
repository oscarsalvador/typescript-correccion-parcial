import type { IContext } from "./types.ts";

const statusResponse = (ctx: IContext) => {
    ctx.response.status = window.statusval;
    ctx.response.body = window.statusmsg;
};

export {statusResponse}