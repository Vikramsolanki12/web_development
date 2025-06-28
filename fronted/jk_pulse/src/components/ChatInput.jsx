import React, { useState } from 'react';

function ChatInput({ onSendMessage }) {
    const [inputText, setInputText] = useState('');

    const handleInputChange = (event) => {
        setInputText(event.target.value);
    };

    const handleSend = () => {
        onSendMessage(inputText);
        setInputText('');
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSend();
        }
    };

    return (
        <div className="flex rounded-md shadow-sm">
            <input
                type="text"
                className="flex-grow p-3 border text-black border-gray-300 rounded-l-md focus:ring-robo-blue focus:border-robo-blue"
                placeholder="Ask me about AI or Robotics..."
                value={inputText}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
            />
            <button
                className="bg-robo-accent text-robo-dark font-bold py-3 px-4 rounded-r-md hover:bg-robo-accent-dark focus:outline-none focus:ring-2 focus:ring-robo-accent"
                onClick={handleSend}
            >
                Send
            </button>
        </div>
    );
}

export default ChatInput;