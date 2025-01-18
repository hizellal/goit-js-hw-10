import iziToast from "izitoast";

document.querySelector('.form').addEventListener('submit', () => {
    event.preventDefault();

    const delay = parseInt(document.querySelector('[name="delay"]').value,);
    const status = document.querySelector('input[name="state"]:checked').value;

    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            if (status === 'fulfilled') {
                resolve(delay);
            } else {
                reject(delay);
            }
        }, delay);
    });

     promise
         .then((delay) => {
            iziToast.success({
        title: "OK",
        titleColor: '#fff',
        message: `Fulfilled promise in ${delay}ms`,
        messageColor: '#fff',
        position: 'bottomCenter',
        color: '#59a10d',
        });
        })
         .catch((delay) => {
            iziToast.error({
        title: "Error",
        titleColor: '#fff',
        message: `Rejected promise in ${delay}ms`,
        messageColor: '#fff',
        position: 'bottomCenter',
        color: '#ef4040',
        });
         });
    document.querySelector('.form').reset();
});