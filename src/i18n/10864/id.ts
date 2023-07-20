import CountDown from '@i18n/countDown/id';
import NotInterested from '@i18n/notInterested/id';

const dictionary = {
  welcome: {
    title: 'Buka Diskon Eksklusif dan Tingkatkan Tabungan Anda!',
    paragraph: {
      start: 'Dapatkan diskon hingga ',
      accent: '80%',
      end: ' untuk pembelian berikutnya dari merek e-commerce teratas dengan menyelesaikan survei',
    },
    button: 'MULAI',
  },
  SurveyTexts: [
    {
      q: 'Apa jenis kelamin Anda?',
      a: ['laki-laki', 'perempuan'],
    },
    {
      q: 'Berapa umurmu?',
      a: ['di bawah 18 tahun', '18-30', '31-45', 'lebih dari 45'],
    },
    {
      q: 'Seberapa sering Anda berbelanja online rata-rata?',
      a: ['Beberapa kali seminggu', 'Satu kali seminggu', 'Satu kali sebulan', 'Satu kali dalam beberapa bulan'],
    },
    {
      q: 'Produk apa yang biasanya Anda beli?',
      a: ['Kesehatan & Kecantikan', 'Produk fashion', 'Barang rumah tangga', 'Perangkat Elektronik'],
    },
    {
      q: 'Produk apa yang paling menyenangkan untuk dibeli?',
      a: [
        'Produk untuk Ruang Hidup Saya',
        'yang mencerminkan gaya pribadi saya',
        'perawatan pribadi atau perawatan',
        'yang menyederhanakan rutinitas harian saya',
      ],
    },
    {
      q: 'Produk mana yang membutuhkan lebih banyak perhatian atau peningkatan?',
      a: ['berbahaya bagi lingkungan', 'Usang atau tidak nyaman', 'dengan risiko keamanan', 'terlalu mahal'],
    },
  ],
  thankYou: {
    title: 'Terima Kasih!',
    paragraph: 'Penawaran personal Anda ada di bawah ini',
    button: 'DAPATKAN PENAWARAN',
  },
  privacy: {
    text1: 'Kami tidak menyimpan atau membagikan informasi pribadi Anda kepada siapa pun.',
    text2: 'Informasi tersebut digunakan untuk memberikan penawaran personal terbaik untuk Anda',
  },
  commentSection: {
    title: 'Pemenang terbaru!',
    shoppingReviews: [
      {
        id: 1,
        title: 'Tidak Bisa Percaya dengan Penawaran Ini',
        text: 'Saya menyelesaikan survei dan mendapatkan penawaran khusus! Pengalaman ini mengingatkan saya tentang pentingnya berbagi pemikiran dan pendapat, karena dapat membawa manfaat yang tidak terduga. Saya bersyukur atas kesempatan untuk mendapatkan penawaran khusus, dan pengalaman ini menginspirasi saya untuk terus berpartisipasi dalam survei.',
        likes: 10,
        rating: 5,
        personImage: '/img/shopping/reviewers/female101.webp',
        personName: 'Rini Sari',
        winImages: ['/img/shopping/wins/female1.webp'],
      },
      {
        id: 2,
        title: 'Pengalaman yang Memuaskan',
        text: 'Saya menyelesaikan survei dan senang mendapatkan penawaran khusus. Pengalaman tersebut sangat memuaskan, dan terasa baik untuk mengetahui bahwa pendapat saya berarti. Diskon pada produk tersebut menjadi bonus, dan saya bersyukur atas kesempatan untuk menghemat uang sambil menemukan sesuatu yang baru.',
        likes: 14,
        rating: 5,
        personImage: '/img/shopping/reviewers/female.webp',
        personName: 'Elizabeth Taylor',
        winImages: ['/img/shopping/wins/female2.webp'],
      },
      {
        id: 3,
        title: 'Diskon yang Mengejutkan',
        text: 'Diskon yang diberikan pada produk tersebut adalah pengalaman yang menyenangkan, dan membuat saya menghargai hal-hal kecil dalam hidup. Pengalaman ini mengajarkan saya untuk tetap terbuka dan merangkul kesempatan-kesempatan baru.',
        likes: 6,
        rating: 5,
        personImage: '/img/shopping/reviewers/female102.webp',
        personName: 'Retno Wulandari',
        winImages: ['/img/shopping/wins/female3.webp'],
      },
      {
        id: 4,
        title: 'Wow!',
        text: 'Ini benar-benar berhasil, coba sendiri',
        likes: 8,
        rating: 5,
        personImage: '/img/shopping/reviewers/female103.webp',
        personName: 'Dewi Lestari',
        winImages: ['/img/shopping/wins/female4.webp'],
      },
      {
        id: 5,
        title: 'Diskon yang Tidak Terduga',
        text: 'Saya menyelesaikan survei dan terkejut menyadari bahwa saya mendapatkan diskon khusus. Diskon yang tidak terduga pada produk membuat pengalaman tersebut lebih menyenangkan, dan mengajarkan saya tentang nilai dari mengambil kesempatan pada sesuatu yang baru.',
        likes: 6,
        rating: 5,
        personImage: '/img/shopping/reviewers/male.webp',
        personName: 'Budi Susanto',
        winImages: ['/img/shopping/wins/male1.webp'],
      },
      {
        id: 6,
        title: 'Diskon yang Tidak Terduga',
        text: 'Kesempatan untuk menghemat uang pada produk setelah menyelesaikan survei adalah kejutan yang menyenangkan, dan mengingatkan saya bahwa hal-hal baik dapat terjadi ketika kita meluangkan waktu untuk berbagi pemikiran dan pendapat. Terima kasih kepada tim survei atas kesempatan untuk menghemat uang dan mencoba sesuatu yang baru.',
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
