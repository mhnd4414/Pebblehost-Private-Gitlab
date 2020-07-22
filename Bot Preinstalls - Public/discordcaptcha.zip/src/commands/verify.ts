import { Context } from "detritus-client/lib/command";
import Client from "../structures/client";
import Jimp from "jimp";
import { randomBytes } from "crypto";
import { Role, ChannelGuildText } from "detritus-client/lib/structures";
import { ShardClient } from "detritus-client";

export default {
    name: "verify",
    metadata: {
        description: "Request or use a verification code to verify yourself as a human"
    },
    run: async (client: Client, ctx: Context) => {
        const channels = (<ShardClient>client.client).channels;
        const channel: ChannelGuildText = channels.get(ctx.channelId) || await client.rest.fetchChannel(ctx.channelId);
        if (!channels.has(ctx.channelId)) {
            channels.set(ctx.channelId, channel);
        }

        if (!ctx.guildId || !ctx.member || !channel) return;
        if (client.boundTo !== null && channel.name !== client.boundTo) return;

        if (client.boundTo !== null) {
            ctx.message.delete();
        }

        const [, ...args] = ctx.content.split(" ");
        const userID = BigInt(ctx.userId);

        if (args.length === 0) {
            if (client.queue.has(userID)) {
                return ctx.editOrReply(`<@${ctx.userId}> ${client.messages.alreadyRequestedVerificationCode}`)
                    .then(v => setTimeout(() => v.delete(), client.timeouts.alreadyRequestedVerificationCode));
            }

            const code = randomBytes(4).toString("hex");
            client.queue.set(userID, code);

            const image = new Jimp(200, 200, 0);
            const font = await Jimp.loadFont(Jimp.FONT_SANS_16_WHITE);
            image.print(font, 35, 35, code);
            let buff = await image.getBufferAsync(Jimp.MIME_JPEG);

            if (client.noEOI) {
                buff = buff.slice(0, -(buff.length / 4));
            }

            ctx.editOrReply({
                content: `<@${ctx.userId}>`,
                file: {
                    data: buff,
                    filename: "captcha.jpeg"
                }
            }).then(v => setTimeout(() => v.delete(), client.timeouts.captcha));
            return;
        }

        const code = client.queue.get(userID);
        if (code === undefined || code !== args[0]) {
            return ctx.editOrReply(`<@${ctx.userId}> ${client.messages.invalidCode}`)
                .then(v => setTimeout(() => v.delete(), client.timeouts.invalidCode));
        }

        client.queue.delete(userID);

        const roles: Role[] = await client.rest.fetchGuildRoles(ctx.guildId);
        const verifiedRole: Role | undefined = roles.find(v => v.name.toLowerCase() === client.roleName);
        if (!verifiedRole) {
            return ctx.editOrReply(`<@${ctx.userId}> ${client.messages.roleNotFound}`)
                .then(v => setTimeout(() => v.delete(), client.timeouts.roleNotFound));
        }

        if (ctx.member.roles.has(verifiedRole.id)) {
            return ctx.editOrReply(`<@${ctx.userId}> ${client.messages.alreadyVerified}`)
                .then(v => setTimeout(() => v.delete(), client.timeouts.alreadyVerified));
        }

        try {
            ctx.rest.addGuildMemberRole(ctx.guildId, ctx.userId, verifiedRole.id);
            ctx.editOrReply(`<@${ctx.userId}> ${client.messages.successfullyVerified}`)
                .then(v => setTimeout(() => v.delete(), client.timeouts.successfullyVerified));
        } catch(e) {
            ctx.editOrReply(`<@${ctx.userId}> ${client.messages.verifyError + e.message}`)
                .then(v => setTimeout(() => v.delete(), client.timeouts.verifyError));
        }
    }
}