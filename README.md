# بوت دسكورد للرد التلقائي على السلام

## الوصف
بوت دسكورد بسيط يرد تلقائياً على رسائل السلام والترحيب باستخدام discord.js

## المميزات
- رد تلقائي على السلام والترحيب
- ردود متنوعة وعشوائية
- يدعم العربية والإنجليزية
- سهل التخصيص والتطوير

## كيفية التثبيت والتشغيل

### 1. تثبيت Node.js
تأكد من تثبيت Node.js على جهازك من [nodejs.org](https://nodejs.org/)

### 2. تثبيت المتطلبات
```powershell
npm install
```

### 3. إنشاء البوت في دسكورد
1. اذهب إلى [Discord Developer Portal](https://discord.com/developers/applications)
2. اضغط "New Application" وأدخل اسم البوت
3. اذهب إلى تبويب "Bot"
4. اضغط "Add Bot"
5. انسخ الـ Token

### 4. إعداد البوت
1. افتح ملف `.env`
2. ضع token البوت مكان `your_bot_token_here`:
   ```
   DISCORD_TOKEN=your_actual_bot_token_here
   ```

### 5. دعوة البوت إلى السيرفر
1. اذهب إلى تبويب "OAuth2" > "URL Generator"
2. اختر:
   - Scopes: `bot`
   - Bot Permissions: `Send Messages`, `Read Message History`, `Use Slash Commands`
3. انسخ الرابط المُنتج وافتح في متصفح لدعوة البوت

### 6. تشغيل البوت
```powershell
npm start
```

أو للتطوير:
```powershell
npm run dev
```

## التخصيص

### إضافة كلمات سلام جديدة
عدّل مصفوفة `salamMessages` في `bot.js`:
```javascript
const salamMessages = [
    'السلام عليكم',
    'سلام عليكم',
    // أضف كلمات جديدة هنا
];
```

### إضافة ردود جديدة
عدّل مصفوفة `salamReplies` في `bot.js`:
```javascript
const salamReplies = [
    'وعليكم السلام ورحمة الله وبركاته 🌸',
    // أضف ردود جديدة هنا
];
```

## الملفات
- `bot.js` - الكود الرئيسي للبوت
- `package.json` - إعدادات المشروع والمتطلبات
- `.env` - متغيرات البيئة (Token)
- `README.md` - هذا الملف

## المساعدة
إذا واجهت مشاكل، تأكد من:
- صحة الـ Token
- تفعيل الـ Intents المطلوبة في Developer Portal
- منح البوت الصلاحيات المناسبة في السيرفر
