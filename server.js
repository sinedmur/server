import express from "express";
import dotenv from "dotenv";
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
    console.error("❌ BOT_TOKEN is missing");
    process.exit(1);
}

if (!DEFAULT_CHAT_ID) {
    console.error("❌ VITE_MANAGER_CHAT_ID is missing");
    process.exit(1);
}

app.use(express.json());
app.use(express.static(path.join(__dirname, "dist")));

app.post("/order", async (req, res) => {
    try {
        const { chat_id, text } = req.body;

        if (!text) {
            return res.status(400).json({
                success: false,
                error: "Text is required"
            });
        }

        const response = await fetch(
            "https://platform-api2.max.ru/messages",
            {
                method: "POST",
                headers: {
                    "Authorization": ACCESS_TOKEN,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    chat_id: chat_id || DEFAULT_CHAT_ID,
                    text
                })
            }
        );

        const data = await response.json();

        if (!response.ok) {
            console.error("MAX API ERROR:", data);

            return res.status(response.status).json({
                success: false,
                status: response.status,
                error: data
            });
        }

        console.log("✅ Message sent:", data);

        res.json({
            success: true,
            data
        });

    } catch (err) {

        console.error("SERVER ERROR:", err);

        res.status(500).json({
            success: false,
            error: err.message
        });

    }
});

app.get("*", (_, res) => {
    res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(PORT, () => {
    console.log(`🚀 Server started on ${PORT}`);
});