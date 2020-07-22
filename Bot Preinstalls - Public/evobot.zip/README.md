![logo](https://repository-images.githubusercontent.com/186841818/8aa95700-7730-11e9-84be-e80f28520325)

# EvoBot (Discord Music Bot)
> EvoBot is a Discord Music Bot built with discord.js & uses Command Handler from [discordjs.guide](https://discordjs.guide)

## Requirements

1. Discord Bot Token **[Guide](https://discordjs.guide/preparations/setting-up-a-bot-application.html#creating-your-bot)**
2. YouTube Data API v3 Key **[Guide](https://developers.google.com/youtube/v3/getting-started)**
3. Node.js v12.0.0 or newer

## Installation

```
git clone https://github.com/eritislami/evobot.git
cd evobot
npm install
```

After installation finishes you can use `node index.js` to start the bot.

If you are planning to use ***Glitch.com*** please read [#27](https://github.com/eritislami/evobot/issues/27)

## Configuration

Copy or Rename `config.json.example` to `config.json` and fill out the values:

```json
{
	"TOKEN": "",
	"YOUTUBE_API_KEY": "",
	"MAX_PLAYLIST_SIZE": 10,
	"PREFIX": "/"
}
```

## Features & Commands

> Note: The default prefix is '/'

* 🎶 Play music from YouTube via url
  * `/play https://www.youtube.com/watch?v=GLvohMXgcBo`
* 🔎 Play music from YouTube via search query
  * `/play under the bridge red hot chili peppers`
* 📃 Play youtube playlists via url
  * `/playlist https://www.youtube.com/watch?v=YlUKcNNmywk&list=PL5RNCwK3GIO13SR_o57bGJCEmqFAwq82c`
* 🔎 Play youtube playlists via search query
  * `/playlist linkin park meteora`
* Command Handler from [discordjs.guide](https://discordjs.guide/)
* Queue system (/queue)
* Loop / Repeat (/loop)
* Volume control (/volume)
* Pause (/pause)
* Resume (/resume)
* Skip (/skip)
* Media Controls via Reactions
![reactions](https://i.imgur.com/j7CevsH.png)

## Contributing

1. [Fork the repository](https://github.com/eritislami/evobot/fork)
2. Clone your fork: `git clone https://github.com/your-username/evobot.git`
3. Create your feature branch: `git checkout -b my-new-feature`
4. Commit your changes: `git commit -am 'Add some feature'`
5. Push to the branch: `git push origin my-new-feature`
6. Submit a pull request

## Credits

[@iCrawl](https://github.com/iCrawl) For the queue system used in this application which was adapted from [@iCrawl/discord-music-bot](https://github.com/iCrawl/discord-music-bot)
