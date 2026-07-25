/* ============================================================
   1. FLOATING HEARTS BACKGROUND
   ============================================================ */
(function floatingHearts(){
  const field = document.getElementById('float-field');
  const symbols = ['💗','💕','✨','🌸','💫'];
  const COUNT = 22;
  for(let i=0;i<COUNT;i++){
    const el = document.createElement('span');
    el.className = 'floaty';
    el.textContent = symbols[Math.floor(Math.random()*symbols.length)];
    const left = Math.random()*100;
    const duration = 10 + Math.random()*14;
    const delay = Math.random()*14;
    const size = 0.9 + Math.random()*1.3;
    const drift = (Math.random()*140 - 70) + 'px';
    el.style.left = left + 'vw';
    el.style.fontSize = size + 'rem';
    el.style.animationDuration = duration + 's';
    el.style.animationDelay = '-' + delay + 's';
    el.style.setProperty('--drift', drift);
    field.appendChild(el);
  }
})();
 
/* ============================================================
   2. DAY / NIGHT TOGGLE
   ============================================================ */
const themeToggle = document.getElementById('themeToggle');
const modeLabel = document.getElementById('modeLabel');
themeToggle.addEventListener('click', () => {
  const isNight = document.body.classList.toggle('night');
  themeToggle.classList.toggle('on', isNight);
  themeToggle.querySelector('.knob').textContent = isNight ? '☀️' : '🌙';
  modeLabel.textContent = isNight ? 'Night 🌙' : 'Day ☀️';
});
 
/* ============================================================
   3. TYPING TAGLINE EFFECT
   ============================================================ */
(function typeEffect(){
  const line = document.getElementById('typeLine');
  const messages = [
    "kiss ko lovee, plss plss plss.",
    "prettyyy sooo muchh my lovee uyst",
    "code-dle na us loveloveee"
  ];
  let msgIndex = 0, charIndex = 0, deleting = false;
 
  function tick(){
    const current = messages[msgIndex];
    if(!deleting){
      charIndex++;
      line.textContent = current.slice(0, charIndex);
      if(charIndex === current.length){
        deleting = true;
        setTimeout(tick, 1600);
        return;
      }
    } else {
      charIndex--;
      line.textContent = current.slice(0, charIndex);
      if(charIndex === 0){
        deleting = false;
        msgIndex = (msgIndex + 1) % messages.length;
      }
    }
    setTimeout(tick, deleting ? 40 : 65);
  }
  tick();
})();
 
/* ============================================================
   4. SCROLL REVEAL ANIMATIONS
   ============================================================ */
(function scrollReveal(){
  const items = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('in');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  items.forEach(item => observer.observe(item));
})();
 
/* ============================================================
   5. RUNAWAY "NO" BUTTON + CUTE RESPONSE
   ============================================================ */
(function cuteButtons(){
  const yesBtn = document.getElementById('yesBtn');
  const noBtn = document.getElementById('noBtn');
  const row = document.querySelector('.btn-row');
  const response = document.getElementById('cute-response');
  const yesReplies = ["Alam ko na 'yan lovee eh 💗", "'Yan gan'yan, tama ya'n love 😌", "I LOVEE YOUU TOO LOVEE!!! 😘"];
 
  noBtn.addEventListener('mouseenter', () => {
    const rowRect = row.getBoundingClientRect();
    const btnRect = noBtn.getBoundingClientRect();
    const maxX = rowRect.width - btnRect.width - 10;
    const maxY = 40;
    const x = Math.random() * maxX - (btnRect.left - rowRect.left) + 10;
    const y = (Math.random() * maxY) - (maxY/2);
    noBtn.style.position = 'relative';
    noBtn.style.transition = 'transform .28s ease';
    noBtn.style.transform = `translate(${x}px, ${y}px)`;
  });
  noBtn.addEventListener('click', (e) => e.preventDefault());
 
  yesBtn.addEventListener('click', () => {
    response.textContent = yesReplies[Math.floor(Math.random()*yesReplies.length)];
    response.classList.add('show');
  });
})();
 
/* ============================================================
   6. SECRET MESSAGE TOGGLE
   ============================================================ */
const secretToggle = document.getElementById('secretToggle');
const secretBox = document.getElementById('secretBox');
secretToggle.addEventListener('click', () => {
  const isOpen = secretBox.classList.toggle('open');
  secretToggle.classList.toggle('on', isOpen);
});
 
/* ============================================================
   7. AVATAR + GALLERY PHOTO UPLOADS (paste any photo you like)
   ============================================================ */
const avatarInput = document.getElementById('avatarInput');
avatarInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if(!file) return;
  const reader = new FileReader();
  reader.onload = (ev) => {
    const box = avatarInput.closest('.avatar-upload');
    box.style.backgroundImage = `url(${ev.target.result})`;
    box.querySelector('.icon').style.display = 'none';
    box.querySelector('span').style.display = 'none';
  };
  reader.readAsDataURL(file);
});
 
/* Build the 3x3 gallery grid */
(function buildGallery(){
  const grid = document.getElementById('galleryGrid');
  const captions = [
    "our first photo","that one trip","random cute moment",
    "your favorite selfie","the one that made me smile","date night",
    "silly face","just us","add your favorite"
  ];
  for(let i = 0; i < 9; i++){
    const card = document.createElement('label');
    card.className = 'photo-card reveal';
    card.innerHTML = `
      <input type="file" accept="image/*" data-index="${i}">
      <span class="corner-heart">💗</span>
      <div class="placeholder">
        <div class="icon">➕</div>
        <span>${captions[i]}</span>
      </div>
    `;
    grid.appendChild(card);
  }
 
  // re-run reveal observer on new cards
  const newObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('in');
        newObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.photo-card.reveal').forEach(c => newObserver.observe(c));
 
  grid.addEventListener('change', (e) => {
    if(e.target.tagName !== 'INPUT') return;
    const file = e.target.files[0];
    if(!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const card = e.target.closest('.photo-card');
      card.style.backgroundImage = `url(${ev.target.result})`;
      card.classList.add('filled');
    };
    reader.readAsDataURL(file);
  });
})();
