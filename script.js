
//==============================================
// CLOCK
//==============================================

function updateClock() {
    const now = new Date();

    const date = now.toLocaleDateString("en-US", {
        weekday: "long",
        day: "2-digit",
        month: "long",
        year: "numeric"
    });

    const time = now.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false
    });

    const dateElement = document.getElementById("date");
    const clockElement = document.getElementById("clock");

    if (dateElement) dateElement.textContent = date;
    if (clockElement) clockElement.textContent = time;
}

updateClock();
setInterval(updateClock, 60000);


//==============================================
// PENGATURAN POSTER POPUP
//==============================================

// Jeda sebelum poster pertama muncul
const POSTER_START_DELAY = 3 * 60 * 1000; // 3 menit

// Jeda setelah seluruh rangkaian poster selesai
const POSTER_REPEAT_DELAY = 3 * 60 * 1000; // 3 menit

// Jeda antara poster satu dan berikutnya
const POSTER_GAP = 2 * 1000; // 2 detik

// Urutan poster yang ditampilkan
const POSTER_ORDER = [1, 2, 3, 4, 5];

// Pengaturan masing-masing poster
const POSTERS = {
    1: {
        enabled: true,
        image: "images/pop up (1).png",
        duration: 10 * 1000
    },

    2: {
        enabled: false,
        image: "images/pop up (2).png",
        duration: 15 * 1000
    },

    3: {
        enabled: false,
        image: "images/pop up (3).png",
        duration: 20 * 1000
    },

    4: {
        enabled: false,
        image: "images/pop up (4).png",
        duration: 10 * 1000
    },

    5: {
        enabled: false,
        image: "images/pop up (5).png",
        duration: 30 * 1000
    }
};


//==============================================
// POSTER POPUP MANAGER
//==============================================

const posterPopup = document.getElementById("poster-popup");
const posterImage = document.getElementById("poster-image");

let posterIndex = 0;
let posterTimer = null;
let posterCycleStarted = false;

function getEnabledPosters() {
    return POSTER_ORDER.filter(id =>
        POSTERS[id] && POSTERS[id].enabled
    );
}

function hidePoster() {
    if (posterPopup) {
        posterPopup.classList.remove("show");
    }
}

function scheduleNextPoster(delay) {
    clearTimeout(posterTimer);

    posterTimer = setTimeout(showNextPoster, delay);
}

function showNextPoster() {
    // Pastikan elemen HTML tersedia
    if (!posterPopup || !posterImage) {
        console.error("Poster popup HTML tidak ditemukan.");
        return;
    }

    const enabledPosters = getEnabledPosters();

    // Jika semua poster OFF, jangan tampilkan popup
    if (enabledPosters.length === 0) {
        hidePoster();
        clearTimeout(posterTimer);
        return;
    }

    // Jika seluruh poster selesai, mulai siklus berikutnya
    if (posterIndex >= enabledPosters.length) {
        hidePoster();
        posterIndex = 0;

        scheduleNextPoster(POSTER_REPEAT_DELAY);
        return;
    }

    const id = enabledPosters[posterIndex];
    const poster = POSTERS[id];

    posterImage.onload = () => {
        // Tampilkan gambar setelah berhasil dimuat
        posterPopup.classList.add("show");
        console.log(`Poster ${id}: SHOW`);

        clearTimeout(posterTimer);

        posterTimer = setTimeout(() => {
            hidePoster();

            console.log(`Poster ${id}: HIDE`);

            posterIndex++;
            scheduleNextPoster(POSTER_GAP);
        }, poster.duration);
    };

    posterImage.onerror = () => {
        console.error(`Gagal memuat poster ${id}: ${poster.image}`);

        posterImage.onload = null;
        posterImage.onerror = null;

        posterIndex++;
        scheduleNextPoster(POSTER_GAP);
    };

    // Hindari callback lama jika gambar sama
    posterImage.src = poster.image;

    // Jika gambar sudah ada di cache browser
    if (posterImage.complete && posterImage.naturalWidth > 0) {
        posterImage.onload();
    }
}

// Mulai jadwal poster
function startPosterManager() {
    if (posterCycleStarted) return;

    if (!posterPopup || !posterImage) {
        console.error("Periksa ID poster-popup dan poster-image di HTML.");
        return;
    }

    posterCycleStarted = true;
    scheduleNextPoster(POSTER_START_DELAY);
}

startPosterManager();


//==============================================
// COUNTDOWN — UNITED NATIONS DAY
//==============================================

const eventDate = new Date("2026-10-23T00:00:00+07:00");

function updateCountdown() {
    const countdownElement = document.getElementById("countdown");

    if (!countdownElement) return;

    const now = new Date();
    const diff = eventDate.getTime() - now.getTime();

    if (diff <= 0) {
        countdownElement.textContent = "United Nations Day";
        return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    const hours = Math.floor(
        (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );

    const minutes = Math.floor(
        (diff % (1000 * 60 * 60)) / (1000 * 60)
    );

    const seconds = Math.floor(
        (diff % (1000 * 60)) / 1000
    );

    countdownElement.textContent =
        `United Nations Day : ${days} Days ` +
        `${String(hours).padStart(2, "0")}:` +
        `${String(minutes).padStart(2, "0")}:` +
        `${String(seconds).padStart(2, "0")}`;
}

updateCountdown();
setInterval(updateCountdown, 1000);


//==============================================
// RELOAD HALAMAN SETIAP 4 JAM (OPSIONAL)
//==============================================

// setInterval(() => {
//     location.reload();
// }, 4 * 60 * 60 * 1000);
