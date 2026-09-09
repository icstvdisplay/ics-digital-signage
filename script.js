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
   AQI POPUP
   ============================== */

const aqiPopup = document.getElementById("aqi-popup");
const aqiFrame = document.getElementById("aqi-frame");

const AQI_URL =
    "https://www.aqi.in/dashboard/indonesia/riau/pekanbaru/pekanbaru";

const AQI_INTERVAL = 5 * 60 * 1000; // 10 menit
const AQI_DURATION = 30 * 1000;      // 30 detik


function showAQI() {

    console.log("AQI Popup: SHOW");

    /*
     * Reload halaman AQI.in setiap kali popup muncul.
     * Dengan begitu data yang ditampilkan adalah
     * versi terbaru dari halaman AQI.in.
     */
    aqiFrame.src = AQI_URL;

    /*
     * Tunggu sebentar sebelum menampilkan popup
     * agar iframe punya waktu mulai loading.
     */
    setTimeout(() => {

        aqiPopup.classList.add("show");

    }, 300);


    /*
     * Sembunyikan setelah 30 detik
     */
    setTimeout(() => {

        hideAQI();

    }, AQI_DURATION);
}


function hideAQI() {

    console.log("AQI Popup: HIDE");

    aqiPopup.classList.remove("show");
}


/*
 * Popup pertama muncul setelah 10 menit
 */
setTimeout(showAQI, AQI_INTERVAL);


/*
 * Selanjutnya muncul setiap 10 menit
 */
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
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById("countdown").innerHTML =
        `Continual Assessment 1 : ${days} Days ${String(hours).padStart(2,'0')}:${String(minutes).padStart(2,'0')}:${String(seconds).padStart(2,'0')}`;
}

updateCountdown();
setInterval(updateCountdown, 1000);

// Reload halaman setiap 4 jam
// setInterval(() => {
//     location.reload();
// }, 4 * 60 * 60 * 1000);
