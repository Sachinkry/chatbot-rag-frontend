import { formatNewsDate } from './dateUtils';

const NEWS_TOPICS = [
  'technology',
  'business',
  'health',
  'science',
  'politics',
  'entertainment',
  'sports',
];

const TECH_RESPONSES = [
  "Recent advances in artificial intelligence have shown promising results in medical diagnosis, with new models achieving 95% accuracy in detecting early-stage cancers.",
  "The latest smartphone sales report shows a 7% increase in global shipments, with foldable phones gaining significant market share for the first time.",
  "A new quantum computing breakthrough allows researchers to maintain quantum coherence for over 10 minutes, potentially enabling practical quantum applications.",
  "Tech giants announced plans to invest $50 billion in semiconductor manufacturing to address the ongoing global chip shortage.",
];

const BUSINESS_RESPONSES = [
  "Global markets rallied as inflation numbers came in lower than expected, with the S&P 500 gaining 2.3% in a single trading session.",
  "The central bank maintained interest rates at current levels, citing moderate economic growth and controlled inflation as key factors.",
  "A major merger between two retail giants was approved, creating the second-largest e-commerce platform in North America.",
  "Supply chain challenges continue to impact manufacturing sectors, with delivery times improving but still 30% higher than pre-pandemic levels.",
];

const HEALTH_RESPONSES = [
  "A new vaccine candidate has shown 89% efficacy against the latest viral variants in phase 3 clinical trials.",
  "Research indicates that a Mediterranean diet combined with regular exercise can reduce heart disease risk by up to 42%.",
  "Mental health awareness programs in workplaces have led to a 23% decrease in reported burnout cases, according to a new study.",
  "Healthcare spending reached 18.3% of GDP last year, with prescription drug costs accounting for the largest increase.",
];

const SCIENCE_RESPONSES = [
  "Astronomers discovered a potentially habitable exoplanet just 31 light-years from Earth, with evidence suggesting the presence of water in its atmosphere.",
  "A breakthrough in materials science has led to the development of a biodegradable plastic alternative that decomposes completely within 6 months.",
  "Climate researchers documented a 12% increase in extreme weather events compared to the previous decade, highlighting the accelerating impact of climate change.",
  "Genetic editing techniques have successfully corrected a hereditary disease in human embryos for the first time, though ethical debates continue.",
];

const POLITICS_RESPONSES = [
  "Voter turnout for the recent election reached 67%, the highest in two decades, with particularly strong participation among first-time voters.",
  "A historic climate agreement was signed by 132 nations, committing to carbon neutrality by 2050 with binding five-year targets.",
  "Diplomatic relations between previously conflicting nations have shown improvement, with talks scheduled for next month on trade agreements.",
  "New legislation addressing digital privacy passed with bipartisan support, establishing stronger protections for consumer data.",
];

const ENTERTAINMENT_RESPONSES = [
  "The summer's biggest blockbuster has crossed the $1 billion mark globally, becoming the highest-grossing film of the year.",
  "Streaming platforms saw a 15% increase in subscribers last quarter, with original content driving most of the growth.",
  "A breakthrough virtual reality concert attracted 2.3 million live viewers, potentially establishing a new format for music performances.",
  "Award nominations were announced today, with diverse representation across all major categories for the first time in the event's history.",
];

const SPORTS_RESPONSES = [
  "The underdog team made history by winning the championship after an incredible comeback in the final minutes of the game.",
  "A new world record was set in the marathon, beating the previous record by an impressive 42 seconds.",
  "The international tournament will expand to include 8 additional countries in its next edition, broadening global representation.",
  "Athletes are embracing new training technologies, with data showing a 18% improvement in performance metrics among early adopters.",
];

const GENERAL_RESPONSES = [
  "I don't have specific information on that topic, but I'd be happy to discuss recent developments in technology, business, health, science, politics, entertainment, or sports.",
  "While I don't have details about that particular subject, I can share news from various categories if you specify your interests.",
  "That's an interesting question! Though I don't have that specific information, I can provide updates on major news topics if you'd like.",
];

// Function to get random response from a category
const getRandomResponse = (responses: string[]) => {
  const randomIndex = Math.floor(Math.random() * responses.length);
  const date = formatNewsDate();
  return `${responses[randomIndex]} (${date})`;
};

// Function to determine which category a message belongs to
const determineCategory = (message: string): string => {
  message = message.toLowerCase();
  
  for (const topic of NEWS_TOPICS) {
    if (message.includes(topic)) {
      return topic;
    }
  }
  
  // Check for more specific keywords
  if (message.includes('ai') || message.includes('computer') || message.includes('digital') || message.includes('app')) {
    return 'technology';
  }
  
  if (message.includes('market') || message.includes('economy') || message.includes('stock') || message.includes('finance')) {
    return 'business';
  }
  
  if (message.includes('medical') || message.includes('disease') || message.includes('doctor') || message.includes('wellness')) {
    return 'health';
  }
  
  if (message.includes('research') || message.includes('discovery') || message.includes('space') || message.includes('study')) {
    return 'science';
  }
  
  if (message.includes('election') || message.includes('government') || message.includes('policy') || message.includes('law')) {
    return 'politics';
  }
  
  if (message.includes('movie') || message.includes('music') || message.includes('celebrity') || message.includes('show')) {
    return 'entertainment';
  }
  
  if (message.includes('game') || message.includes('player') || message.includes('team') || message.includes('championship')) {
    return 'sports';
  }
  
  return 'general';
};

// Main function to generate bot responses
export const generateBotResponse = async (message: string): Promise<string> => {
  // Wait to simulate processing time
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const category = determineCategory(message);
  
  switch (category) {
    case 'technology':
      return getRandomResponse(TECH_RESPONSES);
    case 'business':
      return getRandomResponse(BUSINESS_RESPONSES);
    case 'health':
      return getRandomResponse(HEALTH_RESPONSES);
    case 'science':
      return getRandomResponse(SCIENCE_RESPONSES);
    case 'politics':
      return getRandomResponse(POLITICS_RESPONSES);
    case 'entertainment':
      return getRandomResponse(ENTERTAINMENT_RESPONSES);
    case 'sports':
      return getRandomResponse(SPORTS_RESPONSES);
    default:
      return getRandomResponse(GENERAL_RESPONSES);
  }
};