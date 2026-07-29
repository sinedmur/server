import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

// Только для тестов! Удалить после настройки сертификата Минцифры.
// process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const PORT = process.env.PORT || 8080;

const ACCESS_TOKEN = process.env.BOT_TOKEN?.trim();
const DEFAULT_CHAT_ID = Number(process.env.VITE_MANAGER_CHAT_ID);

if (!ACCESS_TOKEN) {
    console.error("❌ BOT_TOKEN not found");
    process.exit(1);
}

if (!DEFAULT_CHAT_ID) {
    console.error("❌ VITE_MANAGER_CHAT_ID not found");
    process.exit(1);
}

app.use(express.json());
app.use(express.static(path.join(__dirname, "dist")));

async function sendMaxMessage(chatId, text) {

    const body = {
        chat_id: Number(chatId),
        text
    };

    console.log("========== REQUEST ==========");
    console.log("URL:", "https://platform-api2.max.ru/messages");
    console.log("CHAT:", chatId);
    console.log("BODY:", body);

    const response = await fetch(
        "https://platform-api2.max.ru/messages",
        {
            method: "POST",
            headers: {
                "Authorization": ACCESS_TOKEN,
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(body)
        }
    );

    const raw = await response.text();

    let data;

    try {
        data = JSON.parse(raw);
    } catch {
        data = raw;
    }

    console.log("========== RESPONSE ==========");
    console.log("STATUS:", response.status);
    console.log(data);

    if (!response.ok) {
        throw {
            status: response.status,
            body: data
        };
    }

    return data;
}

app.post("/order", async (req, res) => {

    try {

        const chatId = req.body.chat_id || DEFAULT_CHAT_ID;
        const text = req.body.text;
            console.log("========== ORDER ==========");
            console.log({
                chatId,
                text,
                envChatId: DEFAULT_CHAT_ID
            });
        if (!text) {
            return res.status(400).json({
                success: false,
                error: "Field 'text' is required"
            });
        }

        const result = await sendMaxMessage(chatId, text);

        return res.json({
            success: true,
            result
        });

    } catch (err) {

        console.error("========== MAX ERROR ==========");
        console.error(err);

        return res.status(err.status || 500).json({
            success: false,
            error: err.body || err.message || err
        });

    }

});

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(PORT, () => {
    console.log(`🚀 Server started on ${PORT}`);
});

