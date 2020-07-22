import Client from "./structures/client";
const config = require("../configs/config");

(async () => {
    const client = new Client(config.token, config, {
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