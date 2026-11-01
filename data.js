/* ==========================================
   题库数据文件 (以后有新题就往这里加)
   ========================================== */

const readingData = {
  title: "Cambridge 10 - Test 1 - Passage 1: Stepwells",
  text: `During the 2011 tsunami in Japan, the residents of the small village of Fudai were saved by a massive sea wall. However, in India, a different kind of historical structure has been providing water and shelter for centuries: the stepwell. 
  
  A stepwell is exactly what it sounds like: a well or pool of water that can be reached by descending a set of steps. They are most common in western India, particularly in the state of Gujarat. 
  
  The earliest stepwells date from around 550 AD. However, they became more elaborate over time. Some stepwells were built as temples, and they included intricate carvings and sculptures.`,
  questions: [
    { 
      id: 1, 
      q: "1. What saved the village of Fudai during the 2011 tsunami?", 
      options: { A: "A. A stepwell", B: "B. A sea wall", C: "C. A temple" }, 
      answer: "B" 
    },
    { 
      id: 2, 
      q: "2. Where are stepwells most common?", 
      options: { A: "A. In eastern India", B: "B. In western India", C: "C. In Japan" }, 
      answer: "B" 
    },
    { 
      id: 3, 
      q: "3. When do the earliest stepwells date from?", 
      options: { A: "A. 550 AD", B: "B. 2011", C: "C. 1900" }, 
      answer: "A" 
    }
  ]
};

const listeningData = {
  title: "Cambridge 10 - Test 1 - Section 1: Self-Drive Tours",
  audioUrl: "", // 这里可以放真实的音频链接
  questions: [
    { id: 1, q: "1. What is the name of the tour company?", type: "text" },
    { id: 2, q: "2. How many days does the tour last?", options: { A: "A. 5 days", B: "B. 7 days", C: "C. 14 days" }, answer: "B" }
  ]
};