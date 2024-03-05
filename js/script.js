//Variables 

const formAddToDo = document.querySelector(".input-addtodo")
const ul = document.querySelector(".list-group")
const formSearchInput = document.querySelector(".input-search input")
const formAddToDoInput = document.querySelector(".input-addtodo input")
const formSearch = document.querySelector(".input-search")
const section = document.querySelector("section")
const container = document.querySelector("container")

//Variables 

//Arrow Functions

const addDisplayFlex = (value) => {
  value.classList.add("display-on")
  value.classList.remove("display-off")
}

const removeDisplayFlex = (value) => {
  value.classList.add("display-off")
  value.classList.remove("display-on")
}

const ulInnerHTML = (value) => {
  ul.innerHTML += `<li class="list-group-item display-on">
    ${value}<div class="action">
    <i class="fa-solid fa-trash delete"></i>
    <input type="checkbox" class="inputc" ></div>
  </li>`
}

const eventSearch = () => {
  const inputValue = event.target.value.trim().toLowerCase()
  const array = Array.from(ul.children)

  array.forEach((lis) => {
    const validation = lis.textContent.toLowerCase().includes(inputValue)
    validation ? addDisplayFlex(lis) : removeDisplayFlex (lis)
    })
}

//Arrow Functions

//Search Event

formSearchInput.addEventListener("input", (event) => {
  event.preventDefault()
  eventSearch()
});

formSearch.addEventListener("submit", (event) => {
  event.preventDefault()
})

//Search Event

//Reset Search Input Event

formAddToDoInput.addEventListener("focus", (event) => {
  event.preventDefault();
  const inputValue = formSearchInput.value.trim()

  if (inputValue.length) {
    formSearchInput.value = ""
    Array.from(ul.children).forEach((lis) => {addDisplayFlex(lis)})
  }
})

//Reset Search Input Event

//Add toDo Event

formAddToDo.addEventListener("submit", (event) => {
  event.preventDefault()
  const inputValue = event.target.add.value.trim()
  
  if (inputValue.length) {
    creatTodoLocalStorage(inputValue)
    event.target.reset()
  }
})

//Add toDo Event

//Delet Element Of DOM and LocalStorage Function

const deleteTodosLocalStorage = (target) => {
  const value = target.textContent.trim()
  const array = getTodosLocalStorage().filter((item) => item != value)
  
  localStorage.setItem("li", JSON.stringify(array))
  target.classList.add('ul-remove')
  
  setTimeout(() => {target.remove()},2000)
}
//Delet Element Of DOM and LocalStorage Function

//Delete Element Event

ul.addEventListener("click", (event) => {
  const elementClicked = event.target
  const liClicked = elementClicked.parentElement.parentElement
  const ifDeleted = elementClicked.classList.contains("delete")
  
  if (ifDeleted) {
    liClicked.remove()
    deleteTodosLocalStorage(liClicked)
  }
})

document.addEventListener("click", (event) => {
  const target = event.target
  const parentElementOfTarget = target.parentElement.parentElement
  const validationTarget = target.classList.contains("inputc")

  setTimeout(() => {
    if (validationTarget) {deleteTodosLocalStorage(parentElementOfTarget)}}, 1000)
})

//Delete Element Event

//GetItems Of LocalStorage Function

const getTodosLocalStorage = () => {
  const li = JSON.parse(localStorage.getItem("li")) || []

  return li
}

//GetItems Of LocalStorage Function

//SaveItems in LocalStorage Function

const saveTodosLocalStorage = () => {
  const todos = getTodosLocalStorage()
  
  for (const key in todos) {
    ulInnerHTML(todos[key])
  }
}

saveTodosLocalStorage()

//SaveItems in LocalStorage Function

//Create of Items In DOM With Data Of LocalStorage

const creatTodoLocalStorage = (value) => {
  const todos = getTodosLocalStorage()

  todos.push(value)
  localStorage.setItem("li", JSON.stringify(todos))

  ulInnerHTML(value)
}

//Create of Items In DOM With Data Of LocalStorage