import React, { useState, useRef, useEffect } from 'react';
import ChatBubble from './components/ChatBubble';
import ChatInput from './components/ChatInput';
import LoadingIndicator from './components/LoadingIndicator';
import { useChatMessages } from './hooks/useChatMessages';

function App() {
    const { messages, addMessage } = useChatMessages();
    const [userInput, setUserInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const chatContainerRef = useRef(null);

    useEffect(() => {
        chatContainerRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSendMessage = async (message) => {
        if (!message.trim()) return;
        addMessage({ text: message, sender: 'user' });
        setUserInput('');
        setIsLoading(true);

        try {
            const response = await fetch('http://localhost:5001/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            addMessage({ text: data.response, sender: 'bot' });
        } catch (error) {
            console.error("Error sending message to backend:", error);
            addMessage({ text: "Sorry, I couldn't connect to the RoboAI brain.", sender: 'bot' });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-robo-dark flex flex-col items-center justify-center p-6 font-futuristic">
            <div className="bg-robo-light rounded-xl shadow-lg p-8 w-full max-w-md flex flex-col">
                <div className='flex justify-center gap-2 '>
                     <img src="./src/assets/logo.jpg" alt="My Image" className='h-10 w-10 rounded-full border-black border-2 ' />
                    <h1 className="text-4xl font-bold text-robo-dark text-center mb-4"> RoboAi Hub</h1>
                </div>

                <div className="flex-grow overflow-y-auto mb-4">
                    {messages.map((msg, index) => (
                        <ChatBubble key={index} message={msg} />
                    ))}
                    {isLoading && <LoadingIndicator />}
                    <div ref={chatContainerRef} />
                </div>
                <ChatInput onSendMessage={handleSendMessage} />
            </div>
        </div>
    );
}

export default App;