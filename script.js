/* =========================================================
   IELTS MASTER — script.js (全功能数据分离版)
   ========================================================= */

/* ---------- 1. 翻译字典 ---------- */
const translations = {
  en: {
    home: "Home", courses: "Courses", reading: "Reading", listening: "Listening",
    intensive: "Intensive", writing: "Writing", speaking: "Speaking", login: "Login",
    tagline: "WELCOME TO IELTS MASTER", welcomeTitle: 'Welcome Back, <span>Learner!</span>', description: "Every day is a new opportunity to improve your English.",
    targetLabel: "YOUR TARGET SCORE", targetHint: "Keep working towards your goal!", progressTitle: "My Learning Progress", moduleTitle: "Choose Your Learning Module", moduleSubtitle: "Pick a skill to practise today",
    skillReadingDesc: "Reading comprehension & question types", skillListeningDesc: "Listening comprehension & audio practice", skillWritingDesc: "Task 1 & Task 2 writing practice", skillSpeakingDesc: "Speaking fluency & topic practice",
    startPractice: "Start Practice →", mockTitle: "Ready for the IELTS Exam?", mockDesc: "Test your skills with a practice examination.", startMock: "Start Mock Test →",
    academicTagline: "IELTS ACADEMIC TRAINING", lessonReadingDesc: "Improve your reading comprehension and vocabulary.", lessonListeningDesc: "Develop your listening skills and understand spoken English.", lessonWritingDesc: "Develop your academic writing skills.", lessonSpeakingDesc: "Build confidence and improve your spoken English.",
    chooseTest: "Choose a Practice Test", chooseTestDesc: "Time yourself under real exam conditions.", timerStart: "Start", timerPause: "Pause", timerResume: "Resume", timerReset: "Reset", timerBack: "Change Test", timerDone: "Time's up!",
    courseTitle: "Popular Courses", courseDesc: "Curated top-rated free IELTS courses from Bilibili to help you break through.", courseSearchPlaceholder: "Search courses or teachers...", tabAll: "All", noResults: "No courses found. Try another keyword.",
    intensiveTitle: "Intensive Listening Practice", intensiveDesc: "Play the audio and type what you hear. We'll check word by word!", intensiveListenWrite: "Dictation Area", intensiveCheck: "Check Dictation", intensiveShow: "Show Transcript", intensiveHide: "Hide Transcript", intensiveOriginal: "Original Text:"
  },
  zh: {
    home: "首页", courses: "名师好课", reading: "阅读", listening: "听力", intensive: "精听", writing: "写作", speaking: "口语", login: "登录",
    tagline: "欢迎来到 IELTS MASTER", welcomeTitle: '欢迎回来，<span>学习者！</span>', description: "每一天都是提升英语的新机会。",
    targetLabel: "目标分数", targetHint: "继续朝目标努力！", progressTitle: "我的学习进度", moduleTitle: "选择学习模块", moduleSubtitle: "选择你今天想练习的雅思科目",
    skillReadingDesc: "阅读理解与题型训练", skillListeningDesc: "听力理解与音频练习", skillWritingDesc: "Task 1 与 Task 2 写作训练", skillSpeakingDesc: "口语表达与话题练习",
    startPractice: "开始练习 →", mockTitle: "准备好参加雅思考试了吗？", mockDesc: "通过一次模拟考试检验你的水平。", startMock: "开始模拟考试 →",
    academicTagline: "雅思学术类训练", lessonReadingDesc: "提升阅读理解与词汇量。", lessonListeningDesc: "培养听力技能，听懂英语口语。", lessonWritingDesc: "提升学术写作能力。", lessonSpeakingDesc: "建立自信，提升口语表达。",
    chooseTest: "选择练习测试", chooseTestDesc: "在真实考试环境下计时练习。", timerStart: "开始", timerPause: "暂停", timerResume: "继续", timerReset: "重置", timerBack: "换一个测试", timerDone: "时间到！",
    courseTitle: "B站名师好课", courseDesc: "精选B站高播放量、好口碑的雅思免费课程，帮你快速突破瓶颈。", courseSearchPlaceholder: "搜索课程、老师（如：王陆、口语）...", tabAll: "全部", noResults: "没有找到相关课程，换个关键词试试吧~",
    intensiveTitle: "精听听写练习", intensiveDesc: "播放下方音频，将你听到的内容写下来。系统会逐词帮你核对！", intensiveListenWrite: "听写区域", intensiveCheck: "检查听写", intensiveShow: "显示原文", intensiveHide: "隐藏原文", intensiveOriginal: "原文："
  }
};

let currentLanguage = localStorage.getItem("ieltsLanguage") || "en";

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
}

