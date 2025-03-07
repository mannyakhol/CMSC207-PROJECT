import CONFIG from './config.js';
import { getRandomFact } from './utils.js';

let chatContainer;

function addMessage(message, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${isUser ? 'user' : 'bot'}`;
    messageDiv.innerHTML = `
        <div class="chat-avatar">${isUser ? '👤' : '🤖'}</div>
        <div class="message-content">${message}</div>
    `;
    chatContainer.appendChild(messageDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

function showTypingIndicator() {
    const typingDiv = document.createElement('div');
    typingDiv.className = 'typing-indicator';
    typingDiv.innerHTML = `
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
    `;
    chatContainer.appendChild(typingDiv);
    return typingDiv;
}

const chatResponses = {
    who: CONFIG.chat.responses.who,
    what: CONFIG.chat.responses.what,
    skills: CONFIG.chat.responses.skills,
    funfact: () => getRandomFact(CONFIG.facts),
    default: CONFIG.chat.responses.default
};

function handleOptionClick(e) {
    const button = e.target;
    const response = button.dataset.response;
    const question = button.textContent;
    
    addMessage(question, true);
    const typingIndicator = showTypingIndicator();
    chatContainer.scrollTop = chatContainer.scrollHeight;
    
    setTimeout(() => {
        typingIndicator.remove();
        const responseText = typeof chatResponses[response] === 'function' 
            ? chatResponses[response]() 
            : chatResponses[response] || chatResponses.default;
        addMessage(responseText);
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }, 1500);
}

export function initChatbot() {
    chatContainer = document.getElementById('chatContainer');
    const chatOptions = document.querySelectorAll('.chat-option');

    chatOptions.forEach(option => {
        option.addEventListener('click', handleOptionClick);
    });
}