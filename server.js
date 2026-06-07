const express = require("express");
const fs = require("fs");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static("public"));

const DATA_FILE = "./data/messages.json";

function getMessages() {
    try {
        return JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
    } catch {
        return [];
    }
}

function saveMessages(messages) {
    fs.writeFileSync(
        DATA_FILE,
        JSON.stringify(messages, null, 2)
    );
}

app.get("/messages", (req, res) => {
    res.json(getMessages());
});

app.post("/messages", (req, res) => {
    const { name, message } = req.body;

    if (!name || !message) {
        return res.status(400).json({
            error: "Name and message required"
        });
    }

    const messages = getMessages();

    messages.unshift({
        name,
        message,
        date: new Date().toLocaleString()
    });

    saveMessages(messages);

    res.json({ success: true });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
