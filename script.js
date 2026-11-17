
let hearts = 5;
let score = 0;
let usedQuestions = [];
let currentQuestion = null;

function startGame() {
  const app = document.querySelector(".welcome");

  if (!app) return;

  hearts = 5;
  score = 0;
  usedQuestions = [];

  showQuestion();
}

function showQuestion() {
  const app = document.querySelector(".welcome");

  if (hearts <= 0) {
    app.innerHTML = `
      <h1>قلب‌هایت تمام شد 💔</h1>
      <p>امتیاز تو: ${score}</p>
      <p>کمی استراحت کن و دوباره تلاش کن!</p>
      <button onclick="startGame()">شروع دوباره</button>
    `;
    return;
  }

  const available = questions.filter(
    q => !usedQuestions.includes(q.id)
  );

  if (available.length === 0) {
    app.innerHTML = `
      <h1>تبریک! 🏆</h1>
      <p>تمام سؤال‌های فعلی را جواب دادی!</p>
      <p>امتیاز: ${score}</p>
      <button onclick="startGame()">بازی دوباره</button>
    `;
    return;
  }

  currentQuestion =
    available[Math.floor(Math.random() * available.length)];

  app.innerHTML = `
    <h2>LOVE QUEST ❤️</h2>
    <p>❤️ قلب‌ها: ${hearts}</p>
    <p>🏆 امتیاز: ${score}</p>
    <p>دسته: ${currentQuestion.category}</p>
    <h3>${currentQuestion.question}</h3>
    <input id="answer" placeholder="پاسخت را بنویس">
    <button onclick="checkAnswer()">ثبت پاسخ</button>
    <p id="message"></p>
  `;
}

function checkAnswer() {
  const input = document.getElementById("answer");
  const message = document.getElementById("message");

  if (!input.value.trim()) {
    message.textContent = "اول پاسخت را بنویس!";
    return;
  }

  const correct = currentQuestion.answer.trim();

  if (!correct || input.value.trim() === correct) {
    score++;
    usedQuestions.push(currentQuestion.id);
    message.textContent = "آفرین! پاسخ ثبت شد ❤️";
  } else {
    hearts--;
    usedQuestions.push(currentQuestion.id);
    message.textContent = "پاسخ درست نبود! یک قلب کم شد 💔";
  }

  setTimeout(showQuestion, 1200);
}
