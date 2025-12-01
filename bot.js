const { Client, GatewayIntentBits } = require('discord.js');
const { joinVoiceChannel, createAudioPlayer, createAudioResource, AudioPlayerStatus, VoiceConnectionStatus } = require('@discordjs/voice');
const ytdl = require('@distube/ytdl-core');
const ytsearch = require('yt-search');
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

const VOICE_CHANNEL_ID = '1440791757108285461';
let connection = null;
let player = null;

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
    const voiceChannelId = VOICE_CHANNEL_ID;
    const channel = client.channels.cache.get(voiceChannelId);
    
    if (channel && channel.isVoiceBased()) {
        try {
            connection = joinVoiceChannel({
                channelId: channel.id,
                guildId: channel.guild.id,
                adapterCreator: channel.guild.voiceAdapterCreator,
            });
            
            player = createAudioPlayer();
            connection.subscribe(player);
            
            player.on(AudioPlayerStatus.Idle, () => {
                console.log('🎵 Music finished playing');
            });
            
            player.on('error', error => {
                console.error('❌ Audio player error:', error);
            });
            
            console.log(`🎤 Joined voice channel: ${channel.name}`);
        } catch (error) {
            console.error('❌ Error joining voice channel:', error);
        }
    } else {
        console.error('❌ Voice channel not found or bot doesn\'t have access');
    }
});

client.on('messageCreate', async (message) => {
    if (message.author.bot) return;

    const messageContent = message.content.toLowerCase().trim();

    // Check if message is from the voice channel's text chat
    const voiceChannel = client.channels.cache.get(VOICE_CHANNEL_ID);
    const isVoiceChannelChat = voiceChannel && message.channel.id === voiceChannel.id;

    // Handle music play command (ش)
    if (messageContent.startsWith('ش ') && isVoiceChannelChat) {
        const searchQuery = message.content.slice(2).trim();
        
        if (!searchQuery) {
            return message.reply('❌ الرجاء كتابة اسم الأغنية بعد الأمر');
        }

        try {
            message.reply('🔍 جاري البحث عن الأغنية...');
            
            const searchResults = await ytsearch(searchQuery);
            const video = searchResults.videos[0];
            
            if (!video) {
                return message.reply('❌ لم يتم العثور على الأغنية');
            }

            const stream = ytdl(video.url, {
                filter: 'audioonly',
                quality: 'highestaudio',
                highWaterMark: 1 << 25
            });

            const resource = createAudioResource(stream);
            player.play(resource);

            message.reply(`🎵 يتم الآن تشغيل: **${video.title}**`);
            console.log(`🎵 Playing: ${video.title}`);
            
        } catch (error) {
            console.error('❌ Error playing music:', error);
            message.reply('❌ حدث خطأ أثناء تشغيل الأغنية');
        }
        return;
    }

    // Handle music stop command (ق)
    if (messageContent === 'ق' && isVoiceChannelChat) {
        if (player) {
            player.stop();
            message.reply('⏹️ تم إيقاف الموسيقى');
            console.log('⏹️ Music stopped');
        } else {
            message.reply('❌ لا توجد موسيقى قيد التشغيل');
        }
        return;
    }

    // Handle greeting messages
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
