const { 
    default: makeWASocket, 
    useMultiFileAuthState, 
    DisconnectReason 
} = require('@whiskeysockets/baileys');
const pino = require('pino');
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Main function to run the connection and api
async function initBotServer() {
    // Local session folder එක සාදා ගැනීම
    const { state, saveCreds } = await useMultiFileAuthState(path.join(__dirname, 'auth_session'));

    // Web Dashboard එකෙන් Pair Code එක ඉල්ලන API Endpoint එක
    app.get('/code', async (req, res) => {
        let phoneNumber = req.query.number;

        if (!phoneNumber) {
            return res.status(400).json({ error: "Invalid Number" });
        }

        // ERROR FIX 1: + ලකුණ, හිස්තැන් සහ අනෙකුත් සංකේත සියල්ල clean කිරීම
        phoneNumber = phoneNumber.replace(/[^0-9]/g, '');

        try {
            // ERROR FIX 2: සෑම විටම අලුත්ම socket instance එකක් සාදා ගැනීම (State ගැටළු මඟහරවා ගැනීමට)
            const sock = makeWASocket({
                auth: state,
                printQRInTerminal: false,
                logger: pino({ level: "silent" }),
                browser: ["Ubuntu", "Chrome", "20.0.0"]
            });

            // ERROR FIX 3: Baileys එක WhatsApp server එකට සම්බන්ධ වීමට ප්‍රමාණවත් කාලයක් ලබා දීම (Miliseconds 3500)
            await new Promise(resolve => setTimeout(resolve, 3500));

            if (!sock.authState.creds.registered) {
                // WhatsApp එකෙන් pair code එකක් request කිරීම
                let code = await sock.requestPairingCode(phoneNumber);
                code = code?.match(/.{1,4}/g)?.join('-') || code;
                
                // සාර්ථකව code එක frontend එකට ලබා දීම
                return res.json({ code: code });
            } else {
                return res.json({ error: "Already Connected" });
            }

        } catch (err) {
            console.error("Pairing API Error: ", err);
            // WhatsApp එකෙන් Rate Limit (වැඩි වාර ගණනක් උත්සාහ කිරීම) උනොත් වෙන වැරැද්දක් පෙන්වීම
            return res.status(500).json({ error: "Server Error or Rate Limit. Try again later." });
        }
    });

    // Bot Connection Management (බොට් වැඩ කරන කොටස)
    const startBot = () => {
        const mainSock = makeWASocket({
            auth: state,
            printQRInTerminal: false,
            logger: pino({ level: "silent" }),
            browser: ["Ubuntu", "Chrome", "20.0.0"]
        });

        mainSock.ev.on('creds.update', saveCreds);

        mainSock.ev.on('connection.update', async (update) => {
            const { connection, lastDisconnect } = update;
            if (connection === 'close') {
                const shouldReconnect = (lastDisconnect.error)?.output?.statusCode !== DisconnectReason.loggedOut;
                console.log('සම්බන්ධතාවය බිඳ වැටුණි. නැවත සම්බන්ධ වෙමින්...', shouldReconnect);
                if (shouldReconnect) {
                    startBot();
                }
            } else if (connection === 'open') {
                console.log('=== බොට් සාර්ථකව WhatsApp සමඟ සම්බන්ධ විය! ===');
            }
        });

        // සරල command handler එකක් (Ping/Pong)
        mainSock.ev.on('messages.upsert', async chatUpdate => {
            try {
                const msg = chatUpdate.messages[0];
                if (!msg.message || msg.key.fromMe) return;

                const text = msg.message.conversation || msg.message.extendedTextMessage?.text || '';
                if (text.toLowerCase() === 'test') {
                    await mainSock.sendMessage(msg.key.remoteJid, { text: 'Bot is online! 🚀' });
                }
            } catch (e) {
                console.log("Message Error: ", e);
            }
        });
    };

    // Bot එක පසුබිමෙන් ක්‍රියාත්මක කිරීම ආරම්භ කරයි
    startBot();
}

// Server එක run කිරීම
app.listen(PORT, () => {
    console.log(`\n========================================`);
    console.log(`Server is running on: http://localhost:${PORT}`);
    console.log(`Pair Code API: http://localhost:${PORT}/code?number=ඔයාගේ_අංකය`);
    console.log(`========================================\n`);
    initBotServer();
});
