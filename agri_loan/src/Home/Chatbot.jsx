import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import './Chatbot.css';
import Lottie from 'lottie-react';
import animationData from '../icons/chatbot.json';
const Chatbot = () => {
    const [message, setMessage] = useState('');
    const [chatHistory, setChatHistory] = useState([]);
    const [isOpen, setIsOpen] = useState(false);

    const chatContainerRef = useRef(null);
    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [chatHistory]);


    const handleSend = async () => {

        if(!message){
            alert('Type Something..!')
            return;
        }

        setChatHistory([...chatHistory, { text: message, from: 'login_user' }]);
        setMessage('');

        try {
            const response = await axios.post('http://localhost:8080/data/chatbot/message', {message});
            setChatHistory([...chatHistory, { text: message, from: 'login_user' }, { text: response.data, from: 'bot' }]);
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div>
            <div className={`chatbot ${isOpen ? 'open' : 'closed'}`}>
                <div className="chat-header">
                    <img src='https://cdn-icons-png.flaticon.com/128/6231/6231457.png' alt='none' width={30} height={30} />
                    <h4>Need Any Help ?</h4>
                    <button className="close-btn" onClick={handleToggle}>X</button>
                </div>
                <div className="chat-history" ref={chatContainerRef}>
                    {chatHistory.map((entry, index) => (
                        <div key={index} className={`chat-entry ${entry.from}`}>
                            {entry.text}
                        </div>
                    ))}
                </div>
                <div className="chat-input">
                    <input
                        type="text"
                        placeholder='Try sending Hi...'
                        value={message}
                        className='Chat-input-bar-text'
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    />
                    <button onClick={handleSend} className='chatbot-button'>
                    <img src='https://cdn-icons-png.flaticon.com/128/6532/6532019.png' alt='none' width={30} height={30} />
                    </button>   
                </div>
            </div>
            {!isOpen && 
            
            <button className="open-chat-btn" onClick={handleToggle}>
               <p>Need help ?</p>
      <Lottie animationData={animationData} className='chatbot-json' />
    </button>
            }
        </div>
    );
};

export default Chatbot;

