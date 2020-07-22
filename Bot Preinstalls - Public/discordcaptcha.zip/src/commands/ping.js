"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    name: "ping",
    metadata: {
        description: "Displays the latency"
    },
    run: async (client, ctx) => {
        const { gateway, rest } = await ctx.client.ping();
        ctx.editOrReply(`Gateway: ${gateway}ms, Rest: ${rest}ms`);
    }
};
