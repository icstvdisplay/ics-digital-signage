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

// Cukup diperbarui setiap menit
setInterval(updateClock, 60000);


// =========================
// COUNTDOWN
// =========================

const eventDate = new Date("2026-08-17T00:00:00");

function updateCountdown() {

    const now = new Date();
    const diff = eventDate - now;

    if (diff <= 0) {
        document.getElementById("countdown").innerHTML =
            "Celebration Independence Day";
        return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById("countdown").innerHTML =
        `Independence Day : ${days} Days ${String(hours).padStart(2,'0')}:${String(minutes).padStart(2,'0')}:${String(seconds).padStart(2,'0')}`;
}

setInterval(updateCountdown, 1000);
updateCountdown();
