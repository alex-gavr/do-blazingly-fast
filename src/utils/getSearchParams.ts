const getPrevParams = () => {
  if (typeof window !== 'undefined') {
    return window.location.search;
  } else {
    throw new Error('you cannot use this function on backend');
  }
};

export default getPrevParams;