/* ---------- 2. 页面渲染与交卷逻辑 (从 data.js 读取数据) ---------- */
function renderReading() {
  const container = document.getElementById("readingContent");
  // 如果当前页面没有这个容器，或者 data.js 没有加载，直接退出
  if (!container || typeof readingData === "undefined") return;
  
  let html = `
    <div class="lesson-card" style="margin-bottom: 30px;">
      <h2>${readingData.title}</h2>
      <p style="white-space: pre-wrap; line-height: 1.8;">${readingData.text}</p>
    </div>
    <div class="lesson-card">
      <h3>Questions</h3>
  `;

  readingData.questions.forEach(q => {
    html += `<div style="margin-bottom: 25px;"><p style="font-weight: bold; margin-bottom: 10px;">${q.q}</p>`;
    Object.keys(q.options).forEach(key => {
      html += `
        <label class="answer-option">
          <input type="radio" name="read_${q.id}" value="${key}">
          ${q.options[key]}
        </label>
      `;
    });
    html += `</div>`;
  });

  html += `
      <button type="button" class="primary-btn" onclick="submitReading()">交卷 / Submit</button>
      <p id="readingResult" style="font-size: 20px; font-weight: bold; margin-top: 15px;"></p>
    </div>
  `;
  container.innerHTML = html;
}

function submitReading() {
  const resultEl = document.getElementById("readingResult");
  if (!resultEl || typeof readingData === "undefined") return;
  
  let score = 0;
  let unanswered = false;

  readingData.questions.forEach(q => {
    const selected = document.querySelector(`input[name="read_${q.id}"]:checked`);
    if (!selected) { unanswered = true; return; }
    if (selected.value === q.answer) score++;
  });

  if (unanswered) {
    resultEl.textContent = currentLanguage === "zh" ? "请完成所有题目后再交卷！" : "Please answer all questions!";
    resultEl.style.color = "#B8860B";
    return;
  }

  resultEl.textContent = currentLanguage === "zh" ? `得分：${score} / ${readingData.questions.length}` : `Score: ${score} / ${readingData.questions.length}`;
  resultEl.style.color = score === readingData.questions.length ? "green" : "#D93025";
}

function renderListening() {
  const container = document.getElementById("listeningContent");
  if (!container || typeof listeningData === "undefined") return;

  let html = `<div class="lesson-card"><h2>${listeningData.title}</h2>`;
  
  if (listeningData.audioUrl) {
    html += `<audio controls style="width:100%; margin-bottom: 20px;"><source src="${listeningData.audioUrl}" type="audio/mpeg"></audio>`;
  } else {
    html += `<div class="audio-placeholder"><span>🎧</span><h3>Listening Audio</h3><p>音频暂未上传</p></div>`;
  }

  listeningData.questions.forEach(q => {
    html += `<div style="margin-bottom: 25px;"><p style="font-weight: bold; margin-bottom: 10px;">${q.q}</p>`;
    if (q.type === "text") {
      html += `<input type="text" class="essay-input" style="min-height:auto; padding: 10px;" placeholder="Type your answer here...">`;
    } else {
      Object.keys(q.options).forEach(key => {
        html += `<label class="answer-option"><input type="radio" name="listen_${q.id}" value="${key}">${q.options[key]}</label>`;
      });
    }
    html += `</div>`;
  });

  html += `<button type="button" class="primary-btn" onclick="submitListening()">交卷 / Submit</button><p id="listeningResult" style="font-size: 20px; font-weight: bold; margin-top: 15px;"></p></div>`;
  container.innerHTML = html;
}

function submitListening() {
  const resultEl = document.getElementById("listeningResult");
  if (!resultEl) return;
  resultEl.textContent = currentLanguage === "zh" ? "交卷成功！(演示版仅判客观题)" : "Submitted successfully!";
  resultEl.style.color = "green";
}

/* ---------- 3. 模考倒计时逻辑 ---------- */
function setupMockTest() {
  const urlParams = new URLSearchParams(window.location.search);
  const isMock = urlParams.get('mode') === 'mock';
  const subject = urlParams.get('subject');

  if (isMock && subject) {
    const timerBar = document.createElement("div");
    timerBar.id = "mockTimerBar";
    timerBar.style.cssText = "position: fixed; top: 0; left: 0; width: 100%; background: #D93025; color: white; text-align: center; padding: 15px; font-size: 24px; font-weight: bold; z-index: 9999; font-family: monospace;";
    document.body.prepend(timerBar);
    document.body.style.paddingTop = "60px";

    let timeLeft = subject === 'reading' ? 60 * 60 : 40 * 60;
    const timerInterval = setInterval(() => {
      timeLeft--;
      const m = String(Math.floor(timeLeft / 60)).padStart(2, "0");
      const s = String(timeLeft % 60).padStart(2, "0");
      timerBar.textContent = `⏳ 模考剩余时间: ${m}:${s}`;
      if (timeLeft <= 0) {
        clearInterval(timerInterval);
        alert("时间到！系统已自动交卷。");
        if (subject === 'reading') submitReading();
        if (subject === 'listening') submitListening();
        setTimeout(() => window.location.href = "mock-test.html", 2000);
      }
    }, 1000);
  }
}

