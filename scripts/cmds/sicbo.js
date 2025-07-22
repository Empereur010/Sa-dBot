module.exports = {
  config: {
    name: "sicbo",
    aliases: ["sic"],
    version: "1.0",
    author: "Loid Butter",
    countDown: 10,
    role: 0,
    shortDescription: "Play Sicbo, the oldest gambling game",
    longDescription: "Play Sicbo, the oldest gambling game, and earn money",
    category: "game",
    guide: "{pn} <Small/Big> <amount of money>"
  },

  onStart: async function ({ args, message, usersData, event }) {
    const betType = args[0];
    const betAmount = parseInt(args[1]);
    const user = event.senderID;
    const userData = await usersData.get(event.senderID);

    if (!["small", "big"].includes(betType)) {
      return message.reply("🤨 | 'small' ou 'big'.");
    }

    if (!Number.isInteger(betAmount) || betAmount < 50) {
      return message.reply("❌ |𝐌𝐀𝐈𝐒 𝐏𝐀𝐑𝐈𝐄 𝐀𝐕𝐄𝐂 𝐔𝐍 𝐌𝐎𝐍𝐓𝐀𝐍𝐓 𝐃𝐄 50 𝐎𝐔 𝐏𝐋𝐔𝐒 🫩.");
    }

    if (betAmount > userData.money) {
      return message.reply("❌ |𝐓𝐔 𝐍'𝐀𝐒 𝐏𝐀𝐒 𝐀𝐒𝐒𝐄𝐑 𝐃'𝐀𝐑𝐆𝐄𝐍𝐓 𝐏𝐎𝐔𝐑 𝐏𝐀𝐑𝐈𝐄́ 😪.");
    }

    const dice = [1, 2, 3, 4, 5, 6];
    const results = [];

    for (let i = 0; i < 3; i++) {
      const result = dice[Math.floor(Math.random() * dice.length)];
      results.push(result);
    }

    const winConditions = {
      small: results.filter((num, index, arr) => num >= 1 && num <= 3 && arr.indexOf(num) !== index).length > 0,
      big: results.filter((num, index, arr) => num >= 4 && num <= 6 && arr.indexOf(num) !== index).length > 0,
    };

    const resultString = results.join(" | ");

    if ((winConditions[betType] && Math.random() <= 0.4) || (!winConditions[betType] && Math.random() > 0.4)) {
      const winAmount = 2 * betAmount;
      userData.money += winAmount;
      await usersData.set(event.senderID, userData);
      return message.reply(`(\\_/)\n( •_•)\n// >[ ${resultString} ]\n\n🎉 |𝐅𝐄𝐋𝐈𝐂𝐈𝐓𝐀𝐓𝐈𝐎𝐍𝐒! 𝐓'𝐀𝐒 𝐆𝐀𝐆𝐍𝐄́  ${winAmount}!`);
    } else {
      userData.money -= betAmount;
      await usersData.set(event.senderID, userData);
      return message.reply(`(\\_/)\n( •_•)\n// >[ ${resultString} ]\n\n🤣 |𝐓'𝐀𝐒 𝐏𝐄𝐑𝐃𝐔  ${betAmount}.`);
    }
  }
};
