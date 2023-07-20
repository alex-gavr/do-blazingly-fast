const dictionary = {
  MainSection: {
    title: 'Would You Make A Great Career Online And Become A Millionaire By 2023?',
    paragraph: 'Take this FREE test and find out how you can make money on the Internet.',
    SurveyTexts: [
      { q: 'What is your gender?', a: ['Man', 'Woman'] },
      { q: 'How old are you?', a: ['less than 18 years', '18-29 years', '30-49 years', '50-80 years'] },
      { q: 'How do you make a living?', a: ['I work', 'I am self-employed', 'I am unemployed', 'I am a pensioner'] },
      { q: 'What is your average income per year?', a: ['Less than $10,000', '$10,000-$30,000', '$30,000-$50,000', 'more than $50,000'] },
      {
        q: 'What is your financial goal for the next 5 years?',
        a: ['Go on a family holiday', 'Buy a supercar', 'Buy an apartment or a house', 'Start my own business'],
      },
      {
        q: 'How much would you invest right now to get closer to your financial goal much faster?',
        a: ['less than $250', '$250-$500', '$500-$1000', 'more than $1000'],
      },
      {
        q: 'Do you have any experience in Bitcoin trading?',
        a: ['No, I have never heard of it', 'No, but I want to try', 'Yes, I am a beginner', 'Yes, I do it professionally'],
      },
    ],
  },
  CommentSection: {
    title: '80 comments',
    sortBy: 'Sort by: Top',
    Comments: [
      {
        name: 'Kelly Stone',
        comment: 'is it true? 😱',
        likeWord: 'Like',
        likes: '54k',
        timeAgo: '1 hour ago',
      },
      {
        name: 'Wu Jin',
        comment: '🥇 TOP',
        likeWord: 'Like',
        likes: '22k',
        timeAgo: '4 hours ago',
      },
      {
        name: 'Jean Bellmore',
        comment: '@AJPuccino try this NOW',
        likeWord: 'Like',
        likes: '8k',
        timeAgo: '6 hours ago',
      },
      {
        name: 'AJ Puccino',
        comment: 'ahhah 😃 Cool',
        likeWord: 'Like',
        likes: '4k',
        timeAgo: '5 hours ago',
      },
      {
        name: 'Nathan Stork',
        comment: 'YEAH!!! 💰💰💰',
        likeWord: 'Like',
        likes: '28k',
        timeAgo: '11 hours ago',
      },
      {
        name: 'Milana Rassakowska',
        comment: 'Nice test, thanks',
        likeWord: 'Like',
        likes: '33k',
        timeAgo: '13 hours ago',
      },
      {
        name: 'Kurt Kelsey',
        comment: '🙈 🙈 🙈',
        likeWord: 'Like',
        likes: '31k',
        timeAgo: '11 hours ago',
      },
      {
        name: 'Omar Hashmi',
        comment: 'This is a miracle 🙏',
        likeWord: 'Like',
        likes: '39k',
        timeAgo: '15 hours ago',
      },
      {
        name: 'Andy Lane',
        comment: 'Thank you for description, now I know.....',
        likeWord: 'Like',
        likes: '45k',
        timeAgo: '13 hours ago',
      },
      {
        name: 'Sven Tilden',
        comment: 'Awesome. My wife got better scores than me. Should I quit my job now?...🤣',
        likeWord: 'Like',
        likes: '69k',
        timeAgo: '6 hours ago',
      },
      {
        name: 'Carrie Swanson',
        comment: 'My life has changed 😍 thanks to this!!! Internet, I love you',
        likeWord: 'Like',
        likes: '54k',
        timeAgo: '18 hours ago',
      },
      {
        name: 'Mike Lacey',
        comment: 'Was sceptical at the start, but then.....wow.',
        likeWord: 'Like',
        likes: '69k',
        timeAgo: '21 hours ago',
      },
      {
        name: 'Ni Chang',
        comment: 'Me too!!!',
        likeWord: 'Like',
        likes: '60k',
        timeAgo: '15 hours ago',
      },
    ],
    UserInput: {
      labelName: 'Name',
      labelComment: 'Comment',
      labelCheckBox: 'Select option',
      paragraph: 'Also post on social network',
      button: 'Comment',
    },
  },
  Assessment: {
    title: 'Will you make $5,000+ daily?',
    p1: 'Wait... Checking answers',
    p2: 'Wait... Counting your score',
  },
  Offer: {
    Title: 'Thank You!',
    result: {
      p1: 'Your Test Result: ',
      p2: 'excellent',
      p3: ' (35 out of 35)',
    },
    p1: {
      p1: 'You are an ideal person for making money online, you may have a chance to earn MUCH MORE THAN',
      p2: '$5,000',
      p3: ' daily!',
    },
    p2: {
      p1: 'We have selected for you ',
      p2: '4 offers',
      p3: ' for fast online money making.',
    },
    p3: 'Follow the instructions below and get your personal offer.',
    p4: {
      p1: 'In 40 seconds you will be redirected to the best (',
      p2: 'most profitable for you',
      p3: ') offer.',
    },
    p5: 'Click the GET OFFER button to go to the best offer immediately!',
    button: 'get offer',
  },
};
export default dictionary;

export type TFinanceDictionary = typeof dictionary;
export type TSurveyTexts = TFinanceDictionary['MainSection']['SurveyTexts'];
export type TCommentsTexts = TFinanceDictionary['CommentSection']['Comments'];
