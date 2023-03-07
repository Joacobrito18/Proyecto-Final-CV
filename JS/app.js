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
        console.log(percentage);
    })

    // contador
    const counters = document.querySelectorAll('.contador');
    console.log(counters);

    function runCounter() {
        counters.forEach(counter => {
            counter.innerText = 0;
            let target = +counter.dataset.count;
            let step = target / 100;
            
            let countIt = function() {
                let displayedCount = +counter.innerText;
                if(displayedCount < target){
                    counter.innerText = Math.ceil(displayedCount + step);
                    setTimeout(countIt, 10);
                } else {
                    counter.innerText = target;
                }
            }
            countIt();
        })
    }

    runCounter();
    let counterSection = document.querySelector('.counter-section');

    let options = {
        rootMargin: '0px 0px -200px 0px'
    }
    let done = 0;

    const sectionObserver = new IntersectionObserver(function(entries){
        if(entries[0].isIntersecting && done !== 1) {
            done = 1;
            runCounter();
        }
    }, options)
    

    sectionObserver.observe(counterSection);

    //slider
    $('.slider').slick({
        arrows: false,
        autoplay: true,
        autoPlaySpeed: 10000,
        Infinity: true,
    });

    //descarga
    
    const downloadButton = document.querySelector("#download-button");
    downloadButton.addEventListener("click", () => {
    
    const link = document.createElement("a");
    link.setAttribute("download", "cv.pdf");
    link.href = "Downloads.pdf";

    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    });

    //quise crear una opcion para que se descargara el cv sin un backend, pero no me funciono


    //boton para imprimir
    const printButton = document.querySelector("button");
    printButton.addEventListener("click", () => {
    window.print();
});
});