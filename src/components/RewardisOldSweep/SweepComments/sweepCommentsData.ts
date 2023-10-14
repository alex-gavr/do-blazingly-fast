import { randomIntFromInterval } from '@utils/simpleFunctions/randomIntFromInterval';

export interface IComment {
  id: number;
  name: string;
  text: string;
  date: string;
  avatar: string;
  likes: number;
  relativeTime: string;
}

export const sweepComments: IComment[] = [
  {
    avatar: '/img/sweep-rewardis/users/person-sweep-1.webp',
    name: 'Maria Farela',
    text: 'Is it possible to play again? :)',
    relativeTime: 'just now',
  },
  {
    avatar: '/img/sweep-rewardis/users/person-sweep-2.webp',
    name: 'Fred Hedbeek',
    text: 'I had heard about it!',
    relativeTime: '17 minutes ago',
  },
  {
    avatar: '/img/sweep-rewardis/users/person-sweep-3.webp',
    name: 'Patricia Kincey',
    text: 'Thank you so much!',
    relativeTime: '23 minutes ago',
  },
  {
    avatar: '/img/sweep-rewardis/users/person-sweep-4.webp',
    name: 'Miguel Sanchez',
    text: 'All the gifts are empty!!!',
    relativeTime: '30 minutes ago',
  },
  {
    avatar: '/img/sweep-rewardis/users/person-sweep-5.webp',
    name: 'Mitchell Snyder',
    text: 'Yeah!',
    relativeTime: '39 minutes ago',
  },
  {
    avatar: '/img/sweep-rewardis/users/person-sweep-6.webp',
    name: 'Judy Robin',
    text: 'You must carefully follow all the instructions.',
    relativeTime: '47 minutes ago',
  },
  {
    avatar: '/img/sweep-rewardis/users/person-sweep-7.webp',
    name: 'Matthew Helme',
    text: "I've never won anything before...",
    relativeTime: '59 minutes ago',
  },
  {
    avatar: '/img/sweep-rewardis/users/person-sweep-8.webp',
    name: 'Davidson Bazil',
    text: 'I LOST :(',
    relativeTime: '1 hour ago',
  },
  {
    avatar: '/img/sweep-rewardis/users/person-sweep-9.webp',
    name: 'Scott Michalczyk',
    text: "I had already seen this game last year but I had ignored it because I thought it was nonsense. I'm going to try again!",
    relativeTime: '1 hour ago',
  },
  {
    avatar: '/img/sweep-rewardis/users/person-sweep-10.webp',
    name: 'Layelle Johnson',
    text: 'Thank you so much, its just amazing!!! This is the best!!!',
    relativeTime: '1 hour ago',
  },
  {
    avatar: '/img/sweep-rewardis/users/person-sweep-11.webp',
    name: 'Christopher Gibbs',
    text: 'What is on the next page?',
    relativeTime: '1 hour ago',
  },
  {
    avatar: '/img/sweep-rewardis/users/person-sweep-12.webp',
    name: 'Pamela Hills',
    text: 'Oh, am I the only one who lost? :( :(',
    relativeTime: '1 hour ago',
  },
  {
    avatar: '/img/sweep-rewardis/users/person-sweep-13.webp',
    name: 'Paul Wesley',
    text: 'Is it true?',
    relativeTime: '2 hours ago',
  },
  {
    avatar: '/img/sweep-rewardis/users/person-sweep-14.webp',
    name: 'Mandy Brooke',
    text: "You're incredible! Thank you for doing this!",
    relativeTime: '2 hours ago',
  },
  {
    avatar: '/img/sweep-rewardis/users/person-sweep-15.webp',
    name: 'George Brown',
    text: 'Thank you! Thank you!',
    relativeTime: '2 hours ago',
  },
  {
    avatar: '/img/sweep-rewardis/users/person-sweep-16.webp',
    name: 'Angelo Rodriguez',
    text: 'Is this a joke?',
    relativeTime: '3 hours ago',
  },
].map((comment, index) => {
  return {
    ...comment,
    date: generateTimeArrayWithRandomInterval(3)[index],
    id: index,
    likes: randomIntFromInterval(0, 5),
  };
});

function generateTimeArrayWithRandomInterval(forLastHours = 3): string[] {
  let result: string[] = [];
  let now = new Date();
  let endTime = new Date(now.getTime() - forLastHours * 60 * 60 * 1000);

  while (now > endTime) {
    let hours = now.getHours().toString().padStart(2, '0');
    let minutes = now.getMinutes().toString().padStart(2, '0');
    result.unshift(`${hours}:${minutes}`);

    let randomInterval = randomIntFromInterval(1, 15);
    now = new Date(now.getTime() - randomInterval * 60 * 1000);
  }

  result.reverse();

  return result;
}
