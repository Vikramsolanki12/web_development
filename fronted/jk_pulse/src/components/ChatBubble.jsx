import React from 'react';

function ChatBubble({ message }) {
    const isUser = message.sender === 'user';
    return (
        <div className={`mb-2 p-3 rounded-lg ${isUser ? 'bg-robo-blue text-white self-end' : 'bg-gray-300 text-robo-dark self-start'}`}>
            {message.text}
        </div>
    );
}

export default ChatBubble;