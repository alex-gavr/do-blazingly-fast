import CountDown from '@i18n/countDown/en';
import NotInterested from '@i18n/notInterested/en';

const dictionary = {
  welcome: {
    title: 'Unlock Exclusive Discounts and Supercharge Your Savings!',
    paragraph: {
      start: 'Get up to ',
      accent: '80%',
      end: ' off your next purchase from top e-commerce brands by completing survey',
    },
    button: 'BEGIN',
  },
  SurveyTexts: [
    {
      q: 'What is your gender?',
      a: ['male', 'female'],
    },
    {
      q: 'How old are you?',
      a: ['under 18', '18-30', '31-45', 'over 45'],
    },
    {
      q: 'How often do you shop online on average?',
      a: ['Several times a week', 'One time a week', 'One time a month', 'One time in several months'],
    },
    {
      q: 'What kind of products do you usually buy?',
      a: ['Health & Beauty', 'Fashion products', 'Household goods', 'Electronic Devices'],
    },
    {
      q: 'Which products is most enjoyable to shop for?',
      a: ['products for my living space', 'that reflect my personal style', 'personal care or grooming', 'that simplify my daily routine'],
    },
    {
      q: 'Which products needs more attention or improvement?',
      a: ['environmentally harmful', 'outdated or inconvenient', 'with safety risks', 'too expensive'],
    },
  ],
  thankYou: {
    title: 'Thank You!',
    paragraph: 'Your personalized deal is below',
    button: 'GET OFFER',
  },
  privacy: {
    text1: "We don't store or share you private information with anyone.",
    text2: "It's used to provide you the best personal deal",
  },
  commentSection: {
    title: 'Latest winners!',
    shoppingReviews: [
      {
        id: 1,
        title: "Couldn't Believe the Deal",
        text: 'I completed a survey and was rewarded with a special offer! The experience was a reminder of the importance of sharing my thoughts and opinions, as it can lead to unexpected benefits. I am grateful for the opportunity to receive a special deal, and the experience has inspired me to continue participating in surveys.',
        likes: 10,
        rating: 5,
        personImage: '/img/shopping/reviewers/female101.webp',
        personName: 'Rini Sari',
        winImages: ['/img/shopping/wins/female1.webp'],
      },
      {
        id: 2,
        title: 'A Rewarding Experience',
        text: 'I completed a survey and was delighted to receive a special deal. The experience was rewarding, and it felt good to know that my opinions mattered. The discount on the product was a bonus, and I am grateful for the opportunity to save money while discovering something new.',
        likes: 14,
        rating: 5,
        personImage: '/img/shopping/reviewers/female.webp',
        personName: 'Elizabeth Taylor',
        winImages: ['/img/shopping/wins/female2.webp'],
      },
      {
        id: 3,
        title: 'Surprise Savings',
        text: 'The surprise savings on the product was a delightful experience, and it made me appreciate the little things in life. The experience has taught me to keep an open mind and to embrace new opportunities.',
        likes: 6,
        rating: 5,
        personImage: '/img/shopping/reviewers/female102.webp',
        personName: 'Retno Wulandari',
        winImages: ['/img/shopping/wins/female3.webp'],
      },
      {
        id: 4,
        title: 'Wow!',
        text: 'It actually works, try it yourself',
        likes: 8,
        rating: 5,
        personImage: '/img/shopping/reviewers/female103.webp',
        personName: 'Dewi Lestari',
        winImages: ['/img/shopping/wins/female4.webp'],
      },
      {
        id: 5,
        title: 'Unexpected Discounts',
        text: 'I completed a survey and was pleasantly surprised to receive a special discount. The unexpected discounts on the product made the experience even more enjoyable, and it taught me the value of taking a chance on something new.',
        likes: 6,
        rating: 5,
        personImage: '/img/shopping/reviewers/male.webp',
        personName: 'Budi Susanto',
        winImages: ['/img/shopping/wins/male1.webp'],
      },
      {
        id: 6,
        title: 'Unexpected Discounts',
        text: 'The opportunity to save money on the product after completing the survey was a welcome surprise, and it reminded me that good things can happen when we take the time to share our thoughts and opinions. Thank you to the survey team for the opportunity to save money and try something new.',
        likes: 2,
        rating: 5,
        personImage: '/img/shopping/reviewers/male1.webp',
        personName: 'Adi Santoso',
        winImages: ['/img/shopping/wins/male2.webp'],
      },
    ],
  },
  countDown: CountDown,
  notInterested: NotInterested,
};
export default dictionary;

export type TShoppingSurveyDictionary = typeof dictionary;
