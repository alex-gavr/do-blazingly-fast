const getSearchParams = () => {
  if (typeof window !== 'undefined') {
    return window.location.search;
  } else {
    throw new Error('window is undefined');
  }
};

export default getSearchParams;
