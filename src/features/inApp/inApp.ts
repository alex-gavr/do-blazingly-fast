const BROWSER: { [key: string]: RegExp } = {
  messenger: /\bFB[\w_]+\/(Messenger|MESSENGER)/,
  facebook: /\bFB[\w_]+\//,
  twitter: /\bTwitter/i,
  line: /\bLine\//i,
  wechat: /\bMicroMessenger\//i,
  puffin: /\bPuffin/i,
  miui: /\bMiuiBrowser\//i,
  instagram: /\bInstagram/i,
  chrome: /\bCrMo\b|CriOS|Android.*Chrome\/[.0-9]* (Mobile)?/,
  safari: /Version.*Mobile.*Safari|Safari.*Mobile|MobileSafari/,
  ie: /IEMobile|MSIEMobile/,
  firefox: /fennec|firefox.*maemo|(Mobile|Tablet).*Firefox|Firefox.*Mobile|FxiOS/,
};

class InApp {
  ua: string;

  constructor(useragent: string) {
    this.ua = useragent;
  }

  get browser(): string {
    for (const [key, regex] of Object.entries(BROWSER)) {
      if (regex.test(this.ua)) {
        return key;
      }
    }
    return 'other';
  }

  get isMobile(): boolean {
    return /(iPad|iPhone|Android|Mobile)/i.test(this.ua) || false;
  }

  get isDesktop(): boolean {
    return !this.isMobile;
  }

  get isInApp(): boolean {
    const rules = ['WebView', '(iPhone|iPod|iPad)(?!.*Safari/)', 'Android.*(wv)'];
    const regex = new RegExp(`(${rules.join('|')})`, 'ig');
    return Boolean(this.ua.match(regex));
  }
}

export default InApp;
