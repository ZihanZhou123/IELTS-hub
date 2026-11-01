/* =========================================================
   IELTS MASTER — script.js (全功能最终版)
   ========================================================= */

/* ---------- 1. 翻译字典 ---------- */
const translations = {
  en: {
    home: "Home", courses: "Courses", reading: "Reading", listening: "Listening",
    intensive: "Intensive", writing: "Writing", speaking: "Speaking", login: "Login",
    tagline: "WELCOME TO IELTS MASTER",
    welcomeTitle: 'Welcome Back, <span>Learner!</span>',
    description: "Every day is a new opportunity to improve your English.",
    targetLabel: "YOUR TARGET SCORE",
    targetHint: "Keep working towards your goal!",
    progressTitle: "My Learning Progress",
    moduleTitle: "Choose Your Learning Module",
    moduleSubtitle: "Pick a skill to practise today",
    skillReadingDesc: "Reading comprehension & question types",
    skillListeningDesc: "Listening comprehension & audio practice",
    skillWritingDesc: "Task 1 & Task 2 writing practice",
    skillSpeakingDesc: "Speaking fluency & topic practice",
    startPractice: "Start Practice →",
    mockTitle: "Ready for the IELTS Exam?",
    mockDesc: "Test your skills with a practice examination.",
    startMock: "Start Mock Test →",
    academicTagline: "IELTS ACADEMIC TRAINING",
    lessonReadingDesc: "Improve your reading comprehension and vocabulary.",
    lessonListeningDesc: "Develop your listening skills and understand spoken English.",
    lessonWritingDesc: "Develop your academic writing skills.",
    lessonSpeakingDesc: "Build confidence and improve your spoken English.",
    chooseTest: "Choose a Practice Test",
    chooseTestDesc: "Time yourself under real exam conditions.",
    timerStart: "Start", timerPause: "Pause", timerResume: "Resume",
    timerReset: "Reset", timerBack: "Change Test", timerDone: "Time's up!",
    courseTitle: "Popular Courses",
    courseDesc: "Curated top-rated free IELTS courses from Bilibili to help you break through.",
    courseSearchPlaceholder: "Search courses or teachers...",
    tabAll: "All",
    noResults: "No courses found. Try another keyword.",
    intensiveTitle: "Intensive Listening Practice",
    intensiveDesc: "Play the audio and type what you hear. We'll check word by word!",
    intensiveListenWrite: "Dictation Area",
    intensiveCheck: "Check Dictation",
    intensiveShow: "Show Transcript",
    intensiveHide: "Hide Transcript",
    intensiveOriginal: "Original Text:"
  },
  zh: {
    home: "首页", courses: "名师好课", reading: "阅读", listening: "听力",
    intensive: "精听", writing: "写作", speaking: "口语", login: "登录",
    tagline: "欢迎来到 IELTS MASTER",
    welcomeTitle: '欢迎回来，<span>学习者！</span>',
    description: "每一天都是提升英语的新机会。",
    targetLabel: "目标分数",
    targetHint: "继续朝目标努力！",
    progressTitle: "我的学习进度",
    moduleTitle: "选择学习模块",
    moduleSubtitle: "选择你今天想练习的雅思科目",
    skillReadingDesc: "阅读理解与题型训练",
    skillListeningDesc: "听力理解与音频练习",
    skillWritingDesc: "Task 1 与 Task 2 写作训练",
    skillSpeakingDesc: "口语表达与话题练习",
    startPractice: "开始练习 →",
    mockTitle: "准备好参加雅思考试了吗？",
    mockDesc: "通过一次模拟考试检验你的水平。",
    startMock: "开始模拟考试 →",
    academicTagline: "雅思学术类训练",
    lessonReadingDesc: "提升阅读理解与词汇量。",
    lessonListeningDesc: "培养听力技能，听懂英语口语。",
    lessonWritingDesc: "提升学术写作能力。",
    lessonSpeakingDesc: "建立自信，提升口语表达。",
    chooseTest: "选择练习测试",
    chooseTestDesc: "在真实考试环境下计时练习。",
    timerStart: "开始", timerPause: "暂停", timerResume: "继续",
    timerReset: "重置", timerBack: "换一个测试", timerDone: "时间到！",
    courseTitle: "B站名师好课",
    courseDesc: "精选B站高播放量、好口碑的雅思免费课程，帮你快速突破瓶颈。",
    courseSearchPlaceholder: "搜索课程、老师（如：王陆、口语）...",
    tabAll: "全部",
    noResults: "没有找到相关课程，换个关键词试试吧~",
    intensiveTitle: "精听听写练习",
    intensiveDesc: "播放下方音频，将你听到的内容写下来。系统会逐词帮你核对！",
    intensiveListenWrite: "听写区域",
    intensiveCheck: "检查听写",
    intensiveShow: "显示原文",
    intensiveHide: "隐藏原文",
    intensiveOriginal: "原文："
  }
};

