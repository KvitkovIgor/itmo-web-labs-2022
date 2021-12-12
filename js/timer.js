(function() {
    let startTime = (new Date).getTime();
    window.addEventListener('load', function() {
        let endTime = (new Date).getTime();
        document.getElementById("load").textContent = "Загрузка " + (endTime - startTime) + "мс";
    });
})();