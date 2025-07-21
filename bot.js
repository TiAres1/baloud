const { Client, GatewayIntentBits } = require('discord.js');

// إنشاء البوت مع الـ intents المطلوبة
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
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

client.once('ready', () => {
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

client.login("MTM1ODc3NDA5MzM1NjQ2NjIxNw.GeFwyp.iDI0wMjin5-cqoHkoxjpuFTJknLgaK2tPaPU6M")
