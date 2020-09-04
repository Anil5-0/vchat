const socket = io();
// Query DOM
const btn = document.getElementById('send'),
      output = document.getElementById('output'),
      handle = document.getElementById('handle'),
      msg = document.getElementById('message'),
      chat_window = document.getElementById('chat-window'),
      feedback = document.getElementById('feedback');

// Emit Events
btn.addEventListener('click', () => {
    socket.emit('chat',{
        handle: handle.value,
        message: msg.value
    })
    msg.value = "";
    msg.focus();
});

msg.addEventListener('keypress', () => {
    socket.emit('typing', handle.value);
})

// Add Event Listeners
socket.on('chat', (data) => {
    feedback.innerHTML = '';
    output.innerHTML += '<p><strong>' + data.handle + ' : </strong>' + data.message + '</p>';
    chat_window.scrollTop = chat_window.scrollHeight;
});

socket.on('typing', (data) => {
    feedback.innerHTML = '<p><em>' + data + ' is typing...</em></p>';
})

document.querySelector("#message").addEventListener("keyup", event => {
    if(event.key !== "Enter") return; // Use `.key` instead.
    document.querySelector("#send").click(); // Things you want to do.
    event.preventDefault(); // No need to `return false;`.
});