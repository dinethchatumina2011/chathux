const { 
    default: makeWASocket, 
    useMultiFileAuthState, 
    DisconnectReason, 
    delay 
} = require('@whiskeysockets/baileys');
const pino = require('pino');
const readline = require('readline');

// Terminal එකෙන් phone number එක ඇතුළත් කරගන්න readline භාවිතා කරයි
const rl = readline.createInterface({ 
    input: process.stdin, 
    output: process.stdout 
});
const question = (text) => new Promise((resolve) => rl.question(text, resolve));

async function startBot() {
    // Session එක save වෙන්නේ local 'session' folder එකේ (No MongoDB required)
    const { state, saveCreds } = await useMultiFileAuthState(__dirname + '/session');

    const sock = makeWASocket({
        logger: pino({ level: 'silent' }),
        printQRInTerminal: false, // Pair code පාවිච්චි කරන නිසා QR code එක ඕන නෑ
        auth: state,
        browser: ["Ubuntu", "Chrome", "20.0.0"] // WhatsApp web browser එකක් ලෙස හඳුන්වා දීම
    });

    // දැනටමත් login වෙලා නැත්නම් විතරක් pair code එකක් ඉල්ලනවා
    if (!sock.authState.creds.registered) {
        console.clear();
        console.log("=== WhatsApp Bot Pair Code Generator ===");
        
        let phoneNumber = await question('ඔයාගේ WhatsApp අංකය ඇතුළත් කරන්න (Country code එක සමඟ. Ex: 9477xxxxxxx): ');
        phoneNumber = phoneNumber.replace(/[^0-9]/g, ''); // ඉලක්කම් විතරක් ඉතිරි කරයි

        if (!phoneNumber) {
            console.log('වලංගු දුරකථන අංකයක් ඇතුළත් කරන්න.');
            process.exit(0);
        }

        setTimeout(async () => {
            try {
                // WhatsApp වලින් pair code එකක් generate කරගැනීම
                let code = await sock.requestPairingCode(phoneNumber);
                code = code?.match(/.{1,4}/g)?.join('-') || code;
                
                console.log('\n----------------------------------------');
                console.log(`ඔබේ Pair Code එක: ${code}`);
                console.log('----------------------------------------');
                console.log('මෙම කේතය ඔබගේ WhatsApp App එකේ "Linked Devices -> Link with phone number" වෙත ගොස් ඇතුළත් කරන්න.\n');
            } catch (error) {
                console.error('Pair code එක ලබා ගැනීමට අපොහොසත් විය: ', error);
            }
        }, 3000); // තත්පර 3ක ප්‍රේරණ කාලයක්
    }

    // Connection එකේ තත්ත්වය පරික්ෂා කිරීම
    sock.ev.on('connection.update', async (update) => {
        const { connection, lastDisconnect } = update;
        
        if (connection === 'close') {
            const shouldReconnect = (lastDisconnect.error)?.output?.statusCode !== DisconnectReason.loggedOut;
            console.log('සම්බන්ධතාවය බිඳ වැටුණි. නැවත සම්බන්ධ වෙමින්...', shouldReconnect);
            if (shouldReconnect) {
                startBot(); // නැවත run කිරීම
            }
        } else if (connection === 'open') {
            console.log('\n[SUCCESS] බොට් සාර්ථකව WhatsApp සමඟ සම්බන්ධ විය!');
        }
    });

    // Session දත්ත වෙනස් වන විට save කිරීම
    sock.ev.on('creds.update', saveCreds);

    // සරල මැසේජ් එකක් ආවම වැඩ කරන හැටි (Message handler)
    sock.ev.on('messages.upsert', async chatUpdate => {
        try {
            const mek = chatUpdate.messages[0];
            if (!mek.message) return;
            if (mek.key.fromMe) return; // තමන්ගෙන්ම යන මැසේජ් වලට රිප්ලයි නොකිරීමට

            const messageType = Object.keys(mek.message)[0];
            const body = messageType === 'conversation' ? mek.message.conversation : 
                         messageType === 'extendedTextMessage' ? mek.message.extendedTextMessage.text : '';

            // උදාහරණ command එකක්: !ping
            if (body.toLowerCase() === '!ping') {
                await sock.sendMessage(mek.key.remoteJid, { text: 'Pong! 🏓 Bot is active.' });
            }
        } catch (err) {
            console.log(err);
        }
    });
}

// Bot එක start කිරීම
startBot();
