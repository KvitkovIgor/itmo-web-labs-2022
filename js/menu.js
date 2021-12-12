window.addEventListener('load', function() {
    let header = document.getElementById("header").getElementsByClassName("menu");
    for (let i = 0; i < header.length; i++) {
        if (header[i].href === window.location.href) {
            header[i].classList.add("active");
        }
    }
});