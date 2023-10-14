const dictionary = {
  Header: {
    title: 'Congratulations!',
    subtitle: 'Promotional Contest on',
  },
  Main: {
    dearUser: 'Dear User',
    today: 'Today',
    prize: 'Samsung Galaxy A53',
    p1: 'you have been randomly selected to participate in this survey. It will only takes you a minute and you may win a prize: a',
    p2: 'Every month, we randomly choose 10 users to give a chance to win fabulous prizes. Current prize is a',
    p3: 'Only 10 lucky winners and only if you live in your country.',
  },
  Counter: {
    p1: 'You only have',
    p2: 'to participate',
    minutes: 'minutes',
    seconds: 'seconds',
    and: 'and',
  },
  SurveyTexts: [
    {
      q: 'What is your gender?',
      a: ['Woman', 'Man'],
    },
    {
      q: 'How old are you?',
      a: ['under 18', '18-29 years', '30-49 years', '50-80 years'],
    },
    {
      q: 'How many people live with you in the household?',
      a: ['one', 'two', 'three', 'four'],
    },
    {
      q: 'Have you ever used this device?',
      a: ['yes', 'no'],
    },
  ],
  CommentsSection: {
    commentsWord: 'comments',
    sort: 'Sort by: Top',
    likes: 'likes',
    reply: 'reply',
    Comments: [
      {
        name: 'Maria Farela',
        text: 'Is it possible to play again? :)',
        relativeTime: 'just now',
      },
      {
        name: 'Fred Hedbeek',
        text: 'I had heard about it!',
        relativeTime: '17 minutes ago',
      },
      {
        name: 'Patricia Kincey',
        text: 'Thank you so much!',
        relativeTime: '23 minutes ago',
      },
      {
        name: 'Miguel Sanchez',
        text: 'All the gifts are empty!!!',
        relativeTime: '30 minutes ago',
      },
      {
        name: 'Mitchell Snyder',
        text: 'Yeah!',
        relativeTime: '39 minutes ago',
      },
      {
        name: 'Judy Robin',
        text: 'You must carefully follow all the instructions.',
        relativeTime: '47 minutes ago',
      },
      {
        name: 'Matthew Helme',
        text: "I've never won anything before...",
        relativeTime: '59 minutes ago',
      },
      {
        name: 'Davidson Bazil',
        text: 'I LOST :(',
        relativeTime: '1 hour ago',
      },
      {
        name: 'Scott Michalczyk',
        text: "I had already seen this game last year but I had ignored it because I thought it was nonsense. I'm going to try again!",
        relativeTime: '1 hour ago',
      },
      {
        name: 'Layelle Johnson',
        text: 'Thank you so much, its just amazing!!! This is the best!!!',
        relativeTime: '1 hour ago',
      },
      {
        name: 'Christopher Gibbs',
        text: 'What is on the next page?',
        relativeTime: '1 hour ago',
      },
      {
        name: 'Pamela Hills',
        text: 'Oh, am I the only one who lost? :( :(',
        relativeTime: '1 hour ago',
      },
      {
        name: 'Paul Wesley',
        text: 'Is it true?',
        relativeTime: '2 hours ago',
      },
      {
        name: 'Mandy Brooke',
        text: "You're incredible! Thank you for doing this!",
        relativeTime: '2 hours ago',
      },
      {
        name: 'George Brown',
        text: 'Thank you! Thank you!',
        relativeTime: '2 hours ago',
      },
      {
        name: 'Angelo Rodriguez',
        text: 'Is this a joke?',
        relativeTime: '3 hours ago',
      },
    ],
  },
  Modal: {
    Welcome: {
      title: 'Congratulations, your answers are correct.',
      description: 'Now you have the opportunity to receive a gift.',
      description2: 'test you luck',
      onCloseText: 'Continue',
    },
    FirstTry: {
      title: 'Bad Luck! Try again',
      description: '2 attempts left',
    },
    SecondTry: {
      title: 'You are participating in a competition.',
      description: 'Proceed to the next step',
    },
  },
  Assessment: {
    heading: 'Checking your answers...',
    p1: '4 / 4 questions answered',
    p2: 'No previous surveys from your IP found',
    p3: 'There are still gifts available!',
  },
};

export default dictionary;

export type TOldSweepDictionary = typeof dictionary;
