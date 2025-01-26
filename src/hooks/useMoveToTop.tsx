const useMoveToTop = () => {
  const moveToTopOfPage = () => {
    // Make it scroll to the top of the page slowly.
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return moveToTopOfPage;
};

export default useMoveToTop;
