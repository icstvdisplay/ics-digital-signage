//----------------------------------------------
// CLOCK
//----------------------------------------------
function updateClock() {
    const now = new Date();

    const date = now.toLocaleDateString('en-US', {
        weekday: 'long',
        day: '2-digit',
        month: 'long',
        year: 'numeric'
    });

    const time = now.toLocaleTimeString('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    });

    document.getElementById("date").textContent = date;
    document.getElementById("clock").textContent = time;
}

updateClock();
setInterval(updateClock, 60000);


/* ==========================================
   PENGATURAN POSTER POPUP
========================================== */

// Jeda sebelum rangkaian poster pertama dimulai
const POSTER_START_DELAY = 3 * 60 * 1000; // 3 menit

// Jeda setelah semua poster selesai, sebelum mengulang
const POSTER_REPEAT_DELAY = 3 * 60 * 1000; // 3 menit

// Jeda antarposter
const POSTER_GAP = 2 * 1000; // 2 detik

// Urutan poster yang ditampilkan
// Ubah urutan angka sesuai kebutuhan
const POSTER_ORDER = [1, 2, 3, 4, 5];

// Pengaturan setiap poster
const POSTERS = {
    1: {
        enabled: true,
        image: "images/pop up (1).png",
        duration: 10 * 1000 // 10 detik
    },

    2: {
        enabled: true,
        image: "images/pop up (2).png",
        duration: 15 * 1000 // 15 detik
    },

    3: {
        enabled: false,
        image: "images/pop up (3).png",
        duration: 20 * 1000 // 20 detik
    },

    4: {
        enabled: true,
        image: "images/pop up (4).png",
        duration: 10 * 1000 // 10 detik
    },

    5: {
        enabled: true,
        image: "images/pop up (5).png",
        duration: 30 * 1000 // 30 detik
    }
};


/* ==========================================
   POSTER POPUP MANAGER
========================================== */

const posterPopup = document.getElementById("poster-popup");
const posterImage = document.getElementById("poster-image");

let posterIndex = 0;
let posterTimer = null;

function getEnabledPosters() {
    return POSTER_ORDER.filter(
        id => POSTERS[id] && POSTERS[id].enabled
    );
}

function scheduleNextPoster(delay) {
    clearTimeout(posterTimer);
    posterTimer = setTimeout(showNextPoster, delay);
}

function showNextPoster() {
    // Jangan tampilkan poster bersamaan dengan popup lain
    if (typeof popupActive !== "undefined" && popupActive) {
        scheduleNextPoster(1000);
        return;
    }

    const enabledPosters = getEnabledPosters();

    if (enabledPosters.length === 0) {
        posterPopup.classList.remove("show");
        return;
    }

    // Jika semua poster sudah tampil, mulai siklus baru
    if (posterIndex >= enabledPosters.length) {
        posterIndex = 0;
        scheduleNextPoster(POSTER_REPEAT_DELAY);
        return;
    }

    const id = enabledPosters[posterIndex];
    const poster = POSTERS[id];

    posterImage.src = poster.image;
    posterImage.alt = `ICS Event Information ${id}`;

    posterPopup.classList.add("show");

    console.log(`Poster ${id}: SHOW`);

    posterTimer = setTimeout(() => {
        posterPopup.classList.remove("show");

        console.log(`Poster ${id}: HIDE`);

        posterIndex++;

        scheduleNextPoster(POSTER_GAP);
    }, poster.duration);
}

// Mulai sistem poster
scheduleNextPoster(POSTER_START_DELAY);


//----------------------------------------------
// COUNTDOWN 
//----------------------------------------------

const eventDate = new Date("2026-10-23T00:00:00+07:00");

function updateCountdown() {

    const now = new Date();
    const diff = eventDate.getTime() - now.getTime();

    if (diff <= 0) {
        document.getElementById("countdown").innerHTML =
            "United Nations Day";
        return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    const hours = Math.floor(
        (diff % (1000 * 60 * 60 * 24)) /
        (1000 * 60 * 60)
    );

    const minutes = Math.floor(
        (diff % (1000 * 60 * 60)) /
        (1000 * 60)
    );

    const seconds = Math.floor(
        (diff % (1000 * 60)) /
        1000
    );

    document.getElementById("countdown").innerHTML =
        `United Nations Day : ${days} Days ${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

// Jalankan langsung
updateCountdown();

// Update setiap 1 detik
setInterval(updateCountdown, 1000);



//----------------------------------------------
// RELOAD HALAMAN SETIAP 4 JAM
//----------------------------------------------

// setInterval(() => {
//     location.reload();
// }, 4 * 60 * 60 * 1000);
