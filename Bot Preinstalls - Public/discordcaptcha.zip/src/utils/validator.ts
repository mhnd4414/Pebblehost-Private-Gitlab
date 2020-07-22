import { get } from "https";
const { version } = require("../../package");

function checkVersion(): Promise<boolean> {
    return new Promise(resolve => {
        get("https://raw.githubusercontent.com/y21/discordcaptcha/master/package.json", cl => {
            let chunks = "";
            cl.on("data", chunk => chunks += chunk);
            cl.on("end", () => {
                const { version: originVersion } = JSON.parse(chunks);

                resolve(originVersion === version);
            });
        })
    });
}

export default async function(config: any) {

    let infoCount = 0, warnCount = 0, errorCount = 0;
    const sameVersion = await checkVersion();
    if (!sameVersion) {
        console.warn("[warn] Local version does not match origin version.");
        warnCount++;
    }

    if (config.noEOI) {
        console.info("[info] Option `noEOI` is enabled, which blocks certain text recognition services. If you're seeing broken images, try disabling this option.");
        infoCount++;
    }

    if (typeof config.roleName !== "string") {
        console.error("[error] roleName must be of type string");
        errorCount++;
    }

    if (typeof config.noEOI !== "boolean") {
        console.error("[error] noEOI must be of type boolean (true/false)");
        errorCount++;
    }

    if (Object.values(config.messages).some(v => typeof v !== "string")) {
        console.error("[error] config.messages must only have values of type string");
        errorCount++;
    }

    if (Object.values(config.timeouts).some(v => typeof v !== "number" || isNaN(v))) {
        console.error("[error] config.timeouts must only have values of type number");
    }

    if (config.roleName.toLowerCase() !== config.roleName) {
        console.warn("[warn] roleName must not include uppercase letters");
        config.roleName = config.roleName.toLowerCase();
        warnCount++;
    }

    console.log(`Validation completed! ${infoCount} potential warnings, ${warnCount} warnings, ${errorCount} errors\n`);
    if (errorCount > 0) {
        process.exit(1);
    }

    return config;
}