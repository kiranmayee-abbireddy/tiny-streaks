// A collection of motivational quotes
const quotes = [
  "Small habits, consistently done, create remarkable results.",
  "Success is the sum of small efforts, repeated day in and day out.",
  "The habit of persistence is the habit of victory.",
  "Discipline is choosing between what you want now and what you want most.",
  "Good habits formed at youth make all the difference.",
  "We are what we repeatedly do. Excellence, then, is not an act, but a habit.",
  "Motivation is what gets you started. Habit is what keeps you going.",
  "Habits are first cobwebs, then cables.",
  "The chains of habit are too light to be felt until they're too heavy to be broken.",
  "You'll never change your life until you change something you do daily.",
  "Successful people are simply those with successful habits.",
  "Good habits are worth being fanatical about.",
  "Champions don't do extraordinary things. They do ordinary things, but they do them without thinking.",
  "Your net worth to the world is usually determined by what remains after your bad habits are subtracted from your good ones.",
  "First forget inspiration. Habit is more dependable. Habit will sustain you whether you're inspired or not.",
  "Habits are the invisible architecture of daily life.",
  "The only way to make a new habit stick is through repetition.",
  "Excellence is not a singular act but a habit. You are what you do repeatedly.",
  "The difference between an amateur and a professional is in their habits.",
  "You do not rise to the level of your goals. You fall to the level of your systems."
];

// Streak milestone messages
const streakMilestones = [
  { threshold: 3, message: "Three days in! The beginning of a new habit is forming." },
  { threshold: 7, message: "A full week! Your brain is starting to wire this habit in." },
  { threshold: 14, message: "Two weeks strong! This is becoming part of your routine." },
  { threshold: 21, message: "21 days! Science says your habit is taking root now." },
  { threshold: 30, message: "A full month! You've proven your commitment to yourself." },
  { threshold: 50, message: "50 days! You're building something truly valuable." },
  { threshold: 66, message: "66 days! Research shows this is when habits become automatic." },
  { threshold: 100, message: "100 days! You've achieved what few people ever do." },
  { threshold: 180, message: "Half a year! Your habit is now a core part of who you are." },
  { threshold: 365, message: "A FULL YEAR! This isn't just a habit anymore—it's part of your identity." }
];

// Get a motivational quote based on streak count
export const getMotivationalQuote = (streak: number): string => {
  // First check if there's a milestone message for this streak count
  const milestone = streakMilestones.find(ms => ms.threshold === streak);
  if (milestone) {
    return milestone.message;
  }
  
  // Otherwise return a random quote
  const randomIndex = Math.floor(Math.random() * quotes.length);
  return quotes[randomIndex];
};