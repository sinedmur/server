import express from "express";
import dotenv from "dotenv";
import https from "https";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 8080;

const ACCESS_TOKEN = process.env.BOT_TOKEN?.trim();
const DEFAULT_CHAT_ID = process.env.VITE_MANAGER_CHAT_ID?.trim();

if (!ACCESS_TOKEN) {
    console.error("❌ BOT_TOKEN не найден");
    process.exit(1);
}

if (!DEFAULT_CHAT_ID) {
    console.error("❌ VITE_MANAGER_CHAT_ID не найден");
    process.exit(1);
}

app.use(express.json());

app.use(express.static(path.join(__dirname, "dist")));

function sendMessage(chatId, text) {
    return new Promise((resolve, reject) => {
        const body = JSON.stringify({
            chat_id: chatId,
            text
        });

        const req = https.request(
            "https://platform-api2.max.ru/messages",
            {
                method: "POST",
                headers: {
                    "Authorization": ACCESS_TOKEN,
                    "Content-Type": "application/json",
                    "Content-Length": Buffer.byteLength(body)
                }
            },
            (res) => {
                let data = "";

                res.on("data", chunk => {
                    data += chunk;
                });

                res.on("end", () => {
                    let json = {};

                    try {
                        json = data ? JSON.parse(data) : {};
                    } catch {
                        json = { raw: data };
                    }

                    if (res.statusCode >= 200 && res.statusCode < 300) {
                        resolve(json);
                    } else {
                        reject({
                            status: res.statusCode,
                            response: json
                        });
                    }
                });
            }
        );

        req.on("error", reject);

        req.write(body);
        req.end();
    });
}

app.post("/order", async (req, res) => {
    try {
        const { chat_id, text } = req.body;

        if (!text) {
            return res.status(400).json({
                success: false,
                error: "Поле text обязательно"
            });
        }

        const result = await sendMessage(
            chat_id || DEFAULT_CHAT_ID,
            text
        );

        console.log("✅ Message sent:", result);

        res.json({
            success: true,
            data: result
        });

    } catch (err) {

        console.error("MAX API ERROR");

        console.error(err);

        res.status(err.status || 500).json({
            success: false,
            error: err.response || err.message || err
        });

    }
});

app.get("*", (_, res) => {
    res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(PORT, () => {
    console.log(`🚀 Server started on port ${PORT}`);
});