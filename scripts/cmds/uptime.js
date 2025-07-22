 module.exports = {
  config: {
    name: "uptime",
    aliases: ["up", "upt"],
    version: "1.0",
    author: "VEX_ADNAN",
    role: 0,
    shortDescription: {
      en: "Displays the uptime of the bot."
    },
    longDescription: {
      en: "Displays the amount of time that the bot has been running for."
    },
    category: "System",
    guide: {
      en: "Use {p}uptime to display the uptime of the bot."
    }
  },
  onStart: async function ({ api, event, args }) {
    const uptime = process.uptime();
    const seconds = Math.floor(uptime % 60);
    const minutes = Math.floor((uptime / 60) % 60);
    const hours = Math.floor((uptime / (60 * 60)) % 24);
    const days = Math.floor(uptime / (60 * 60 * 24));
    const uptimeString = `\n\n𖤍 ${hours} 𝐡𝐞𝐮𝐫𝐞𝐬\n\n𖤍 ${minutes} 𝐦𝐢𝐧𝐮𝐭𝐞𝐬\n\n𖤍 ${seconds} 𝐬𝐞𝐜𝐨𝐧𝐝𝐞𝐬\n\n☓────────────────☓`;
    api.sendMessage(`☓────────────────☓\n\n💥 𝐁𝐨𝐧𝐣𝐨𝐮𝐫 𝐦𝐚𝐢̂𝐭𝐫𝐞 , 𝐣𝐞 𝐟𝐨𝐧𝐜𝐭𝐢𝐨𝐧𝐧𝐞 𝐭𝐨𝐮𝐣𝐨𝐮𝐫𝐬 𝐝𝐞𝐩𝐮𝐢𝐬 ↓\n↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ ${uptimeString}`, event.threadID);
  }
};
