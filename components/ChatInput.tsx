
import React, { useRef } from 'react';
import { PaperAirplaneIcon, PaperClipIcon } from './IconComponents';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isLoading }) => {
  const [inputValue, setInputValue] = React.useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  React.useEffect(() => {
    adjustTextareaHeight();
  }, [inputValue]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() && !isLoading) {
      onSendMessage(inputValue.trim());
      setInputValue('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as any);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 bg-slate-800/80 backdrop-blur-sm border-t border-slate-700"
    >
      <div className="relative">
        <textarea
          ref={textareaRef}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
          rows={1}
          className="w-full bg-slate-700 text-slate-200 rounded-lg p-3 pl-12 pr-12 border border-slate-600 focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none transition-all duration-200 custom-scrollbar"
          style={{ maxHeight: '200px' }}
          disabled={isLoading}
        />
         <button
          type="button"
          className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-600 transition-colors"
          disabled={isLoading}
        >
          <PaperClipIcon className="w-5 h-5" />
        </button>
        <button
          type="submit"
          className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full text-white bg-blue-600 hover:bg-blue-700 disabled:bg-slate-500 disabled:cursor-not-allowed transition-colors"
          disabled={isLoading || !inputValue.trim()}
        >
          <PaperAirplaneIcon className="w-5 h-5" />
        </button>
      </div>
    </form>
  );
};