/* ---------- 4. 写作逻辑 ---------- */
const TARGET_WORDS = 250;
function countWords() {
  const essay = document.getElementById("essay"); const counter = document.getElementById("wordCount");
  if (!essay || !counter) return;
  const text = essay.value.trim(); const count = text ? text.split(/\s+/).length : 0;
  counter.textContent = count;
  const hint = document.getElementById("wordHint");
  if (hint) {
    const rem = TARGET_WORDS - count;
    if (rem <= 0) { hint.textContent = "✓ 已达到最低字数"; hint.classList.add("ok"); }
    else { hint.textContent = currentLanguage === "zh" ? `还差 ${rem} 词` : `(${rem} more)`; hint.classList.remove("ok"); }
  }
}
function saveEssay() {
  const essay = document.getElementById("essay"); const msg = document.getElementById("essayMessage");
  if (!essay) return; localStorage.setItem("ieltsWritingDraft", essay.value);
  if (msg) { msg.textContent = "草稿已保存！"; msg.style.color = "green"; setTimeout(() => msg.textContent = "", 3000); }
}

/* ---------- 5. 精听逻辑 ---------- */
const dictationOriginalText = "Manchester is a really interesting city. It's got a lot of history. It's famous for its music scene and its football teams. There are lots of museums and art galleries. The people are very friendly. I really enjoy living there.";
function checkDictation() {
  const input = document.getElementById("dictationInput").value.trim();
  const res = document.getElementById("dictationResult"); if (!res) return;
  const orig = dictationOriginalText.toLowerCase().replace(/[.,?!]/g, "").split(/\s+/).filter(w=>w);
  const usr = input.toLowerCase().replace(/[.,?!]/g, "").split(/\s+/).filter(w=>w);
  let html = "", correct = 0;
  for (let i = 0; i < Math.max(orig.length, usr.length); i++) {
    if (orig[i] === usr[i]) { html += `<span class="word-correct">${orig[i]}</span> `; correct++; }
    else if (!usr[i]) html += `<span class="word-missing">${orig[i]}</span> `;
    else html += `<span class="word-wrong">${usr[i]}</span> `;
  }
  const acc = orig.length ? Math.round((correct / orig.length) * 100) : 0;
  res.innerHTML = `<h3 style="color: ${acc>=80?'#2E8B57':'#D93025'}">准确率：${acc}%</h3><div>${html}</div>`;
  res.style.display = "block";
}
function toggleTranscript() {
  const box = document.getElementById("transcriptContainer"); const text = document.getElementById("transcriptText"); const btn = document.getElementById("transcriptBtn");
  if (!box || !text) return;
  if (box.style.display === "none") { text.textContent = dictationOriginalText; box.style.display = "block"; btn.textContent = "隐藏原文"; }
  else { box.style.display = "none"; btn.textContent = "显示原文"; }
}

/* ---------- 6. 夜间模式 ---------- */
function setupDarkMode() {
  const langBtn = document.getElementById("languageBtn"); if (!langBtn) return;
  const darkBtn = document.createElement("button"); darkBtn.id = "darkModeBtn";
  darkBtn.style.cssText = "padding: 8px 18px; border: 1px solid #2674C8; background: white; color: #2674C8; border-radius: 8px; cursor: pointer; margin-left: 10px;";
  langBtn.parentNode.insertBefore(darkBtn, langBtn);
  const isDark = localStorage.getItem("ieltsDarkMode") === "true";
  if (isDark) { document.body.classList.add("dark-mode"); darkBtn.textContent = "☀️"; darkBtn.style.background = "#333"; darkBtn.style.color = "white"; } else { darkBtn.textContent = "🌙"; }
  darkBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    const nowDark = document.body.classList.contains("dark-mode");
    localStorage.setItem("ieltsDarkMode", nowDark);
    darkBtn.textContent = nowDark ? "☀️" : "🌙";
    darkBtn.style.background = nowDark ? "#333" : "white"; darkBtn.style.color = nowDark ? "white" : "#2674C8";
  });
}

/* ---------- 7. 全站初始化 ---------- */
document.addEventListener("DOMContentLoaded", () => {
  applyLanguage();
  const langBtn = document.getElementById("languageBtn");
  if (langBtn) langBtn.addEventListener("click", toggleLanguage);
  
  // 渲染题目
  renderReading();
  renderListening();
  
  // 初始化写作、模考和主题
  const essay = document.getElementById("essay");
  if (essay) {
    const saved = localStorage.getItem("ieltsWritingDraft");
    if (saved) { essay.value = saved; countWords(); }
    essay.addEventListener("input", () => { countWords(); setTimeout(() => localStorage.setItem("ieltsWritingDraft", essay.value), 800); });
  }
  
  setupMockTest();
  setupDarkMode();
});