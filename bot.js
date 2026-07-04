const { default: makeWASocket, useMultiFileAuthState } = require('@whiskeysockets/baileys');
const pino = require('pino');
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Main function to handle pairing code via Web API
app.get('/code', async (req, res) => {
    let num = req.query.number;
    
    if (!num) {
        return res.status(400).json({ error: "කරුණාකර දුරකථන අංකයක් ලබා දෙන්න." });
    }

    // ERROR FIX: + ලකුණ සහ අනෙකුත් අනවශ්‍ය සංකේත ඉවත් කිරීම
    num = num.replace(/[^0-9]/g, '');

    try {
        // තාවකාලිකව auth state එකක් හදනවා code එක ගන්න විතරක් (MongoDB අවශ්‍ය නැත)
        const { state, saveCreds } = await useMultiFileAuthState(path.join(__dirname, 'session'));
        
        const sock = makeWASocket({
            auth: state,
            printQRInTerminal: false,
            logger: pino({ level: "silent" }),
            browser: ["Ubuntu", "Chrome", "20.0.0"]
        });

        // Credentials update වුනොත් save කරන්න监听
        sock.ev.on('creds.update', saveCreds);

        // දැනටමත් login වෙලා නැත්නම් විතරක් code එක ඉල්ලනවා
        if (!sock.authState.creds.registered) {
            // තත්පර 3ක් delay එකක් දෙනවා Baileys එක සූදානම් වෙන්න
            await new Promise(resolve => setTimeout(resolve, 3000));
            
            // Pair code එක ඉල්ලීම
            let code = await sock.requestPairingCode(num);
            code = code?.match(/.{1,4}/g)?.join('-') || code;
            
            // සාර්ථකව code එක ලැබුනොත් frontend එකට යවනවා
            return res.json({ code: code });
        } else {
            return res.json({ error: "මෙම අංකය දැනටමත් සම්බන්ධ වී ඇත." });
        }

    } catch (error) {
        console.error("Pairing Error: ", error);
        return res.status(500).json({ error: "කේතය ලබා ගැනීමට නොහැකි විය. නැවත උත්සාහ කරන්න." });
    }
});

// Server එක start කිරීම
app.listen(PORT, () => {
    console.log(`සර්වර් එක ක්‍රියාත්මකයි: http://localhost:${PORT}`);
});
