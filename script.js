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


/* ==============================
   POPUP SYSTEM
   ============================== */

//----------------------------------------------
// POPUP 1 — POSTER INFORMASI
//----------------------------------------------

const posterPopup = document.getElementById("poster-popup");
const posterImage = document.getElementById("poster-image");

const POSTER_FIRST_SHOW = 3 * 60 * 1000; // 3 menit
const POSTER_INTERVAL = 5 * 60 * 1000;  // setiap 5 menit
const POSTER_DURATION = 30 * 1000;      // 30 detik

function showPoster() {

    console.log("Poster Popup: SHOW");

    posterPopup.classList.add("show");

    setTimeout(() => {
        hidePoster();
    }, POSTER_DURATION);
}

function hidePoster() {

    console.log("Poster Popup: HIDE");

    posterPopup.classList.remove("show");
}

// Pertama muncul setelah 3 menit
setTimeout(showPoster, POSTER_FIRST_SHOW);

// Selanjutnya muncul setiap 5 menit
setInterval(showPoster, POSTER_INTERVAL);



//----------------------------------------------
// POPUP 2 — INDEKS KUALITAS UDARA
//----------------------------------------------

const aqiPopup = document.getElementById("aqi-popup");
const aqiFrame = document.getElementById("aqi-frame");

const AQI_URL =
    "https://www.aqi.in/dashboard/indonesia/riau/pekanbaru/pekanbaru";

const AQI_FIRST_SHOW = 5 * 60 * 1000; // 5 menit
const AQI_INTERVAL = 5 * 60 * 1000;  // setiap 5 menit
const AQI_DURATION = 30 * 1000;      // 30 detik

function showAQI() {

    console.log("AQI Popup: SHOW");

    // Reload halaman AQI.in setiap kali popup muncul
    aqiFrame.src = AQI_URL;

    // Tunggu sebentar agar iframe mulai loading
    setTimeout(() => {
        aqiPopup.classList.add("show");
    }, 300);

    // Sembunyikan setelah 30 detik
    setTimeout(() => {
        hideAQI();
    }, AQI_DURATION);
}

function hideAQI() {

    console.log("AQI Popup: HIDE");

    aqiPopup.classList.remove("show");
}

// Pertama muncul setelah 5 menit
setTimeout(showAQI, AQI_FIRST_SHOW);

// Selanjutnya muncul setiap 5 menit
setInterval(showAQI, AQI_INTERVAL);



//----------------------------------------------
// COUNTDOWN
//----------------------------------------------

const eventDate = new Date("2026-09-22T07:30:00");

function updateCountdown() {

    const now = new Date();
    const diff = eventDate - now;

    if (diff <= 0) {

        document.getElementById("countdown").innerHTML =
            "Continual Assessment 1 (SA 1)";

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
        `Continual Assessment 1 : ${days} Days ${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

updateCountdown();
setInterval(updateCountdown, 1000);


//----------------------------------------------
// RELOAD HALAMAN SETIAP 4 JAM
//----------------------------------------------

// setInterval(() => {
//     location.reload();
// }, 4 * 60 * 60 * 1000);
