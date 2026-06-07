document.getElementById('alertBtn').addEventListener('click', function() {
    alert('clicked it didnt ya');
});
const messages = [];

app.post("/add-message", (req, res) => {
    messages.push(req.body);
    res.sendStatus(200);
});

app.get("/messages", (req, res) => {
    res.json(messages);
});
async function loadMessages() {
    const response = await fetch("/messages");
    const messages = await response.json();

    const guestbook = document.getElementById("guestbook");

    guestbook.innerHTML = messages
        .map(m => `<p><b>${m.name}</b>: ${m.message}</p>`)
        .join("");
}
