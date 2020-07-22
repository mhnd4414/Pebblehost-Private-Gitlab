"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = __importDefault(require("./structures/client"));
const config = require("../configs/config");
(async () => {
    const client = new client_1.default(config.token, config, {
        cache: false,
        prefix: config.prefix,
        gateway: {
            autoReconnect: true,
            compress: true
        }
    });
    await client.initCommands();
    console.log(`Initialised ${client.commands.length} commands`);
    await client.run();
    console.log("Bot started!");
})();
