# discordcaptcha
An easy-to-use verification bot for Discord

### Requirements
- Node.js v12+
- TypeScript 3.8

### Verification procedure
When joining, the user is supposed (if everything was set up correctly) to only be able to send messages in a verification channel. It is recommended to add a short message to the channel (topic, ...) so that new users know what to do next.
After typing !verify (! represents the prefix, can be changed in the config file), the bot will send an image containing a short verification code.
The user is then supposed to send !verify <captcha> in the verification channel and will be assigned a role. That role should have send and view messages permissions in all other channels.

### Setup
- Make sure you're running the requirements mentioned above
```sh
$ node -v && tsc -v
# Example output:
# v13.12.0
# Version 3.8.3
```
- Clone the repository
```sh
$ git clone https://github.com/y21/discordcaptcha
```
- Install all required dependencies and TypeScript
> If you don't have superuser permissions, run `npm i typescript` (without the `-g` flag) and specify the path to the binary when transpiling (`./node_modules/typescript/bin/tsc`)
```sh
$ npm i && npm i typescript -g
```
- Transpile the source code
```sh
$ tsc
```
- Edit the `configs/config.json` file
```sh
$ vim configs/config.json
```
- Run the bot
```sh
$ node .
Initialised 3 commands
# [warn] Local version does not match origin version.
# [info] Option `noEOI` is enabled, which blocks certain text recognition services. If you're seeing broken images, try disabling this option.
# Validation completed! 1 potential warnings, 1 warnings, 0 errors

# Bot started!
```

### FAQ
- Q: What does `noEOI` do?
    - A: `noEOI` (= No End of Image) will break the image by removing bytes from the buffer. This will break certain text recognition services such as Google's Vision API and will make it much harder for people to bypass this system. If you're experiencing problems, change this to `false`.
- Q: What does `boundTo` mean? / The bot is not responding to the verify command!
    - A: If you only want the bot to respond to the verify command in one channel, you may bind it to a specific channel by specifying the channel name. If you want it to function in any channel, use `null`. That being said, if you don't change this property, the bot will only respond to verification attempts in a channel named `verification`.
- Q: Why does the role name have to be in lowercase letters?
    - A: This warning can be ignored, as the validator will internally lowercase it for you. However, for consistency, I decided to warn users if they try to use uppercase letters in the role name.
