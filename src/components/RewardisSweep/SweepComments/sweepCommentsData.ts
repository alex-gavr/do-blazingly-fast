import { randomIntFromInterval } from '@utils/simpleFunctions/randomIntFromInterval';

export interface IComment {
  id: number;
  name: string;
  text: string;
  date: string;
  avatar: string;
  likes: number;
}

export const sweepComments: IComment[] = [
  {
    avatar: '/img/sweep-rewardis/users/person-sweep-1.webp',
    name: 'Maria Farela',
    text: 'Is it possible to play again? :)',
  },
  {
    avatar: '/img/sweep-rewardis/users/person-sweep-2.webp',
    name: 'Fred Hedbeek',
    text: 'I had heard about it!',
  },
  {
    avatar: '/img/sweep-rewardis/users/person-sweep-3.webp',
    name: 'Patricia Kincey',
    text: 'Thank you so much!',
  },
  {
    avatar: '/img/sweep-rewardis/users/person-sweep-4.webp',
    name: 'Miguel Sanchez',
    text: 'All the gifts are empty!!!',
  },
  {
    avatar: '/img/sweep-rewardis/users/person-sweep-5.webp',
    name: 'Mitchell Snyder',
    text: 'Yeah!',
  },
  {
    avatar: '/img/sweep-rewardis/users/person-sweep-6.webp',
    name: 'Judy Robin',
    text: 'You must carefully follow all the instructions.',
  },
  {
    avatar: '/img/sweep-rewardis/users/person-sweep-7.webp',
    name: 'Matthew Helme',
    text: "I've never won anything before...",
  },
  {
    avatar: '/img/sweep-rewardis/users/person-sweep-8.webp',
    name: 'Davidson Bazil',
    text: 'I LOST :(',
  },
  {
    avatar: '/img/sweep-rewardis/users/person-sweep-9.webp',
    name: 'Scott Michalczyk',
    text: "I had already seen this game last year but I had ignored it because I thought it was nonsense. I'm going to try again!",
  },
  {
    avatar: '/img/sweep-rewardis/users/person-sweep-10.webp',
    name: 'Layelle Johnson',
    text: 'Thank you so much, its just amazing!!! This is the best!!!',
  },
  {
    avatar: '/img/sweep-rewardis/users/person-sweep-11.webp',
    name: 'Christopher Gibbs',
    text: 'What is on the next page?',
  },
  {
    avatar: '/img/sweep-rewardis/users/person-sweep-12.webp',
    name: 'Pamela Hills',
    text: 'Oh, am I the only one who lost? :( :(',
  },
  {
    avatar: '/img/sweep-rewardis/users/person-sweep-13.webp',
    name: 'Paul Wesley',
    text: 'Is it true?',
  },
  {
    avatar: '/img/sweep-rewardis/users/person-sweep-14.webp',
    name: 'Mandy Brooke',
    text: "You're incredible! Thank you for doing this!",
  },
  {
    avatar: '/img/sweep-rewardis/users/person-sweep-15.webp',
    name: 'George Brown',
    text: 'Thank you! Thank you!',
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
