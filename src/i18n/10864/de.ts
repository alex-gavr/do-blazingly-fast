import CountDown from '@i18n/countDown/de';
import NotInterested from '@i18n/notInterested/de';

const dictionary = {
  welcome: {
    title: 'Schalten Sie exklusive Rabatte frei und steigern Sie Ihre Ersparnisse!',
    paragraph: {
      start: 'Erhalten Sie bis zu ',
      accent: '80%',
      end: ' Rabatt auf Ihren nächsten Einkauf bei Top-E-Commerce-Marken, indem Sie an einer Umfrage teilnehmen',
    },
    button: 'ANFANGEN',
  },
  SurveyTexts: [
    {
      q: 'Welches Geschlecht haben Sie?',
      a: ['Männlich', 'Weiblich'],
    },
    {
      q: 'Wie alt sind Sie?',
      a: ['unter 18', '18-30', '31-45', 'über 45'],
    },
    {
      q: 'Wie oft kaufen Sie durchschnittlich online ein?',
      a: ['Mehrmals pro Woche', 'Einmal pro Woche', 'Einmal im Monat', 'Einmal in mehreren Monaten'],
    },
    {
      q: 'Welche Art von Produkten kaufen Sie normalerweise?',
      a: ['Gesundheit & Schönheit', 'Modeprodukte', 'Haushaltsartikel', 'Elektronische Geräte'],
    },
    {
      q: 'Welche Produkte macht am meisten Spaß beim Einkaufen?',
      a: [
        'Produkte für meinen Wohnraum',
        'die meinen persönlichen Stil widerspiegeln',
        'Körperpflege oder Körperpflege',
        'die meinen Alltag vereinfachen',
      ],
    },
    {
      q: 'Welche Produkte müssen mehr Aufmerksamkeit oder Verbesserung erhalten?',
      a: ['Umweltschädliche', 'veraltet oder unbequem', 'mit Sicherheitsrisiken', 'zu teuer'],
    },
  ],
  thankYou: {
    title: 'Vielen Dank!',
    paragraph: 'Ihr personalisiertes Angebot finden Sie unten',
    button: 'ANGEBOT EINHOLEN',
  },
  privacy: {
    text1: 'Wir speichern oder teilen Ihre privaten Informationen nicht mit Dritten.',
    text2: 'Es wird verwendet, um Ihnen das beste persönliche Angebot zu bieten',
  },
  commentSection: {
    title: 'Aktuelle Gewinner!',
    shoppingReviews: [
      {
        id: 1,
        title: 'Konnte den Deal nicht glauben',
        text: 'Ich habe an einer Umfrage teilgenommen und wurde mit einem Sonderangebot belohnt! Die Erfahrung war eine Erinnerung daran, wie wichtig es ist, meine Gedanken und Meinungen zu teilen, da dies zu unerwarteten Vorteilen führen kann. Ich bin dankbar für die Möglichkeit, ein Sonderangebot zu erhalten, und diese Erfahrung hat mich dazu inspiriert, weiterhin an Umfragen teilzunehmen.',
        likes: 10,
        rating: 5,
        personImage: '/img/shopping/reviewers/female101.webp',
        personName: 'Rini Sari',
        winImages: ['/img/shopping/wins/female1.webp'],
      },
      {
        id: 2,
        title: 'Eine lohnende Erfahrung',
        text: 'Ich habe an einer Umfrage teilgenommen und mich über ein Sonderangebot gefreut. Die Erfahrung war lohnend, und es fühlte sich gut an zu wissen, dass meine Meinung zählte. Der Rabatt auf das Produkt war ein Bonus, und ich bin dankbar für die Möglichkeit, Geld zu sparen und gleichzeitig etwas Neues zu entdecken.',
        likes: 14,
        rating: 5,
        personImage: '/img/shopping/reviewers/female.webp',
        personName: 'Elizabeth Taylor',
        winImages: ['/img/shopping/wins/female2.webp'],
      },
      {
        id: 3,
        title: 'Überraschende Einsparungen',
        text: 'Die überraschenden Einsparungen bei dem Produkt waren eine entzückende Erfahrung, und es hat mich dazu gebracht, die kleinen Dinge im Leben zu schätzen. Diese Erfahrung hat mich gelehrt, offen zu bleiben und neue Möglichkeiten anzunehmen.',
        likes: 6,
        rating: 5,
        personImage: '/img/shopping/reviewers/female102.webp',
        personName: 'Retno Wulandari',
        winImages: ['/img/shopping/wins/female3.webp'],
      },
      {
        id: 4,
        title: 'Beeindruckend!',
        text: 'Es funktioniert tatsächlich, probieren Sie es selbst aus',
        likes: 8,
        rating: 5,
        personImage: '/img/shopping/reviewers/female103.webp',
        personName: 'Dewi Lestari',
        winImages: ['/img/shopping/wins/female4.webp'],
      },
      {
        id: 5,
        title: 'Unerwartete Rabatte',
        text: 'Ich habe an einer Umfrage teilgenommen und war angenehm überrascht, einen Sonderrabatt zu erhalten. Die unerwarteten Rabatte auf das Produkt machten die Erfahrung noch angenehmer und lehrten mich, wie wertvoll es ist, etwas Neues zu wagen.',
        likes: 6,
        rating: 5,
        personImage: '/img/shopping/reviewers/male.webp',
        personName: 'Budi Susanto',
        winImages: ['/img/shopping/wins/male1.webp'],
      },
      {
        id: 6,
        title: 'Unerwartete Rabatte',
        text: 'Die Möglichkeit, nach Abschluss der Umfrage Geld für das Produkt zu sparen, war eine willkommene Überraschung und erinnerte mich daran, dass gute Dinge passieren können, wenn wir uns die Zeit nehmen, unsere Gedanken und Meinungen zu teilen. Vielen Dank an das Umfrageteam für die Möglichkeit, Geld zu sparen und etwas Neues auszuprobieren.',
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
