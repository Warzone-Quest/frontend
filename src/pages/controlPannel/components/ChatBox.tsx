import { useState } from 'react';
import { PaperAirplaneIcon } from '@heroicons/react/24/outline';

interface ChatBoxProps {
  onSendMessage?: (message: string) => void;
}

export const ChatBox: React.FC<ChatBoxProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim() && onSendMessage) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <div className="bg-white/10 rounded-lg flex flex-col">
      <div className="flex-1 p-4">
        {/* Chat messages will go here */}
      </div>
      <div className="p-4 border-t border-white/10">
        <div className="flex gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Message"
            className="flex-1 bg-white/5 rounded-lg px-4 py-2 text-white placeholder-white/50 border border-white/10 focus:outline-none focus:border-indigo-500"
          />
          <button
            onClick={handleSend}
            className="bg-indigo-500 text-white p-2 rounded-lg hover:bg-indigo-600 transition-colors"
          >
            <PaperAirplaneIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}; 