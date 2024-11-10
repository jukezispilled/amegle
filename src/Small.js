import React, { useState } from 'react';
import Webcam from 'react-webcam';
import { MessageCircle, X } from 'lucide-react';

// Header Component
function Header() {
  return (
    <div className="w-full h-[7.5dvh] py-3 px-4 flex items-center border-b border-[#FCF5ED]">
      <img src="amegle.png" className="w-[125px]" />
      <div className="ml-[25%] -rotate-3 font-bold">Talk to animals!</div>
    </div>
  );
}

// ChatModal Component
function ChatModal({ isOpen, onClose, messages, onSendMessage }) {
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim() !== '') {
      onSendMessage(input);
      setInput('');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end sm:items-center justify-center">
      <div className="bg-white w-full h-[80vh] sm:h-[70vh] sm:w-[80vw] sm:max-w-lg sm:rounded-lg flex flex-col">
        <div className="p-4 border-b border-[#FCF5ED] flex justify-between items-center">
          <h3 className="font-semibold">Chat with animal</h3>
          <button onClick={onClose} className="p-1">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`mb-2 p-2 ${
                msg.sender === 'You'
                  ? 'bg-blue-100 ml-auto'
                  : 'bg-gray-100'
              } max-w-[80%] w-fit`}
            >
              <strong>{msg.sender}: </strong>
              <span>{msg.text}</span>
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-[#FCF5ED]">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Type a message... or ca/x/tg"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 p-2 border border-[#FCF5ED] outline-none"
            />
            <button
              onClick={handleSend}
              className="px-4 py-2 bg-gradient-to-b from-blue-500 to-blue-700 hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-800 text-white font-semibold"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// WebcamView Component
function WebcamView({ isSelf, videoSrc, videoKey, onNewChat }) {
  return (
    <div className="h-1/2 overflow-hidden bg-slate-300 border border-[#FCF5ED] relative">
      {isSelf ? (
        <Webcam className="w-full h-full object-cover" />
      ) : (
        <div className="relative h-full">
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
          <button
            onClick={onNewChat}
            className="absolute top-3 left-3 px-4 py-2 bg-gradient-to-b from-blue-500 to-blue-700 hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-800 text-white font-semibold z-10"
          >
            New Chat
          </button>
        </div>
      )}
    </div>
  );
}

function Small() {
  const [messages, setMessages] = useState([]);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [videoKey, setVideoKey] = useState(0);
  const [isChatOpen, setIsChatOpen] = useState(false);

  // List of videos and their possible responses
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
      response = <a href="https://x.com/amegleonline" target="_blank" rel="noopener noreferrer" className='underline text-blue-700'>Follow us on Twitter/X</a>;
    } else if (message.toLowerCase().includes("telegram") || message.toLowerCase().includes("tg")) {
      response = <a href="https://t.me/amegleportal" target="_blank" rel="noopener noreferrer" className='underline text-blue-700'>Join us on Telegram</a>;
    } else {
      // Select a random response from the current video
      response = videos[currentVideoIndex].responses[Math.floor(Math.random() * videos[currentVideoIndex].responses.length)];
    }

    setTimeout(() => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: response, sender: 'Stranger' },
      ]);
    }, 1000);
  };

  const handleNewChat = () => {
    setMessages([]);
    setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videos.length);
    setVideoKey(prev => prev + 1);
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      <Header />

      <div className="flex-1 flex flex-col relative">
        <WebcamView
          isSelf={false}
          videoSrc={videos[currentVideoIndex].src}
          videoKey={videoKey}
          onNewChat={handleNewChat}
        />
        <WebcamView
          isSelf={true}
          videoSrc={videos[currentVideoIndex].src}
          videoKey={videoKey}
        />

        <button
          onClick={() => setIsChatOpen(true)}
          className="absolute bottom-4 right-4 p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      </div>

      <ChatModal
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        messages={messages}
        onSendMessage={handleSendMessage}
      />
    </div>
  );
}

export default Small;