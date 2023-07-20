import CountDown from '@i18n/countDown/fr';
import NotInterested from '@i18n/notInterested/fr';

const dictionary = {
  welcome: {
    title: 'Débloquez des réductions exclusives et boostez vos économies !',
    paragraph: {
      start: 'Obtenez jusqu’à ',
      accent: '80%',
      end: ' de réduction sur votre prochain achat auprès des meilleures marques de commerce électronique en répondant à un sondage',
    },
    button: 'COMMENCER',
  },
  SurveyTexts: [
    {
      q: 'Quel est votre sexe?',
      a: ['mâle', 'femelle'],
    },
    {
      q: 'Quel âge avez-vous?',
      a: ['moins de 18 ans', '18-30', '31-45', 'plus de 45 ans'],
    },
    {
      q: 'À quelle fréquence magasinez-vous en ligne en moyenne?',
      a: ['Plusieurs fois par semaine', 'Une fois par semaine', 'Une fois par mois', 'Une fois en plusieurs mois'],
    },
    {
      q: 'Quel genre de produits achetez-vous habituellement?',
      a: ['Santé & Beauté', 'Produits de mode', 'Articles ménagers', 'Appareils électroniques'],
    },
    {
      q: 'Quels produits sont les plus agréables à acheter?',
      a: [
        'Produits pour mon espace de vie',
        'qui reflètent mon style personnel',
        'Soins personnels ou toilettage',
        'qui simplifient ma routine quotidienne',
      ],
    },
    {
      q: 'Quels produits ont besoin de plus d’attention ou d’amélioration?',
      a: ['nocif pour l’environnement', 'désuète ou gênante', 'présentant des risques pour la sécurité', 'trop cher'],
    },
  ],
  thankYou: {
    title: 'Merci!',
    paragraph: 'Votre offre personnalisée est ci-dessous',
    button: 'OBTENIR UNE OFFRE',
  },
  privacy: {
    text1: 'Nous ne stockons ni ne partageons vos informations privées avec quiconque.',
    text2: 'Il est utilisé pour vous fournir la meilleure offre personnelle',
  },
  commentSection: {
    title: 'Derniers gagnants!',
    shoppingReviews: [
      {
        id: 1,
        title: 'Je ne pouvais pas croire l’accord',
        text: 'J’ai répondu à un sondage et j’ai été récompensé par une offre spéciale! L’expérience m’a rappelé l’importance de partager mes pensées et mes opinions, car cela peut entraîner des avantages inattendus. Je suis reconnaissant d’avoir l’occasion de recevoir une offre spéciale, et l’expérience m’a inspiré à continuer à participer à des sondages.',
        likes: 10,
        rating: 5,
        personImage: '/img/shopping/reviewers/female101.webp',
        personName: 'Rini Sari',
        winImages: ['/img/shopping/wins/female1.webp'],
      },
      {
        id: 2,
        title: 'Une expérience enrichissante',
        text: 'J’ai répondu à un sondage et j’ai été ravi de recevoir une offre spéciale. L’expérience a été enrichissante et cela m’a fait du bien de savoir que mes opinions comptaient. La réduction sur le produit était un bonus, et je suis reconnaissant de l’opportunité d’économiser de l’argent tout en découvrant quelque chose de nouveau.',
        likes: 14,
        rating: 5,
        personImage: '/img/shopping/reviewers/female.webp',
        personName: 'Elizabeth Taylor',
        winImages: ['/img/shopping/wins/female2.webp'],
      },
      {
        id: 3,
        title: 'Économies surprises',
        text: 'Les économies surprises sur le produit ont été une expérience délicieuse, et cela m’a fait apprécier les petites choses de la vie. L’expérience m’a appris à garder l’esprit ouvert et à saisir de nouvelles opportunités.',
        likes: 6,
        rating: 5,
        personImage: '/img/shopping/reviewers/female102.webp',
        personName: 'Retno Wulandari',
        winImages: ['/img/shopping/wins/female3.webp'],
      },
      {
        id: 4,
        title: 'Pleurage!',
        text: 'Cela fonctionne réellement, essayez-le vous-même',
        likes: 8,
        rating: 5,
        personImage: '/img/shopping/reviewers/female103.webp',
        personName: 'Dewi Lestari',
        winImages: ['/img/shopping/wins/female4.webp'],
      },
      {
        id: 5,
        title: 'Remises inattendues',
        text: 'J’ai répondu à un sondage et j’ai été agréablement surpris de recevoir un rabais spécial. Les rabais inattendus sur le produit ont rendu l’expérience encore plus agréable, et cela m’a appris la valeur de tenter ma chance sur quelque chose de nouveau.',
        likes: 6,
        rating: 5,
        personImage: '/img/shopping/reviewers/male.webp',
        personName: 'Budi Susanto',
        winImages: ['/img/shopping/wins/male1.webp'],
      },
      {
        id: 6,
        title: 'Remises inattendues',
        text: 'La possibilité d’économiser de l’argent sur le produit après avoir répondu au sondage a été une bonne surprise, et cela m’a rappelé que de bonnes choses peuvent arriver lorsque nous prenons le temps de partager nos pensées et nos opinions. Merci à l’équipe de sondage de m’avoir donné l’occasion d’économiser de l’argent et d’essayer quelque chose de nouveau.',
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
