$(document).ready(function() {

    $('#perfil_ripple').ripples({
        resolution: 512,
        dropRadius: 10,
    });

    const bars = document.querySelectorAll('.progreso-bar');
    bars.forEach(function(bar) {
        let percentage = bar.dataset.percent;
        let tooltip = bar.children[0];
        tooltip.innerText = percentage + '%';
        bar.style.width = percentage + '%';
    });

    const counters = document.querySelectorAll('.contador');
    function runCounter() {
        counters.forEach(counter => {
            counter.innerText = 0;
            let target = +counter.dataset.count;
            let step = target / 100;
            
            let countIt = function() {
                let displayedCount = +counter.innerText;
                if (displayedCount < target) {
                    counter.innerText = Math.ceil(displayedCount + step);
                    setTimeout(countIt, 10);
                } else {
                    counter.innerText = target;
                }
            };
            countIt();
        });
    }

    runCounter();

    let counterSection = document.querySelector('.counter-section');
    let options = { rootMargin: '0px 0px -200px 0px' };
    let done = 0;

    const sectionObserver = new IntersectionObserver(function(entries){
        if(entries[0].isIntersecting && done !== 1) {
            done = 1;
            runCounter();
        }
    }, options);

    sectionObserver.observe(counterSection);

    $('.slider').slick({
        arrows: false,
        autoplay: true,
        autoplaySpeed: 10000,
        infinite: true,
    });

    const form = document.querySelector('form');
    const nameInput = form.querySelector('input[type="text"]');
    const emailInput = form.querySelector('input[type="email"]');
    const messageInput = form.querySelector('textarea');
    const submitButton = form.querySelector('button[type="submit"]');

    submitButton.disabled = true;

    function checkFormCompletion() {
        if (nameInput.value.trim() !== '' && emailInput.value.trim() !== '' && messageInput.value.trim() !== '') {
            submitButton.disabled = false;
        } else {
            submitButton.disabled = true;
        }
    }

    nameInput.addEventListener('input', checkFormCompletion);
    emailInput.addEventListener('input', checkFormCompletion);
    messageInput.addEventListener('input', checkFormCompletion);

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        alert('Tu mensaje ha sido enviado exitosamente. ¡Gracias por contactarme!');

        form.reset();
        
        submitButton.disabled = true;
    });

    const printButton = document.querySelector("#print-button");
    printButton.addEventListener("click", () => {
        window.print();
    });
});
