const pushMicroTagScript = ({ pushZone, callback }: { pushZone: number; callback?: () => void }) => {
  const $pushScript = document.createElement('script');
  const url = new URL(window.location.href);
  const ab2TTL = 60 * 60 * 24 * 60 * 1000; // 60 days in ms
  const urlS = url.searchParams.get('s');
  const urlZ = url.searchParams.get('z');
  const urlVar = url.searchParams.get('var');
  //   const urlVar4 = url.searchParams.get('var_4');
  const disablePush = url.searchParams.get('push') ? url.searchParams.get('push') : false;
  const abtest = url.searchParams.get('abtest');

  $pushScript.onload = (result: any) => {
    switch (result) {
      case 'onPermissionDefault':
        break;

      case 'onPermissionAllowed':
        if (callback && typeof callback === 'function') {
          callback();
        }

        break;

      case 'onPermissionDenied':
        break;

      case 'onAlreadySubscribed':
        if (callback && typeof callback === 'function') {
          callback();
        }

        break;

      case 'onNotificationUnsupported':
        break;

      default:
        break;
    }
  };

  if (pushZone && !disablePush) {
    $pushScript.src = `/pfe/current/micro.tag.min.js?z=${pushZone}&sw=/sw/sw${pushZone}.js&var=${urlZ}&var_3=${urlS}&ymid=${urlVar}&cdn=1&domain=laugoust.com&ab2_ttl=${ab2TTL}`;

    if (abtest) {
      $pushScript.src += `&ab2=${abtest}`;
    }

    document.head.appendChild($pushScript);
  }
};

export default pushMicroTagScript;
