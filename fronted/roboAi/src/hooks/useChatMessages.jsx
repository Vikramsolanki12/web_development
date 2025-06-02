import { useState } from 'react';

export const useChatMessages = () => {
    const [messages, setMessages] = useState([]);

    const addMessage = (newMessage) => {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
    };

    return { messages, addMessage };
};