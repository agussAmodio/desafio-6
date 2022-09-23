document.addEventListener("DOMContentLoaded", function (event) {
    fetch('http://localhost:8080/productos')
        .then((response) => response.json())
        .then((data) => renderProducts(data))
});

const renderProducts = (data) => {
    const table = document.getElementById('table');

    const content = data.map((producto) => {
        return `
        <tr>
            <td>${producto.tittle}</td>
            <td>${producto.price}</td>
            <td>${producto.thumbnail}</td>
        </tr>
      `
    })

    table.innerHTML = `<table>${content}</table>`;
}

document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('.form').addEventListener('submit', function (event) {
        event.preventDefault();
        const data = new FormData(event.target);
        const dataEntries = [...data.entries()];
        console.log(dataEntries);
        const product = {
            "tittle": dataEntries[0][1],
            "price": dataEntries[1][1],
            "thumbnail": dataEntries[2][1],
        }

        fetch('http://localhost:8080/productos', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
        });
    });
});

const socket = io.connect('http://localhost');
socket.emit('mensaje' , 'hola mundo')