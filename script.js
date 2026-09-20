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

//==============================================
// PENGATURAN POPUP
//==============================================

const ENABLE_POSTER = true; // true = aktif, false = nonaktif
const ENABLE_AQI = true;    // true = aktif, false = nonaktif


//----------------------------------------------
// POPUP 1 — POSTER INFORMASI
//----------------------------------------------

const posterPopup = document.getElementById("poster-popup");
const posterImage = document.getElementById("poster-image");

const POSTER_INTERVAL = 1 * 60 * 1000;
const POSTER_DURATION = 30 * 1000;


//----------------------------------------------
// POPUP 2 — INDEKS KUALITAS UDARA
//----------------------------------------------

const aqiPopup = document.getElementById("aqi-popup");
const aqiFrame = document.getElementById("aqi-frame");

const AQI_URL =
    "https://www.aqi.in/dashboard/indonesia/riau/pekanbaru/pekanbaru";

const AQI_INTERVAL = 5 * 60 * 1000;
const AQI_DURATION = 30 * 1000;


//----------------------------------------------
// POPUP MANAGER
//----------------------------------------------

let popupActive = false;

let nextPosterTime = ENABLE_POSTER
    ? Date.now() + POSTER_INTERVAL
    : Infinity;

let nextAQITime = ENABLE_AQI
    ? Date.now() + AQI_INTERVAL
    : Infinity;


//----------------------------------------------
// TAMPILKAN POSTER
//----------------------------------------------

function showPoster() {

    if (!ENABLE_POSTER || popupActive) return;

    popupActive = true;

    console.log("Poster Popup: SHOW");

    posterPopup.classList.add("show");

    setTimeout(() => {

        posterPopup.classList.remove("show");

        popupActive = false;

        console.log("Poster Popup: HIDE");

    }, POSTER_DURATION);
}


//----------------------------------------------
// TAMPILKAN AQI
//----------------------------------------------

function showAQI() {

    if (!ENABLE_AQI || popupActive) return;

    popupActive = true;

    console.log("AQI Popup: SHOW");

    aqiFrame.src = AQI_URL;

    setTimeout(() => {

        aqiPopup.classList.add("show");

    }, 300);

    setTimeout(() => {

        aqiPopup.classList.remove("show");

        popupActive = false;

        console.log("AQI Popup: HIDE");

    }, AQI_DURATION);
}


//----------------------------------------------
// CEK JADWAL POPUP
//----------------------------------------------

function checkPopups() {

    const now = Date.now();

    if (popupActive) return;


    // Poster setiap 3 menit
    if (ENABLE_POSTER && now >= nextPosterTime) {

        showPoster();

        nextPosterTime += POSTER_INTERVAL;

        return;
    }


    // AQI setiap 5 menit
    if (ENABLE_AQI && now >= nextAQITime) {

        showAQI();

        nextAQITime += AQI_INTERVAL;

        return;
    }

}


//----------------------------------------------
// JALANKAN
//----------------------------------------------

setInterval(checkPopups, 1000);

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