let currentLanguage = localStorage.getItem("ieltsLanguage") || "en";

/* ---------- 2. i18n 核心 ---------- */
function applyLanguage() {
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const val = translations[currentLanguage][el.dataset.i18n];
    if (val != null) el.textContent = val;
  });
  document.querySelectorAll("[data-i18n-html]").forEach(el => {
    const val = translations[currentLanguage][el.dataset.i18nHtml];
    if (val != null) el.innerHTML = val;
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
    const val = translations[currentLanguage][el.dataset.i18nPlaceholder];
    if (val != null) el.placeholder = val;
  });
  document.documentElement.lang = currentLanguage === "zh" ? "zh-CN" : "en";
  const btn = document.getElementById("languageBtn");
  if (btn) btn.textContent = currentLanguage === "en" ? "中文" : "English";
}

function toggleLanguage() {
  currentLanguage = currentLanguage === "en" ? "zh" : "en";
  localStorage.setItem("ieltsLanguage", currentLanguage);
  applyLanguage();
  if (typeof renderCourses === "function") renderCourses();
}

/* ---------- 3. 答题逻辑 ---------- */
function checkReadingAnswer() {
  const selected = document.querySelector('input[name="readingAnswer"]:checked');
  const result = document.getElementById("readingResult");
  if (!result) return;
  if (!selected) {
    result.textContent = currentLanguage === "zh" ? "请先选择一个答案。" : "Please select an answer first.";
    result.style.color = "#B8860B"; return;
  }
  const correct = "B";
  if (selected.value === correct) {
    result.textContent = currentLanguage === "zh" ? "正确！做得很好！" : "Correct! Well done!";
    result.style.color = "green";
  } else {
    result.textContent = currentLanguage === "zh" ? `错误，正确答案是 ${correct}。` : `Incorrect. The correct answer is ${correct}.`;
    result.style.color = "red";
  }
}

function checkListeningAnswer() {
  const selected = document.querySelector('input[name="listeningAnswer"]:checked');
  const result = document.getElementById("listeningResult");
  if (!result) return;
  if (!selected) {
    result.textContent = currentLanguage === "zh" ? "请先选择一个答案。" : "Please select an answer first.";
    result.style.color = "#B8860B"; return;
  }
  const correct = "A";
  if (selected.value === correct) {
    result.textContent = currentLanguage === "zh" ? "正确！做得很好！" : "Correct! Well done!";
    result.style.color = "green";
  } else {
    result.textContent = currentLanguage === "zh" ? `错误，正确答案是 ${correct}。` : `Incorrect. The correct answer is ${correct}.`;
    result.style.color = "red";
  }
}

