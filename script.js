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

const AQI_INTERVAL = 10 * 60 * 1000; // 10 menit
const AQI_DURATION = 30 * 1000;      // 30 detik


function showAQI() {

    // Reload halaman AQI supaya mendapatkan
    // data terbaru setiap kali popup muncul
    aqiFrame.src =
        "https://www.aqi.in/dashboard/indonesia/riau/pekanbaru/pekanbaru";

    aqiPopup.style.display = "flex";

    console.log("AQI Popup: SHOW");

    setTimeout(() => {

        aqiPopup.style.display = "none";

        console.log("AQI Popup: HIDE");

    }, AQI_DURATION);
}


/*
 * Muncul pertama kali setelah 10 menit
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
