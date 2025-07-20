• const axios = require("axios");

module.exports = {
  config: {
    name: "hentai",
    version: "2.0",
    author: "Saïd Z",
    countDown: 5,
    role: 0,
    shortDescription: "Image hentai aléatoire (🔞)",
    longDescription: "Envoie une image NSFW de type hentai",
    category: "🔞 NSFW",
    guide: {
      en: "{pn}"
    }
  },

  onStart: async function ({ api, event }) {
    const threadID = event.threadID;
    const messageID = event.messageID;

    try {
      const res = await axios.get("https://api.waifu.pics/nsfw/waifu");
      const imageUrl = res.data.url;

      const msg = {
        body: "😏 Voici une image hentai",
        attachment: await global.utils.getStreamFromURL(imageUrl)
      };

      return api.sendMessage(msg, threadID, messageID);
    } catch (err) {
      console.error(err);
      return api.sendMessage("❌ Une erreur est survenue, essaie plus tard.", threadID, messageID);
    }
  }
};
