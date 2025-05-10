// Function to format a random recent date for news items
export const formatNewsDate = (): string => {
  const now = new Date();
  // Random number of days ago (0-6)
  const daysAgo = Math.floor(Math.random() * 7);
  
  const date = new Date(now.getTime() - daysAgo * 24 * 60 * 60 * 1000);
  
  // Format: Jun 15, 2025
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

// Function to format message timestamp
export const formatMessageTime = (timestamp: string): string => {
  const date = new Date(timestamp);
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
};