export const chunkArray = (arr: any[], chunkSize: number) => {
  const res = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
    const chunk = arr.slice(i, i + chunkSize);
    res.push(chunk);
  }
  return res;
};

export const shuffle = (array: any) => {
  const shuffleArray = [...array];
  let currentIndex: number = shuffleArray.length;
  let randomIndex: number = 0;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    if (
      currentIndex < shuffleArray.length &&
      randomIndex < shuffleArray.length
    ) {
      [shuffleArray[currentIndex], shuffleArray[randomIndex]] = [
        shuffleArray[randomIndex],
        shuffleArray[currentIndex],
      ];
    }
  }
  return array;
};
