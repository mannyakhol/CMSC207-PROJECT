export const getRandomItem = (array) => array[Math.floor(Math.random() * array.length)];

export const getRandomFact = (facts) => {
  const allFacts = [...facts.personal, ...facts.fun];
  return getRandomItem(allFacts);
};

// Smooth scrolling
export const initSmoothScroll = () => {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
          e.preventDefault();
          const target = document.querySelector(anchor.getAttribute('href'));
          if (target) {
              target.scrollIntoView({
                  behavior: 'smooth',
                  block: 'start'
              });
          }
      });
  });
};