/* ---------- 4. 写作逻辑 ---------- */
const TARGET_WORDS = 250;
function countWords() {
  const essay = document.getElementById("essay");
  const counter = document.getElementById("wordCount");
  if (!essay || !counter) return;
  const text = essay.value.trim();
  const count = text ? text.split(/\s+/).length : 0;
  counter.textContent = count;
  const hint = document.getElementById("wordHint");
  if (hint) {
    const remaining = TARGET_WORDS - count;
    if (remaining <= 0) {
      hint.textContent = currentLanguage === "zh" ? "✓ 已达到最低字数" : "✓ Minimum reached";
      hint.classList.add("ok");
    } else {
      hint.textContent = currentLanguage === "zh" ? `还差 ${remaining} 词` : `(${remaining} more to go)`;
      hint.classList.remove("ok");
    }
  }
}

function saveEssay() {
  const essay = document.getElementById("essay");
  const message = document.getElementById("essayMessage");
  if (!essay) return;
  localStorage.setItem("ieltsWritingDraft", essay.value);
  if (message) {
    message.textContent = currentLanguage === "zh" ? "草稿已保存！" : "Your draft has been saved!";
    message.style.color = "green";
    setTimeout(() => { message.textContent = ""; }, 3000);
  }
}

/* ---------- 5. Mock Test 计时器 ---------- */
let mockTimerId = null, mockRemaining = 0, mockTotal = 0, mockRunning = false;
function formatTime(sec) {
  const m = Math.floor(sec / 60), s = sec % 60;
  return String(m).padStart(2, "0") + ":" + String(s).padStart(2, "0");
}
function updateTimerDisplay() {
  const el = document.getElementById("timerDisplay");
  if (!el) return;
  el.textContent = formatTime(mockRemaining);
  el.classList.toggle("warning", mockRemaining <= 300 && mockRemaining > 0);
}
function toggleTimer() {
  const btn = document.getElementById("timerStartPause");
  const msg = document.getElementById("timerMessage");
  if (mockRunning) {
    clearInterval(mockTimerId); mockTimerId = null; mockRunning = false;
    if (btn) btn.textContent = translations[currentLanguage].timerResume;
    return;
  }
  if (mockRemaining <= 0) return;
  mockRunning = true;
  if (btn) btn.textContent = translations[currentLanguage].timerPause;
  mockTimerId = setInterval(() => {
    mockRemaining--;
    updateTimerDisplay();
    if (mockRemaining <= 0) {
      clearInterval(mockTimerId); mockTimerId = null; mockRunning = false;
      if (btn) btn.textContent = translations[currentLanguage].timerStart;
      if (msg) { msg.textContent = translations[currentLanguage].timerDone; msg.style.color = "#D93025"; }
    }
  }, 1000);
}
function resetTimer() {
  clearInterval(mockTimerId); mockTimerId = null; mockRunning = false;
  mockRemaining = mockTotal; updateTimerDisplay();
  const btn = document.getElementById("timerStartPause");
  if (btn) btn.textContent = translations[currentLanguage].timerStart;
  const msg = document.getElementById("timerMessage");
  if (msg) msg.textContent = "";
}
function setupMockTest() {
  const selectSection = document.getElementById("mockSelect");
  const timerSection = document.getElementById("mockTimer");
  if (!selectSection || !timerSection) return;
  document.querySelectorAll(".mock-option").forEach(btn => {
    btn.addEventListener("click", () => {
      mockTotal = parseInt(btn.dataset.minutes, 10) * 60;
      mockRemaining = mockTotal; mockRunning = false;
      clearInterval(mockTimerId); mockTimerId = null;
      const title = document.getElementById("timerTitle");
      if (title) title.textContent = btn.dataset.name + " Test";
      updateTimerDisplay();
      const msg = document.getElementById("timerMessage");
      if (msg) msg.textContent = "";
      const startBtn = document.getElementById("timerStartPause");
      if (startBtn) startBtn.textContent = translations[currentLanguage].timerStart;
      selectSection.style.display = "none";
      timerSection.style.display = "block";
    });
  });
  const startBtn = document.getElementById("timerStartPause");
  if (startBtn) startBtn.addEventListener("click", toggleTimer);
  const resetBtn = document.getElementById("timerReset");
  if (resetBtn) resetBtn.addEventListener("click", resetTimer);
  const backBtn = document.getElementById("timerBack");
  if (backBtn) {
    backBtn.addEventListener("click", () => {
      clearInterval(mockTimerId); mockTimerId = null; mockRunning = false;
      timerSection.style.display = "none";
      selectSection.style.display = "block";
    });
  }
}

