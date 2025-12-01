const { Client, GatewayIntentBits } = require('discord.js');
const { joinVoiceChannel } = require('@discordjs/voice');
require('dotenv').config();


// إنشاء البوت مع الـ intents المطلوبة
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildVoiceStates,
    ],
});

// رسائل السلام المختلفة
const salamMessages = [
    'السلام عليكم',
    'سلام عليكم',
    'سلام',
    'السلام',
    'هلا',
    'أهلا',
    'مرحبا',
    'hello',
    'hi',
    'hey'
];

const salamReplies = [
    'وعليكم السلام ورحمة الله وبركاته 🌸',
    'وعليكم السلام! أهلاً وسهلاً 👋',
    'السلام عليكم! حياك الله 🤗',
    'أهلاً وسهلاً! نورت السيرفر 🌟'
];

client.once('clientReady', () => {
    console.log('='.repeat(50));
    console.log('🚀 Discord Bot - Successfully Started!');
    console.log('='.repeat(50));
    console.log(`👤 Bot Name: ${client.user.username}`);
    console.log(`🆔 Bot ID: ${client.user.id}`);
    console.log(`🏷️  Bot Tag: ${client.user.tag}`);
    console.log(`📊 Server Count: ${client.guilds.cache.size}`);
    console.log(`👥 User Count: ${client.users.cache.size}`);
    console.log(`🕐 Start Time: ${new Date().toLocaleString()}`);
    console.log('='.repeat(50));
    console.log('✅ Bot is ready for use!');
    console.log('='.repeat(50));
    
    client.user.setActivity('Baloud on ToP', { type: 'WATCHING' });

    // Join the voice channel
    const voiceChannelId = '1440791757108285461';
    const channel = client.channels.cache.get(voiceChannelId);
    
    if (channel && channel.isVoiceBased()) {
        try {
            const connection = joinVoiceChannel({
                channelId: channel.id,
                guildId: channel.guild.id,
                adapterCreator: channel.guild.voiceAdapterCreator,
            });
            console.log(`🎤 Joined voice channel: ${channel.name}`);
        } catch (error) {
            console.error('❌ Error joining voice channel:', error);
        }
    } else {
        console.error('❌ Voice channel not found or bot doesn\'t have access');
    }
});

client.on('messageCreate', (message) => {
    if (message.author.bot) return;

    const messageContent = message.content.toLowerCase().trim();

    const containsSalam = salamMessages.some(salam => 
        messageContent.includes(salam.toLowerCase())
    );

    if (containsSalam) {
        const randomReply = salamReplies[Math.floor(Math.random() * salamReplies.length)];
        
        message.reply(randomReply);
    }
});

client.on('error', (error) => {
    console.error('❌ خطأ في البوت:', error);
});

client.login(process.env.TOKEN);
