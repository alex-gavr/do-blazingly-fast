import CountDown from '@i18n/countDown/tl';
import NotInterested from '@i18n/notInterested/tl';

const dictionary = {
  welcome: {
    title: 'I-unlock ang Eksklusibong Diskwento at Supercharge ang Iyong Savings!',
    paragraph: {
      start: 'Kumuha ng hanggang sa ',
      accent: '80%',
      end: ' off ang iyong susunod na pagbili mula sa mga nangungunang tatak ng e commerce sa pamamagitan ng pagkumpleto ng survey',
    },
    button: 'MAGSIMULA NA',
  },
  SurveyTexts: [
    {
      q: 'Ano po ang gender nyo',
      a: ['lalaki', 'babae'],
    },
    {
      q: 'Ilang taon ka na ba',
      a: ['sa ilalim ng 18', '18-30', '31-45', 'sa paglipas ng 45'],
    },
    {
      q: 'Gaano kadalas ka namimili online sa average?',
      a: ['Ilang beses sa isang linggo', 'Isang beses sa isang linggo', 'Isang beses sa isang buwan', 'One time sa ilang buwan'],
    },
    {
      q: 'Anong klaseng produkto ang karaniwang binibili mo',
      a: ['Kalusugan at Kagandahan', 'Mga produkto ng fashion', 'Mga gamit sa bahay', 'Mga Elektronikong Kagamitan'],
    },
    {
      q: 'Aling mga produkto ang pinaka-kasiya-siyang mamili?',
      a: [
        'mga produkto para sa aking living space',
        'na sumasalamin sa aking personal na estilo',
        'personal na pag aalaga o pag aayos',
        'na simplify ang daily routine ko',
      ],
    },
    {
      q: 'Aling mga produkto ang mas nangangailangan ng pansin o pagpapabuti?',
      a: ['nakakapinsala sa kapaligiran', 'hindi na napapanahon o hindi komportable', 'may mga panganib sa kaligtasan', 'masyadong mahal'],
    },
  ],
  thankYou: {
    title: 'Salamat!',
    paragraph: 'Ang iyong personalized na deal ay nasa ibaba',
    button: 'KUMUHA NG ALOK',
  },
  privacy: {
    text1: 'Hindi namin iniimbak o ibinabahagi sa iyo ang pribadong impormasyon sa sinuman.',
    text2: 'Ginagamit ito upang magbigay sa iyo ng pinakamahusay na personal na pakikitungo',
  },
  commentSection: {
    title: 'Pinakabagong mga nanalo!',
    shoppingReviews: [
      {
        id: 1,
        title: 'Hindi makapaniwala sa deal',
        text: 'Nakumpleto ko ang isang survey at ginantimpalaan ako ng espesyal na alok! Ang karanasan ay isang paalala ng kahalagahan ng pagbabahagi ng aking mga saloobin at opinyon, dahil maaari itong humantong sa hindi inaasahang mga benepisyo. Nagpapasalamat ako sa pagkakataong makatanggap ng isang espesyal na pakikitungo, at ang karanasan ay nagbigay inspirasyon sa akin na patuloy na lumahok sa mga survey.',
        likes: 10,
        rating: 5,
        personImage: '/img/shopping/reviewers/female101.webp',
        personName: 'Rini Sari',
        winImages: ['/img/shopping/wins/female1.webp'],
      },
      {
        id: 2,
        title: 'Isang Rewarding Experience',
        text: 'Nakumpleto ko ang isang survey at natuwa ako na makatanggap ng isang espesyal na pakikitungo. Ang karanasan ay kapaki-pakinabang, at masarap malaman na mahalaga ang aking mga opinyon. Ang diskwento sa produkto ay isang bonus, at nagpapasalamat ako para sa pagkakataon na makatipid ng pera habang natutuklasan ang isang bagong bagay.',
        likes: 14,
        rating: 5,
        personImage: '/img/shopping/reviewers/female.webp',
        personName: 'Elizabeth Taylor',
        winImages: ['/img/shopping/wins/female2.webp'],
      },
      {
        id: 3,
        title: 'Sorpresang Pag iipon',
        text: 'Ang sorpresang pagtitipid sa produkto ay isang kagiliw giliw na karanasan, at ginawa nito sa akin na pahalagahan ang mga maliliit na bagay sa buhay. Ang karanasan ay nagturo sa akin na panatilihin ang isang bukas na isip at upang yakapin ang mga bagong pagkakataon.',
        likes: 6,
        rating: 5,
        personImage: '/img/shopping/reviewers/female102.webp',
        personName: 'Retno Wulandari',
        winImages: ['/img/shopping/wins/female3.webp'],
      },
      {
        id: 4,
        title: 'Wow!',
        text: 'Ito ay talagang gumagana, subukan ito sa iyong sarili',
        likes: 8,
        rating: 5,
        personImage: '/img/shopping/reviewers/female103.webp',
        personName: 'Dewi Lestari',
        winImages: ['/img/shopping/wins/female4.webp'],
      },
      {
        id: 5,
        title: 'Hindi inaasahang Mga Diskwento',
        text: 'Nakumpleto ko ang isang survey at masaya akong nagulat na makatanggap ng espesyal na diskwento. Ang hindi inaasahang mga diskwento sa produkto ay gumawa ng karanasan kahit na mas kasiya siya, at itinuro nito sa akin ang halaga ng pagkuha ng isang pagkakataon sa isang bagong bagay.',
        likes: 6,
        rating: 5,
        personImage: '/img/shopping/reviewers/male.webp',
        personName: 'Budi Susanto',
        winImages: ['/img/shopping/wins/male1.webp'],
      },
      {
        id: 6,
        title: 'Hindi inaasahang Mga Diskwento',
        text: 'Ang pagkakataon na makatipid ng pera sa produkto pagkatapos makumpleto ang survey ay isang malugod na sorpresa, at ipinaalala nito sa akin na ang mga magagandang bagay ay maaaring mangyari kapag naglaan kami ng oras upang ibahagi ang aming mga saloobin at opinyon. Salamat sa survey team para sa pagkakataong makatipid at subukan ang bago.',
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