/* ---------- 6. 课程聚合页面逻辑 ---------- */
const courseData = [
  { id: 1, title: "雅思听力王陆807词汇精讲（完整版）", teacher: "王陆", category: "listening", views: "125.6万", duration: "45:20", url: "https://search.bilibili.com/all?keyword=王陆雅思听力", color: "#FF7B54" },
  { id: 2, title: "雅思听力地图题专项突破技巧", teacher: "何琼", category: "listening", views: "42.1万", duration: "25:10", url: "https://search.bilibili.com/all?keyword=何琼雅思听力", color: "#F5A623" },
  { id: 3, title: "张涛听力：同义词替换核心考点", teacher: "张涛", category: "listening", views: "68.5万", duration: "1:05:00", url: "https://search.bilibili.com/all?keyword=张涛雅思听力", color: "#E67E22" },
  { id: 4, title: "剑桥雅思真题听力精讲（C14-C17）", teacher: "剑桥官方", category: "listening", views: "98.2万", duration: "2:15:30", url: "https://search.bilibili.com/all?keyword=剑桥雅思听力真题精讲", color: "#D35400" },
  { id: 5, title: "杨帅口语：900句高频地道表达跟读", teacher: "杨帅", category: "speaking", views: "210.3万", duration: "30:15", url: "https://search.bilibili.com/all?keyword=杨帅雅思口语", color: "#50E3C2" },
  { id: 6, title: "雅思哥：当季口语题库Part 1&2全解析", teacher: "雅思哥", category: "speaking", views: "350.1万", duration: "1:20:00", url: "https://search.bilibili.com/all?keyword=雅思哥口语题库", color: "#1ABC9C" },
  { id: 7, title: "帅付口语：Part 3 逻辑拓展训练", teacher: "帅付", category: "speaking", views: "78.4万", duration: "40:50", url: "https://search.bilibili.com/all?keyword=帅付雅思口语", color: "#16A085" },
  { id: 8, title: "刘洪波阅读真经：平行阅读法速成", teacher: "刘洪波", category: "reading", views: "156.8万", duration: "55:40", url: "https://search.bilibili.com/all?keyword=刘洪波雅思阅读", color: "#9013FE" },
  { id: 9, title: "郭佳阅读：判断题（T/F/NG）终极破局", teacher: "郭佳", category: "reading", views: "88.6万", duration: "35:20", url: "https://search.bilibili.com/all?keyword=郭佳雅思阅读", color: "#8E44AD" },
  { id: 10, title: "剑桥雅思阅读真题带练（保姆级解析）", teacher: "剑桥官方", category: "reading", views: "115.3万", duration: "1:45:00", url: "https://search.bilibili.com/all?keyword=剑桥雅思阅读真题", color: "#9B59B6" },
  { id: 11, title: "Simon考官亲授：雅思写作Task 2高分逻辑", teacher: "Simon", category: "writing", views: "89.2万", duration: "1:12:05", url: "https://search.bilibili.com/all?keyword=Simon雅思写作", color: "#4A90E2" },
  { id: 12, title: "顾家北手把手教你雅思写作（词伙篇）", teacher: "顾家北", category: "writing", views: "198.5万", duration: "1:30:10", url: "https://search.bilibili.com/all?keyword=顾家北雅思写作", color: "#3498DB" },
  { id: 13, title: "慎小嶷：十天突破雅思写作（大作文框架）", teacher: "慎小嶷", category: "writing", views: "120.4万", duration: "50:00", url: "https://search.bilibili.com/all?keyword=慎小嶷雅思写作", color: "#2980B9" },
  { id: 14, title: "雅思写作小作文（图表题）核心句型速成", teacher: "Vince", category: "writing", views: "65.8万", duration: "45:15", url: "https://search.bilibili.com/all?keyword=Vince雅思写作", color: "#5DADE2" },
  { id: 15, title: "雅思词汇真经：核心3500词带背", teacher: "刘洪波", category: "reading", views: "300.5万", duration: "2:00:00", url: "https://search.bilibili.com/all?keyword=雅思词汇真经", color: "#2ECC71" }
];

