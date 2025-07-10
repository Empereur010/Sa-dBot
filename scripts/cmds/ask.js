const axios = require('axios');

async function getAIResponse(input, userId, messageID) {
  try {
    const res = await axios.get('https://api.popcat.xyz/chatbot', {
      params: {
        msg: input,
        owner: "Nox",
        botname: "NOX"
      }
    });

    return {
      response: res.data.response || "❌ Aucune réponse reçue.",
      messageID
    };
  } catch (err) {
    console.error("Erreur API Popcat:", err.message);
    return {
      response: "❌ Une erreur est survenue. Réessaie plus tard.",
      messageID
    };
  }
}

module.exports = {
  config: {
    name: 'nox',
    author: 'Arn',
    role: 0,
    category: 'ai',
    shortDescription: 'Pose une question à NOX',
  },

  onStart: async function ({ api, event, args }) {
    const input = args.join(' ').trim();
    if (!input) {
      api.sendMessage("❓ Pose une question à NOX.", event.threadID, event.messageID);
      return;
    }

    const { response, messageID } = await getAIResponse(input, event.senderID, event.messageID);
    api.sendMessage(`༆𝐍𝐎𝐗༆\n━━━━━━━━━━━━━\n${response}`, event.threadID, messageID);
  },

  onChat: async function ({ event, message }) {
    const messageContent = event.body.trim();
    if (messageContent.toLowerCase().startsWith("nox")) {
      const input = messageContent.slice(3).trim();
      if (!input) return;

      const { response } = await getAIResponse(input, event.senderID, event.messageID);
      message.reply(`༆𝐍𝐎𝐗༆\n━━━━━━━━━━━━━\n${response}`, event.messageID);
    }
  }
};
