window.onload = function () {
    let elem = document.querySelector('.main-carousel');
    let flkty = new Flickity(elem, {
        contain: true,
        cellAlign: 'left', //align cells within the carousel element
        autoplay: 1000, //autoplay
        draggable: false, //disable dragging
        wrapAround: true, //you can flick forever
        accessibility: false, //disables being able to tab
        arrowShape: 'M 0,50 L 60,00 L 50,30 L 80,30 L 80,70 L 50,70 L 60,100 Z' //m - move to, l - line to, z - end
    });
}