let currentFilter = "all";
let currentSearch = "";

function renderCourses() {
  const grid = document.getElementById("courseGrid");
  const noResults = document.getElementById("noResults");
  if (!grid) return;

  const filtered = courseData.filter(course => {
    const matchTab = currentFilter === "all" || course.category === currentFilter;
    const keyword = currentSearch.toLowerCase();
    const matchSearch = course.title.toLowerCase().includes(keyword) || course.teacher.toLowerCase().includes(keyword);
    return matchTab && matchSearch;
  });

  grid.innerHTML = filtered.map(course => `
    <a href="${course.url}" target="_blank" rel="noopener noreferrer" class="course-card">
      <div class="course-cover" style="background: ${course.color}">
        <span class="play-icon">▶</span>
        <span class="course-duration">${course.duration}</span>
      </div>
      <div class="course-info">
        <h3 class="course-title">${course.title}</h3>
        <div class="course-meta">
          <span class="course-teacher">👨‍🏫 ${course.teacher}</span>
          <span class="course-views">▶ ${course.views}</span>
        </div>
        <span class="course-tag">B站免费</span>
      </div>
    </a>
  `).join("");

  if (noResults) {
    noResults.style.display = filtered.length === 0 ? "block" : "none";
    noResults.textContent = translations[currentLanguage].noResults;
  }
}

function setupCourses() {
  const searchInput = document.getElementById("courseSearch");
  const tabs = document.querySelectorAll(".tab-btn");
  const grid = document.getElementById("courseGrid");
  if (!grid) return;

  renderCourses();

  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      currentSearch = e.target.value.trim();
      renderCourses();
    });
  }

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      currentFilter = tab.dataset.filter;
      renderCourses();
    });
  });
}

/* ---------- 7. 夜间模式 ---------- */
function setupDarkMode() {
  const header = document.querySelector("header");
  const langBtn = document.getElementById("languageBtn");
  if (!header || !langBtn) return;

  const darkBtn = document.createElement("button");
  darkBtn.id = "darkModeBtn";
  darkBtn.type = "button";
  darkBtn.style.cssText = "padding: 8px 18px; border: 1px solid #2674C8; background: white; color: #2674C8; border-radius: 8px; cursor: pointer; font-size: 14px; font-family: inherit; transition: 0.2s; margin-left: 10px;";
  
  if (langBtn.parentNode) {
    langBtn.parentNode.insertBefore(darkBtn, langBtn);
  }

  const isDark = localStorage.getItem("ieltsDarkMode") === "true";
  if (isDark) {
    document.body.classList.add("dark-mode");
    darkBtn.textContent = "☀️";
    darkBtn.style.background = "#333";
    darkBtn.style.color = "white";
    darkBtn.style.borderColor = "#555";
  } else {
    darkBtn.textContent = "🌙";
  }

  darkBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    const nowDark = document.body.classList.contains("dark-mode");
    localStorage.setItem("ieltsDarkMode", nowDark);

    if (nowDark) {
      darkBtn.textContent = "☀️";
      darkBtn.style.background = "#333";
      darkBtn.style.color = "white";
      darkBtn.style.borderColor = "#555";
    } else {
      darkBtn.textContent = "🌙";
      darkBtn.style.background = "white";
      darkBtn.style.color = "#2674C8";
      darkBtn.style.borderColor = "#2674C8";
    }
  });
}

/* ---------- 8. 精听练习逻辑 ---------- */
// 👇 这里已经替换为你提供的 ELLLO 音频的真实原文
const dictationOriginalText = "Manchester is a really interesting city. It's got a lot of history. It's famous for its music scene and its football teams. There are lots of museums and art galleries. The people are very friendly. I really enjoy living there.";

