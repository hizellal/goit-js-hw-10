const timerInput = document.querySelector("input");
timerInput.className = "timer_input";

const timerBtn = document.querySelector("button");
timerBtn.className = "timer_btn";

const timer = {
    deadline: null,
    intervalId: null,
    elements: {
        days: document.querySelector('[data-days]'),
        hours: document.querySelector('[data-hours]'),
        minutes: document.querySelector('[data-minutes]'),
        seconds: document.querySelector('[data-seconds]'),
    },

    start() {
        this.intervalId = setInterval(() => {
            const diff = this.deadline - Date.now();

            if (diff <= 0) {
                this.stop();

                return;
            }

            const timeComponents = this.getTimeComponents(diff);

            this.elements.days.textContent = this.pad(timeComponents.days);
            this.elements.hours.textContent = this.pad(timeComponents.hours);
            this.elements.minutes.textContent = this.pad(timeComponents.minutes);
            this.elements.seconds.textContent = this.pad(timeComponents.seconds);
        }, 1000);
    },

    stop() {
        clearInterval(this.intervalId);
    },

    getTimeComponents(diff) {
        const days = Math.floor(diff / 1000 / 60 / 60 / 24);
        const hours = Math.floor(diff / 1000 / 60 / 60) % 24;
        const minutes = Math.floor(diff / 1000 / 60) % 60;
        const seconds = Math.floor(diff / 1000) % 60;

        return {
            days,
            hours,
            minutes,
            seconds,
        };
        
    },

    pad(value) {
        return String(value).padStart(2, '0');
    },
};

console.log(timer.elements);

timerBtn.addEventListener('click', () => {
    timer.deadline = new Date(timerInput.value);

    timer.start();
})