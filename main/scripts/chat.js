// scripts/chat.js
const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

// Replace with your DeepSeek API key
const DEEPSEEK_API_KEY = 'sk-6fecdc760296467b9cd0e269057fbc5f';

// Function to add a message to the chat box
function addMessageToChatBox(message, isUser = false) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.classList.add(isUser ? 'user-message' : 'bot-message');
    messageElement.textContent = message;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight; // Scroll to the bottom
}

// Function to send a message to DeepSeek API
async function sendMessageToDeepSeek(message) {
    try {
        const response = await fetch('https://api.deepseek.com/v1/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${DEEPSEEK_API_KEY}`
            },
            body: JSON.stringify({
                message: message,
                // Add any additional parameters required by the API
            })
        });

        const data = await response.json();
        return data.response; // Adjust based on the API response structure
    } catch (error) {
        console.error('Error sending message to DeepSeek:', error);
        return 'Sorry, something went wrong. Please try again.';
    }
}

// Event listener for the send button
sendBtn.addEventListener('click', async () => {
    const userMessage = userInput.value.trim();
    if (userMessage) {
        addMessageToChatBox(userMessage, true); // Add user message to chat box
        userInput.value = ''; // Clear input field

        // Send user message to DeepSeek API
        const botResponse = await sendMessageToDeepSeek(userMessage);
        addMessageToChatBox(botResponse); // Add bot response to chat box
    }
});

// Allow pressing Enter to send a message
userInput.addEventListener('keypress', async (e) => {
    if (e.key === 'Enter') {
        sendBtn.click();
    }
});