function checkDictation() {
  const input = document.getElementById("dictationInput").value.trim();
  const resultContainer = document.getElementById("dictationResult");
  if (!resultContainer) return;

  const cleanOriginal = dictationOriginalText.toLowerCase().replace(/[.,?!]/g, "");
  const cleanInput = input.toLowerCase().replace(/[.,?!]/g, "");

  const originalWords = cleanOriginal.split(/\s+/).filter(w => w);
  const userWords = cleanInput.split(/\s+/).filter(w => w);

  let html = "";
  let correctCount = 0;
  const maxLength = Math.max(originalWords.length, userWords.length);

  for (let i = 0; i < maxLength; i++) {
    const originalW = originalWords[i];
    const userW = userWords[i];

    if (originalW === userW) {
      html += `<span class="word-correct">${originalW}</span> `;
      correctCount++;
    } else if (!userW) {
      html += `<span class="word-missing">${originalW}</span> `;
    } else {
      html += `<span class="word-wrong">${userW}</span> `;
    }
  }

  const accuracy = originalWords.length > 0 ? Math.round((correctCount / originalWords.length) * 100) : 0;
  
  resultContainer.innerHTML = `
    <h3 style="color: ${accuracy >= 80 ? '#2E8B57' : '#D93025'}; margin-bottom: 15px;">
      准确率：${accuracy}% (${correctCount}/${originalWords.length} 词)
    </h3>
    <div class="word-diff">${html}</div>
  `;
  resultContainer.style.display = "block";

  const transcriptBox = document.getElementById("transcriptContainer");
  if (transcriptBox && transcriptBox.style.display === "block") {
    document.getElementById("transcriptText").textContent = dictationOriginalText;
  }
}

function toggleTranscript() {
  const container = document.getElementById("transcriptContainer");
  const textEl = document.getElementById("transcriptText");
  const btn = document.getElementById("transcriptBtn");
  if (!container || !textEl || !btn) return;

  if (container.style.display === "none" || container.style.display === "") {
    textEl.textContent = dictationOriginalText;
    container.style.display = "block";
    btn.textContent = translations[currentLanguage].intensiveHide;
  } else {
    container.style.display = "none";
    btn.textContent = translations[currentLanguage].intensiveShow;
  }
}

/* ---------- 9. 自动注入导航栏（作为双重保险） ---------- */
function autoInjectNav() {
  const nav = document.querySelector("nav[aria-label='Main navigation']");
  if (!nav) return;
  if (nav.querySelector('a[data-i18n="intensive"]')) return; // 已有则跳过

  const listeningLink = nav.querySelector('a[data-i18n="listening"]');
  if (!listeningLink) return;

  const intensiveLink = document.createElement("a");
  const isSubpage = window.location.pathname.includes("/pages/");
  intensiveLink.href = isSubpage ? "intensive-listening.html" : "pages/intensive-listening.html";
  intensiveLink.setAttribute("data-i18n", "intensive");
  intensiveLink.textContent = translations[currentLanguage].intensive;

  listeningLink.parentNode.insertBefore(intensiveLink, listeningLink.nextSibling);
}

/* ---------- 10. 全站初始化 ---------- */
document.addEventListener("DOMContentLoaded", () => {
  autoInjectNav();
  applyLanguage();

  const langBtn = document.getElementById("languageBtn");
  if (langBtn) langBtn.addEventListener("click", toggleLanguage);

  const essay = document.getElementById("essay");
  if (essay) {
    const saved = localStorage.getItem("ieltsWritingDraft");
    if (saved) { essay.value = saved; countWords(); }
    let timer;
    essay.addEventListener("input", () => {
      countWords();
      const message = document.getElementById("essayMessage");
      if (message) message.textContent = "";
      clearTimeout(timer);
      timer = setTimeout(() => { localStorage.setItem("ieltsWritingDraft", essay.value); }, 800);
    });
  }

  setupMockTest();
  setupCourses();
  setupDarkMode();
});