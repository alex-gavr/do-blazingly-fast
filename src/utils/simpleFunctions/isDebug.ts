let debug = false;

if (typeof window !== 'undefined') {
  const debugParam = window ? new URLSearchParams(window.location.search).get('debug') : false;
  debug = debugParam ? true : false;
}

export default debug;
