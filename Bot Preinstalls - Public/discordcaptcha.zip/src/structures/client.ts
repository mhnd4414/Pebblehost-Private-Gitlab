import { CommandClient, CommandClientOptions, Command, CommandClientAdd } from "detritus-client";
import { readdirSync } from "fs";
import { Context } from "detritus-client/lib/command/context";
import validate from "../utils/validator";

export type Command = CommandClientAdd & {
    run: (client: Client, ctx: Context) => any
};

export default class Client extends CommandClient {
    public queue: Map<BigInt, string>;
    public noEOI: boolean;
    public messages: any;
    public roleName: string;
    public boundTo: string;
    public timeouts: any;

    constructor(token: string, config: any, options: CommandClientOptions) {
        super(token, options);
        this.queue = new Map();
        this.noEOI = config.noEOI;
        this.messages = config.messages;
        this.roleName = config.roleName;
        this.boundTo = config.boundTo;
        this.timeouts = config.timeouts;

        validate(config).catch(console.error);
    }

    public async initCommands(): Promise<Command.Command[]> {
        for (const cmd of readdirSync("./src/commands/").filter(c => c.endsWith(".js"))) {
            const command: Command = await import(`../commands/${cmd}`).then(v => v.default);
            this.add({
                ...command,
                run: command.run.bind(null, this),
                responseOptional: true
            });
        }

        return this.commands;
    }
}