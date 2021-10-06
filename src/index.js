
const app = require("./app");
const Todo = require("./services/Todo");

function row(item) {
    let table = document.querySelector('#todolist')
    table.innerHTML += `<tr data-id="${item.id}">
        <td>${item.id}</td>
        <td data-title>${item.title}</td>
        <td data-status>${item.completed}</td>
        <td><button data-id="${item.id}" class="btn btn-sm btn-success">Edit</button></td>
        <td><button onclick="remove(${item.id})" class="btn btn-sm btn-danger">Remove</button></td>
    </tr>`;
}

function addEditListener() {
    let btns = document.querySelectorAll('button.btn-success')
    btns.forEach(function(btn) {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            let id = e.target.getAttribute('data-id')
            let td = document.querySelector(`tr[data-id="${id}"] td[data-title]`)
            let value = window.prompt("Enter new title:", td.textContent)
            if (!value) {
                return
            }
            let data = {
                title: value
            }
            Todo.update(id, data).then(response => {
                //td.textContent = response.data.title
                
                app.items.forEach((item, idx) => {
                    if (item.id == id) {
                        item.title = response.data.title;
                        return;
                    }
                })
                app.render()
            })
        })
    })
}

window.remove = function(id) {
    Todo.delete(id).then(response => {
        //document.querySelector(`tr[data-id="${id}"]`).remove()
        let idx;
        app.items.forEach((item, idx) => {
            if (item.id == id) {
                app.items.splice(idx, 1);
                return;
            }
        })
        app.render()
    })
}

Todo.list().then(response => {
    let data = response.data;
    app.items = data;
    app.render()
    // for (let i in data) {
    //     row(data[i])
    // }
    addEditListener()
})

let form = document.querySelector('form')
form.addEventListener('submit', function(e) {
    e.preventDefault()
    let input = document.querySelector('input[name=title]')
    let data = {
        title: input.value,
        completed: true,
        userId: 5
    };
    Todo.create(data).then(response => {
        // row(response.data)
        app.items.push(response.data)
        app.render()
        addEditListener()
    })
})