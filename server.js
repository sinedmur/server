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

    const response = await fetch(
        `https://platform-api2.max.ru/messages?chat_id=${chatId}`,
        {
            method: "POST",
            headers: {
                "Authorization": ACCESS_TOKEN,
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                text
            })
        }
    );

    const raw = await response.text();

    console.log(raw);

    if (!response.ok) {
        throw {
            status: response.status,
            body: raw
        };
    }

    return JSON.parse(raw);
}

import { YooCheckout } from "yoo-checkout";

const checkout = new YooCheckout({
    shopId: process.env.YOOKASSA_SHOP_ID,
    secretKey: process.env.YOOKASSA_SECRET_KEY
});

app.post("/create-payment", async (req, res) => {

    const { amount } = req.body;

    const payment = await checkout.createPayment({
        amount: {
            value: amount.toFixed(2),
            currency: "RUB"
        },
        confirmation: {
            type: "redirect",
            return_url: "https://ваш-сайт.ru/payment-success"
        },
        capture: true,
        description: "Заказ столовой"
    });

    res.json({
        id: payment.id,
        url: payment.confirmation.confirmation_url
    });

});

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

