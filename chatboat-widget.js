const toggleBtn = document.getElementById('chatbot-toggle');
const overlay = document.getElementById('chatbot-overlay');
const closeBtn = document.getElementById('chatbot-close');

toggleBtn.addEventListener('click', () => {
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
});

closeBtn.addEventListener('click', closeChat);
overlay.addEventListener('click', (e) => {
  if (e.target === overlay) closeChat();
});

function closeChat() {
  overlay.classList.remove('open');
  document.body.style.overflow = '';
}
