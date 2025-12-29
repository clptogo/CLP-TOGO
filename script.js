// Responsive navigation toggle
(function(){
  const navToggle = document.getElementById('navToggle');
  const mainNav = document.getElementById('mainNav');

  if (navToggle && mainNav) {
    navToggle.addEventListener('click', () => {
      mainNav.classList.toggle('open');
      // simple slide in/out for small screens
      if (mainNav.style.display === 'flex') {
        mainNav.style.display = '';
      } else {
        mainNav.style.display = 'flex';
        mainNav.style.flexDirection = 'column';
        mainNav.style.gap = '12px';
      }
    });

    // close nav on link click (mobile)
    mainNav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        if (window.innerWidth < 700) {
          mainNav.style.display = '';
        }
      });
    });
  }
})();

// Footer year
(function(){
  const y = new Date().getFullYear();
  const el = document.getElementById('year');
  if (el) el.textContent = y;
})();

// Contact form handling (index)
(function(){
  const form = document.getElementById('contactForm');
  const msg = document.getElementById('formMessage');
  if (!form) return;

  form.addEventListener('submit', function(e){
    e.preventDefault();
    const name = form.querySelector('[name="name"]');
    const email = form.querySelector('[name="email"]');
    const message = form.querySelector('[name="message"]');

    if (!name.value.trim() || !email.value.trim() || !message.value.trim()) {
      msg.textContent = 'Veuillez remplir tous les champs requis.';
      msg.style.color = '#dc2626';
      return;
    }

    // Simulate success (replace with real submission endpoint)
    msg.textContent = 'Merci pour votre message. Nous vous répondrons bientôt.';
    msg.style.color = '#16a34a';
    form.reset();
  });
})();

// Adhesion form handling (adhesion.html)
(function(){
  const adhesionForm = document.getElementById('adhesionForm');
  const adhesionMsg = document.getElementById('adhesionMessage');

  if (!adhesionForm) return;

  adhesionForm.addEventListener('submit', function(e){
    e.preventDefault();

    const nom = document.getElementById('nom');
    const prenoms = document.getElementById('prenoms');
    const naissance = document.getElementById('naissance');
    const pays = document.getElementById('pays');
    const tel = document.getElementById('tel');

    if (!nom.value.trim() || !prenoms.value.trim() || !naissance.value || !pays.value.trim() || !tel.value.trim()) {
      adhesionMsg.textContent = 'Veuillez compléter tous les champs obligatoires.';
      adhesionMsg.style.color = '#dc2626';
      return;
    }

    // Basic phone normalization (no submission)
    const phone = tel.value.trim();

    adhesionMsg.textContent = 'Votre demande d’adhésion a été enregistrée. Le Conseil d’Administration vous contactera.';
    adhesionMsg.style.color = '#16a34a';
    adhesionForm.reset();
  });
})();

// Accessibility: show focus outlines when tabbing
(function(){
  function handleFirstTab(e) {
    if (e.key === 'Tab') {
      document.body.classList.add('user-is-tabbing');
      window.removeEventListener('keydown', handleFirstTab);
    }
  }
  window.addEventListener('keydown', handleFirstTab);
})();