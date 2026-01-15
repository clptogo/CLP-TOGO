/* ============================================================
   Données des dossiers
   ============================================================ */
const folders = [
  { name: "KITS SCOLAIRES 2023", year: 2023, images: 2, videos: [] },
  { name: "KITS SCOLAIRES 2025", year: 2025, images: 5, videos: [] },
  { name: "PARTAGE DE NOURRITURES AUX DEMUNIS 2023", year: 2023, images: 10, videos: ["v1.MP4", "v2.MP4"] },
  { name: "PARTAGE DE NOURRITURES AUX DEMUNIS 2025", year: 2025, images: 10, videos: ["v1.mp4", "v2.mp4", "v3.mp4"] },
];

const gallery = document.getElementById("gallery");
const yearFilter = document.getElementById("yearFilter");

/* ============================================================
   Rendu de la galerie
   ============================================================ */
function safePath(folderName) {
  // Encode chaque segment pour gérer espaces, apostrophes, accents, etc.
  return folderName.split("/").map(encodeURIComponent).join("/");
}

function renderGallery(year = "all") {
  gallery.innerHTML = "";

  const filtered = year === "all" ? folders : folders.filter(f => f.year == year);

  filtered.forEach(folder => {
    const folderPath = safePath(folder.name);

    // Images avec fallback .jpeg -> .jpg -> placeholder
    for (let i = 1; i <= folder.images; i++) {
      const figure = document.createElement("figure");
      figure.className = "thumb";

      const img = document.createElement("img");
      img.loading = "lazy";
      img.alt = `${folder.name} - Image ${i}`;
      img.src = `${folderPath}/${i}.jpeg`;

      img.onerror = () => {
        img.onerror = null;
        img.src = `${folderPath}/${i}.jpg`;
        img.onerror = () => {
          img.onerror = null;
          img.src = "images/placeholder.jpg";
        };
      };

      const caption = document.createElement("figcaption");
      caption.textContent = `${folder.name} (${folder.year})`;

      figure.appendChild(img);
      figure.appendChild(caption);
      gallery.appendChild(figure);
    }

    // Vidéos (noms exacts)
    folder.videos.forEach((filename, index) => {
      const figure = document.createElement("figure");
      figure.className = "thumb";

      const video = document.createElement("video");
      video.controls = true;
      video.playsInline = true;
      video.preload = "metadata";

      const source = document.createElement("source");
      source.src = `${folderPath}/${filename}`;
      source.type = "video/mp4";
      video.appendChild(source);

      const caption = document.createElement("figcaption");
      caption.textContent = `${folder.name} — Vidéo ${index + 1}`;

      video.onerror = () => {
        caption.textContent += " (vidéo non trouvée ou codec non supporté)";
      };

      figure.appendChild(video);
      figure.appendChild(caption);
      gallery.appendChild(figure);
    });
  });
}

yearFilter?.addEventListener("change", () => renderGallery(yearFilter.value));
renderGallery();


/* ============================================================
   Lightbox image
   ============================================================ */
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxClose = document.getElementById("lightboxClose");

gallery.addEventListener("click", (e) => {
  const target = e.target;
  if (target.tagName === "IMG") {
    lightboxImg.src = target.src;
    lightbox.classList.remove("hidden");
  }
});

lightboxClose.addEventListener("click", () => lightbox.classList.add("hidden"));
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) lightbox.classList.add("hidden");
});

/* ============================================================
   Lightbox vidéo
   ============================================================ */
const videoLightbox = document.getElementById("videoLightbox");
const videoPlayer = document.getElementById("videoPlayer");
const videoSource = document.getElementById("videoSource");
const videoClose = document.getElementById("videoClose");

gallery.addEventListener("click", (e) => {
  const target = e.target;
  if (target.tagName === "VIDEO") {
    const srcEl = target.querySelector("source");
    const src = srcEl ? srcEl.src : target.currentSrc || target.src;

    videoSource.src = src;
    videoPlayer.load();
    videoLightbox.classList.remove("hidden");
    videoPlayer.play();
  }
});

videoClose.addEventListener("click", closeVideoLightbox);
videoLightbox.addEventListener("click", (e) => {
  if (e.target === videoLightbox) closeVideoLightbox();
});

function closeVideoLightbox() {
  videoLightbox.classList.add("hidden");
  videoPlayer.pause();
  videoSource.src = "";
  videoPlayer.removeAttribute("src");
}

/* ============================================================
   Menu responsive
   ============================================================ */
const navToggle = document.getElementById("navToggle");
const mainNav = document.getElementById("mainNav");

if (navToggle && mainNav) {
  navToggle.addEventListener("click", () => {
    mainNav.classList.toggle("open");
    if (mainNav.style.display === "flex") {
      mainNav.style.display = "";
    } else {
      mainNav.style.display = "flex";
      mainNav.style.flexDirection = "column";
      mainNav.style.gap = "12px";
    }
  });

  mainNav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      if (window.innerWidth < 700) mainNav.style.display = "";
    });
  });
}

/* ============================================================
   Formulaire de contact
   ============================================================ */
const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

if (contactForm && formMessage) {
  contactForm.addEventListener("submit", e => {
    e.preventDefault();
    const name = contactForm.querySelector('[name="name"]');
    const email = contactForm.querySelector('[name="email"]');
    const message = contactForm.querySelector('[name="message"]');

    if (!name.value.trim() || !email.value.trim() || !message.value.trim()) {
      formMessage.textContent = "Veuillez remplir tous les champs requis.";
      formMessage.style.color = "#dc2626";
      return;
    }

    formMessage.textContent = "Merci pour votre message. Nous vous répondrons bientôt.";
    formMessage.style.color = "#16a34a";
    contactForm.reset();
  });
}

/* ============================================================
   Formulaire d’adhésion
   ============================================================ */
const adhesionForm = document.getElementById("adhesionForm");
const adhesionMsg = document.getElementById("adhesionMessage");

if (adhesionForm && adhesionMsg) {
  adhesionForm.addEventListener("submit", e => {
    e.preventDefault();
    const nom = document.getElementById("nom");
    const prenoms = document.getElementById("prenoms");
    const naissance = document.getElementById("naissance");
    const pays = document.getElementById("pays");
    const tel = document.getElementById("tel");

    if (!nom.value.trim() || !prenoms.value.trim() || !naissance.value || !pays.value.trim() || !tel.value.trim()) {
      adhesionMsg.textContent = "Veuillez compléter tous les champs obligatoires.";
      adhesionMsg.style.color = "#dc2626";
      return;
    }

    adhesionMsg.textContent = "Votre demande d’adhésion a été enregistrée. Le Conseil d’Administration vous contactera.";
    adhesionMsg.style.color = "#16a34a";
    adhesionForm.reset();
  });
}

/* ============================================================
   Accessibilité
   ============================================================ */
function handleFirstTab(e) {
  if (e.key === "Tab") {
    document.body.classList.add("user-is-tabbing");
    window.removeEventListener("keydown", handleFirstTab);
  }
}
window.addEventListener("keydown", handleFirstTab);
