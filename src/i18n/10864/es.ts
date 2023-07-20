import CountDown from '@i18n/countDown/es';
import NotInterested from '@i18n/notInterested/es';

const dictionary = {
  welcome: {
    title: '¡Desbloquea descuentos exclusivos y potencia tus ahorros!',
    paragraph: {
      start: 'Obtenga hasta un ',
      accent: '80%',
      end: ' de descuento en su próxima compra de las principales marcas de comercio electrónico completando la encuesta',
    },
    button: 'EMPEZAR',
  },
  SurveyTexts: [
    {
      q: '¿Cuál es tu género?',
      a: ['masculino', 'hembra'],
    },
    {
      q: '¿Cuántos años tienes?',
      a: ['menores de 18 años', '18-30', '31-45', 'más de 45'],
    },
    {
      q: '¿Con qué frecuencia compras en línea en promedio?',
      a: ['Varias veces a la semana', 'Una vez a la semana', 'Una vez al mes', 'Una vez en varios meses'],
    },
    {
      q: '¿Qué tipo de productos sueles comprar?',
      a: ['Salud y Belleza', 'Productos de moda', 'Artículos para el hogar', 'Dispositivos electrónicos'],
    },
    {
      q: '¿Qué productos es más agradable de comprar?',
      a: [
        'Productos para mi espacio vital',
        'que reflejan mi estilo personal',
        'Cuidado personal o aseo personal',
        'que simplifican mi rutina diaria',
      ],
    },
    {
      q: '¿Qué productos necesitan más atención o mejora?',
      a: ['Nocivo para el medio ambiente', 'anticuado o inconveniente', 'con riesgos de seguridad', 'demasiado caro'],
    },
  ],
  thankYou: {
    title: '¡Gracias!',
    paragraph: 'Tu oferta personalizada está a continuación',
    button: 'OBTENER OFERTA',
  },
  privacy: {
    text1: 'No almacenamos ni compartimos su información privada con nadie.',
    text2: 'Se utiliza para proporcionarle la mejor oferta personal',
  },
  commentSection: {
    title: '¡Últimos ganadores!',
    shoppingReviews: [
      {
        id: 1,
        title: 'No podía creer el trato',
        text: '¡Completé una encuesta y fui recompensado con una oferta especial! La experiencia fue un recordatorio de la importancia de compartir mis pensamientos y opiniones, ya que puede conducir a beneficios inesperados. Estoy agradecido por la oportunidad de recibir un trato especial, y la experiencia me ha inspirado a seguir participando en encuestas.',
        likes: 10,
        rating: 5,
        personImage: '/img/shopping/reviewers/female101.webp',
        personName: 'Rini Sari',
        winImages: ['/img/shopping/wins/female1.webp'],
      },
      {
        id: 2,
        title: 'Una experiencia gratificante',
        text: 'Completé una encuesta y estuve encantado de recibir un trato especial. La experiencia fue gratificante, y me sentí bien al saber que mis opiniones importaban. El descuento en el producto fue una ventaja, y estoy agradecido por la oportunidad de ahorrar dinero mientras descubro algo nuevo.',
        likes: 14,
        rating: 5,
        personImage: '/img/shopping/reviewers/female.webp',
        personName: 'Elizabeth Taylor',
        winImages: ['/img/shopping/wins/female2.webp'],
      },
      {
        id: 3,
        title: 'Ahorros sorpresa',
        text: 'El ahorro sorpresa en el producto fue una experiencia encantadora, y me hizo apreciar las pequeñas cosas de la vida. La experiencia me ha enseñado a mantener una mente abierta y a aprovechar nuevas oportunidades.',
        likes: 6,
        rating: 5,
        personImage: '/img/shopping/reviewers/female102.webp',
        personName: 'Retno Wulandari',
        winImages: ['/img/shopping/wins/female3.webp'],
      },
      {
        id: 4,
        title: '¡Uau!',
        text: 'Realmente funciona, pruébalo tú mismo',
        likes: 8,
        rating: 5,
        personImage: '/img/shopping/reviewers/female103.webp',
        personName: 'Dewi Lestari',
        winImages: ['/img/shopping/wins/female4.webp'],
      },
      {
        id: 5,
        title: 'Descuentos inesperados',
        text: 'Completé una encuesta y me sorprendió gratamente recibir un descuento especial. Los descuentos inesperados en el producto hicieron que la experiencia fuera aún más agradable, y me enseñó el valor de arriesgarme con algo nuevo.',
        likes: 6,
        rating: 5,
        personImage: '/img/shopping/reviewers/male.webp',
        personName: 'Budi Susanto',
        winImages: ['/img/shopping/wins/male1.webp'],
      },
      {
        id: 6,
        title: 'Descuentos inesperados',
        text: 'La oportunidad de ahorrar dinero en el producto después de completar la encuesta fue una sorpresa bienvenida, y me recordó que pueden suceder cosas buenas cuando nos tomamos el tiempo para compartir nuestros pensamientos y opiniones. Gracias al equipo de la encuesta por la oportunidad de ahorrar dinero y probar algo nuevo.',
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
