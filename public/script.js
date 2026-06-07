async function loadMessages() {
    const response = await fetch("/messages");
    const messages = await response.json();

    const guestbook =
        document.getElementById("guestbook");

    guestbook.innerHTML = "";

    for (const msg of messages) {
        guestbook.innerHTML += `
            <div class="message">
                <div class="name">${msg.name}</div>
                <div>${msg.message}</div>
                <div class="date">${msg.date}</div>
            </div>
        `;
    }
}

async function submitMessage() {
    const name =
        document.getElementById("name").value.trim();

    const message =
        document.getElementById("message").value.trim();

    if (!name || !message) {
        alert("yo either your name isnt down there or you didnt write anything. write it!!! (just write anonymous if you want)");
        return;
    }

    await fetch("/messages", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name,
            message
        })
    });

    document.getElementById("message").value = "";

    loadMessages();
}

loadMessages();
