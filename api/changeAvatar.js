// pages/

import { Client, Intents } from 'discord.js';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    // JSON verisini alıyoruz
    const { discordBotToken, discordGuildId, avatarUrl } = req.body;

    // Verilerin doğruluğunu kontrol et
    if (!discordBotToken || !discordGuildId || !avatarUrl) {
      return res.status(400).json({ error: 'discordBotToken, discordGuildId ve avatarUrl gereklidir.' });
    }

    try {
      // Discord botunu başlat
      const client = new Client({
        intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS],
      });

      // Botu login et
      await client.login(discordBotToken);

      // Sunucuyu al ve avatarı değiştir
      const guild = await client.guilds.fetch(discordGuildId);
      await guild.setIcon(avatarUrl);

      // Başarılı yanıt
      return res.status(200).json({ message: 'Avatar başarıyla güncellendi.' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Avatar güncellenirken bir hata oluştu.' });
    }
  } else {
    return res.status(405).json({ error: 'Yalnızca POST yöntemi destekleniyor.' });
  }
}}
