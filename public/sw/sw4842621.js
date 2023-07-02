function getYmid() {
  try {
    return new URL(location.href).searchParams.get('ymid');
  } catch (e) {
    console.warn(e);
  }
  return null;
}
function getVar() {
  try {
    return new URL(location.href).searchParams.get('var');
  } catch (e) {
    console.warn(e);
  }
  return null;
}
function getVar3() {
  try {
    return new URL(location.href).searchParams.get('var_3');
  } catch (e) {
    console.warn(e);
  }
  return null;
}
function getVar4() {
  try {
    return new URL(location.href).searchParams.get('var_4');
  } catch (e) {
    console.warn(e);
  }
  return null;
}
function getAbtest() {
  try {
    return new URL(location.href).searchParams.get('ab2');
  } catch (e) {
    console.warn(e);
  }
  return null;
}
function getAbtestTTL() {
  try {
    return new URL(location.href).searchParams.get('ab2_ttl');
  } catch (e) {
    console.warn(e);
  }
  return null;
}
self.options = {
  domain: 'eechicha.com',
  resubscribeOnInstall: true,
  zoneId: 4842621,
  ymid: getYmid(),
  var: getVar(),
  var_3: getVar3(),
  var_4: getVar4(),
  ab2: getAbtest(),
  ab2_ttl: getAbtestTTL(),
};
self.lary = '';
self.importScripts('https://eechicha.com/pfe/current/sw.perm.check.min.js?r=sw');
