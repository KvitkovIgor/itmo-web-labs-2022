function addRow(jsonData) {
    let newRow = document.getElementById("queue-table").insertRow();
    let newCell = newRow.insertCell(0)
    newCell.innerText=jsonData.match;
    newCell = newRow.insertCell(1)
    newCell.innerText=jsonData.map;
    newCell = newRow.insertCell(2)
    newCell.innerText=jsonData.kdr;
    newCell = newRow.insertCell(3)
    newCell.innerText=jsonData.rating;
}

window.addEventListener('load', () => {

    const storage = window.localStorage;
    if (storage.getItem("id") == null) {
        storage.setItem("id", "0");
    } else {
        let num = 1;
        while (true) {
            let returnData = localStorage.getItem(String(num));
            if (returnData == null) {
                break;
            }
            let jsonData = JSON.parse(returnData);
            addRow(jsonData);
            num = num + 1;
        }
    }

    const form = document.getElementById("queue-web");
    document.getElementById("queue-btn").addEventListener('click', function(e) {
        const ev = new Event("submit");
        document.getElementById("queue-web").dispatchEvent(ev);
    });

    document.getElementById("queue-web").addEventListener('submit', function(e) {
        e.preventDefault();
        const match = form.querySelector('[name="Match"]').value;
        const map = form.querySelector('[name="Map"]').value;
        const kdr = form.querySelector('[name="KDR"]').value;
        const rating = form.querySelector('[name="Rating"]').value;
        if (match === '' || rating === '' || kdr === '' || map === '') {
            alert("Input everything!");
            return;
        }
        const data = {
            match: match,
            map: map,
            kdr: kdr,
            rating: rating
        };
        const serialData = JSON.stringify(data);
        let id = Number(storage.getItem("id"));
        id = id + 1;
        storage.setItem(String(id), serialData);
        storage.setItem("id", String(id));
        addRow(data);
        e.target.reset();
    });

    document.getElementById("clear-btn").addEventListener('click', function(e) {
        const table = document.getElementById("queue-table");
        const oldChild = table.querySelector("tbody");
        let tbody =  document.createElement("tbody");
        tbody.appendChild(document.createElement("tr"));
        table.replaceChild(tbody, oldChild);
        storage.clear();
    });
});

window.addEventListener('load', () => {

    document.getElementById("add-api-btn").addEventListener('click', function(e) {
        const ev = new Event("json");
        document.getElementById("queue-web").dispatchEvent(ev);
    });

    document.getElementById("queue-web").addEventListener('json',  function(e) {
        const storage = window.localStorage;
        const url = 'https://hltv-api.vercel.app/api/players.json';
        e.preventDefault();
        fetch(url)
            .then((resp) => resp.json())
            .then(function(data) {
                let element_id = Math.floor(Math.random() * 200);
                const match = data[element_id].nickname;
                const map = "Dust 2";
                const kdr = data[element_id].kd;
                const rating = data[element_id].rating;
                const new_stas = {
                    match: match,
                    map: map,
                    kdr: kdr,
                    rating: rating
                };

                const serialData = JSON.stringify(new_stas);
                console.log(serialData);
                let id = Number(storage.getItem("id"));
                id = id + 1;
                storage.setItem(String(id), serialData);
                storage.setItem("id", String(id));
                let newRow = document.getElementById("queue-table").insertRow();
                let newCell = newRow.insertCell(0)
                newCell.innerText=new_stas.match;
                newCell = newRow.insertCell(1)
                newCell.innerText=new_stas.map;
                newCell = newRow.insertCell(2)
                newCell.innerText=new_stas.kdr;
                newCell = newRow.insertCell(3)
                newCell.innerText=new_stas.rating;
                e.target.reset();
            })
            .catch(function(error) {
                alert("⚠ Что-то пошло не так!");
            })
    });
});