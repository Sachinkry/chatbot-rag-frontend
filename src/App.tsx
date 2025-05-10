import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import ChatInterface from './components/ChatInterface';

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-950 text-gray-100 flex items-center justify-center p-4">
        <ChatInterface />
      </div>
    </ThemeProvider>
  );
}

export default App;