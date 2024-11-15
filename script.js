async function sendMessage() {
  const webhookURL = document.getElementById('webhook').value;
  const message = document.getElementById('message').value;
  const count = parseInt(document.getElementById('count').value);
  const status = document.getElementById('status');
  
  if (!webhookURL || !message || !count || isNaN(count) || count < 1) {
    status.textContent = "Please fill in all fields correctly.";
    status.style.color = "red";
    return;
  }
  
  status.textContent = "Sending messages...";
  status.style.color = "white";
  
  for (let i = 0; i < count; i++) {
    try {
      await fetch(webhookURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ content: message })
      });
    } catch (error) {
      console.error("Failed to send message:", error);
      status.textContent = "Failed to send message.";
      status.style.color = "red";
      return;
    }
  }
  
  status.textContent = "Messages sent successfully!";
  status.style.color = "green";
}
