"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    name: "debug",
    metadata: {
        description: "Displays bot statistics"
    },
    ownerOnly: true,
    run: async (client, ctx) => {
        const memory = Object.entries(process.memoryUsage()).map(([k, v]) => `${k}: ${(v / 1024 / 1024).toFixed(2)} MB`);
        ctx.editOrReply(`**Memory:**\n ${memory.join("\n")}\n\n**Bot statistics:**\nVerification queue: ${client.queue.size}\nChannel cache size: ${client.client.channels.size}`);
    }
};
