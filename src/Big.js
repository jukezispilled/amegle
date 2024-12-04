import React, { useState } from 'react';
import Webcam from 'react-webcam';

// ChatBox Component
function ChatBox({ messages, onNewChat }) {
  return (
    <div className="flex flex-col w-full h-[85dvh] overflow-y-auto border border-[#FCF5ED] relative">
        <div className='absolute top-2 left-2 grid font-semibold'>
            You are now chatting with a random animal. SAY STAND WITH HONG KONG AGAINST THE CCP!
            <button
                onClick={onNewChat}
                className="w-min whitespace-nowrap px-5 py-3 bg-gradient-to-b from-blue-500 to-blue-700 hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-800 text-white font-semibold"
                >
                New Chat
            </button>
        </div>
        <div className='mt-24'>
            {messages.map((msg, index) => (
                <div
                key={index}
                className={`my-1 p-2 flex ${msg.sender === 'You' ? 'text-right' : 'text-left'} 
                            whitespace-nowrap w-min`}
                >
                <strong>{msg.sender}: </strong>
                <span className="ml-1">{msg.text}</span>
                </div>
            ))}
        </div>
    </div>
  );
}

// MessageInput Component
function MessageInput({ onSendMessage }) {
    const [input, setInput] = useState('');
  
    const handleSend = () => {
      if (input.trim() !== '') {
        onSendMessage(input);
        setInput('');
      }
    };
  
    const handleKeyDown = (e) => {
      if (e.key === 'Enter') {
        handleSend();
      }
    };
  
    return (
      <div className="flex w-full h-[7.5dvh]">
        <button
          onClick={handleSend}
          className="px-4 py-2 bg-gradient-to-b from-blue-500 to-blue-700 hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-800 border border-[#FCF5ED] text-white font-semibold"
        >
          Send
        </button>
        <input
          type="text"
          placeholder="Type a message or ca/x/tg"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-grow p-2 border border-[#FCF5ED] outline-none"
        />
      </div>
    );
}  

// Header Component
function Header() {
  return (
    <div className="w-full h-[7.5dvh] p-2 text-center text-2xl font-bold border-b border-[#FCF5ED] flex items-center justify-between">
        <div className='flex items-center h-full'>
            <img src="amegle.png" className='h-[100%]' />
            <div className='ml-[50%] -rotate-3 whitespace-nowrap'>Talk to animals!</div>         
        </div>
        <div className='text-blue-500 text-3xl'>
            42069+ <span className='text-blue-300 text-xl'>online now</span>
        </div>
    </div>
  );
}

// WebcamView Component with key for forcing video reload
function WebcamView({ isSelf, videoSrc, videoKey }) {
  return (
    <div className="h-1/2 overflow-hidden bg-slate-300 border border-[#FCF5ED] flex items-center justify-center relative">
      {isSelf ? (
        <Webcam className="w-full h-full object-cover" />
      ) : (
        <div className="w-full h-full">
          <video
            key={videoKey}
            className="w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src={videoSrc} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <img
            src="amegle.png"
            className="w-[200px] absolute bottom-4 left-4 z-20"
            alt="Omegle Logo"
          />
        </div>
      )}
    </div>
  );
}

// Main App Component
function Big() {
  const [messages, setMessages] = useState([]);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [videoKey, setVideoKey] = useState(0);
  
  // List of videos
  const videos = [
    { src: '/user9.mp4', responses: ['kinda busy rn bro', 'don\'t you see i\'m playing the game', 'ok fine what\'s on your mind lil bro', 'just buy the coin bro', 'ticker is $amegle', 'chill tf out i\'m about to break my high score', 'talk to me when your in a lambo'] },
    { src: '/user1.mp4', responses: ['sup pussy', 'how are you?', 'just buy the coin bro', 'ticker is $amegle', 'pussy'] },
    { src: '/user2.mp4', responses: ['rawr rawr rawr', 'tf you lookin at', 'how can I help you today?', 'you\'re the one with the weird peanut butter habit right'] },
    { src: '/user3.mp4', responses: ['greetings!', 'how\'s it going?', 'what\'s your name?', 'wya', 'just buy the coin bro', 'ticker is $amegle'] },
    { src: '/user4.mp4', responses: ['ayooo', 'what brings you here?', 'help me collect some of this snow', 'you know how much this shit goes for bro?', 'stfu lemme get this bread'] },
    { src: '/user5.mp4', responses: ['hey there!', 'looking good!', 'watch this solo', 'idk but i play like mozart', 'the dog told me about you'] },
    { src: '/user6.mp4', responses: ['wtf you looking at', 'leave me alone', 'they are using me on this app'] },
    { src: '/user7.mp4', responses: ['this a camera?', 'yea we out gang', 'pawning this camera one sec', 'free peanut'] },
    { src: '/user8.mp4', responses: ['waddle waddle lil homie', 'tf out my face', 'ok fine what\'s on your mind lil bro', 'just buy the coin bro', 'ticker is $amegle'] }
  ];

  const handleSendMessage = (message) => {
    setMessages((prevMessages) => [...prevMessages, { text: message, sender: 'You' }]);

    // Check for specific keywords and respond accordingly
    let response;
    if (message.toLowerCase().includes("ca")) {
      response = "updating...";
    } else if (message.toLowerCase().includes("twitter") || message.toLowerCase().includes("x")) {
      response = <a href="https://x.com/aimegle89178" target="_blank" rel="noopener noreferrer" className='underline text-blue-700'>Follow us on Twitter/X</a>;
    } else if (message.toLowerCase().includes("telegram") || message.toLowerCase().includes("tg")) {
      response = <a href="https://t.me/aimegle" target="_blank" rel="noopener noreferrer" className='underline text-blue-700'>Join us on Telegram</a>;
    } else {
      // Select a random response from the current video
      response = videos[currentVideoIndex].responses[Math.floor(Math.random() * videos[currentVideoIndex].responses.length)];
    }

    setTimeout(() => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: response, sender: 'Animal' },
      ]);
    }, 1000);
  };

  const handleNewChat = () => {
    setMessages([]);
    setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videos.length);
    setVideoKey((prev) => prev + 1);
  };

  return (
    <div className="flex flex-col items-center min-h-screen">
      <Header />
      <div className="flex w-full h-[calc(100dvh-7.5dvh)]">
        <div className="flex flex-col w-1/2 h-full">
          <WebcamView
            isSelf={false}
            videoSrc={videos[currentVideoIndex].src}
            videoKey={videoKey}
          />
          <WebcamView
            isSelf={true}
            videoSrc={videos[currentVideoIndex].src}
            videoKey={videoKey}
          />
        </div>
        <div className="flex flex-col w-1/2">
          <ChatBox messages={messages} onNewChat={handleNewChat} />
          <MessageInput onSendMessage={handleSendMessage} />
        </div>
      </div>
    </div>
  );
}

export default Big;