
class App {
    items = []

    render() {
        let table = document.querySelector('#todolist')
        table.innerHTML = "";
        this.items.forEach(item => {
            table.innerHTML += `<tr data-id="${item.id}">
                <td>${item.id}</td>
                <td data-title>${item.title}</td>
                <td data-status>${item.completed}</td>
                <td><button data-id="${item.id}" class="btn btn-sm btn-success">Edit</button></td>
                <td><button onclick="remove(${item.id})" class="btn btn-sm btn-danger">Remove</button></td>
            </tr>`;
        });
    }
}

module.exports = new App;