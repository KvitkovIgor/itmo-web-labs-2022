function addRow(jsonData) {
    let newRow = document.getElementById("queue-table").insertRow();
    let newCell = newRow.insertCell(0)
    newCell.innerText=jsonData.name;
    newCell = newRow.insertCell(1)
    newCell.innerText=jsonData.surname;
    newCell = newRow.insertCell(2)
    newCell.innerText=jsonData.group;
    newCell = newRow.insertCell(3)
    newCell.innerText=jsonData.labs;
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
        const name = form.querySelector('[name="Match"]').value;
        const surname = form.querySelector('[name="Map"]').value;
        const group = form.querySelector('[name="KDR"]').value;
        const labs = form.querySelector('[name="Rating"]').value;
        if (name === '' || surname === '' || group === '' || labs === '') {
            alert("Input everything!");
            return;
        }
        const data = {
            name: name,
            surname: surname,
            group: group,
            labs: labs
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