const form = document.querySelector('form')
const input = document.querySelector('input')


form.addEventListener('submit', e => {
    e.preventDefault();
    console.log(e.target)
    let newTodo = input.value.trim()
    if (newTodo) {
            addNewTodo({
            text: newTodo,
        })
        saveTodoList()
    }
    input.value = ''
    input.focus()
})

function addNewTodo(todo) {

    const li = document.createElement('li')
    li.innerHTML = `
        <span>${todo.text}</span>
        <i class="fa-solid fa-trash-can"></i>
    `
    if (todo.status === 'completed') {
        li.setAttribute('class', 'completed')
    }

    li.addEventListener('click', function() {
        li.classList.toggle('completed')
        saveTodoList()
    })

    li.querySelector('i').addEventListener('click', function() {
        this.parentElement.remove()
        saveTodoList()
    })

    document.querySelector('ul').appendChild(li)
}

function saveTodoList() {
    const todoList = document.querySelectorAll('li')
    const todoStorage = []
    if (todoList !== []) {todoList.forEach(todo => {
        let text = todo.querySelector('span').innerText
        console.log(text)
        let status = todo.getAttribute('class')
        todoStorage.push({
            text,
            status
        })
    })};
    localStorage.setItem('todolist', JSON.stringify(todoStorage))
}

function initTodo() {
    let data = JSON.parse(localStorage.getItem('todolist'))
    if (data) {data.forEach(todo => {
        addNewTodo(todo)
    })}
}

initTodo()

