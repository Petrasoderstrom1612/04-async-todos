import "./assets/scss/app.scss";
import {fetchTodos, saveTodos, deleteTodo, updateTodo} from "./services/TodosApi";
import type{ Todo} from "./services/Types"

//DOM references
const todosEl = document.querySelector<HTMLUListElement>("#todos")!;
const newTodoFormEl = document.querySelector<HTMLFormElement>("#new-todo-form")!;
const newTodoTitleEl = document.querySelector<HTMLInputElement>("#new-todo-title")!;


console.log("Environment variables:", import.meta.env);
const BASE_URL = import.meta.env.BASE_URL;
console.log(BASE_URL)

export let todos: Todo[] = []; //you have to declare it locally so you can control it

const fetchTodosAndRender = async () => {
	todos = await fetchTodos() //now giving it value(otherwise you need to redeclare this todos = data in axios)
	renderTodos()
}


//Render todos to DOM
const renderTodos = () => {
	todosEl.innerHTML = todos
		.map(todo => {																					//dataset todoId
			return `<li class="list-group-item d-flex justify-content-between align-items-center" data-todo-id="${todo.id}">
				<span class="todo-item">
					<input type="checkbox" class="me-2 checkbox" ${todo.completed ? "checked" : ""} />
					<span class="todo-title">${todo.title}</span>
				</span>
				<span class="todo-actions">
					<button class="btn btn-warning edit-btn" data-action="edit">Edit</button>
					<button class="btn btn-danger delete-btn" data-action="delete">Delete</button>
				</span>
			</li>`;
		})
		.join("");
}

//List for new todo form being submitted

todosEl.addEventListener("click", async (e) => { //no need to declare e, typescript deducts it from "click"
	const target = e.target as HTMLElement //I do not know which html element but I am sure it is html el
    const clickedId = Number(target.closest("li")?.dataset.todoId);

    if(!clickedId) return //if I had several li's
    console.log("id from the click", clickedId)
	const clickedTodo = todos.find((todo) => todo.id === clickedId)
	if(!clickedTodo) return 

	if (target.dataset.action === "delete") {
		await deleteTodo(clickedId);
	}

	if (target.classList.contains("checkbox")) {
		await updateTodo(clickedId, {completed : !clickedTodo.completed});
	}
	if (target.dataset.action === "edit") {
		const titleEl = document.querySelector(".todo-title") as HTMLElement;
		const currentTitle = titleEl.textContent;
		const newTitle = prompt("Edit title", currentTitle)

		if (newTitle && newTitle !== ""){
			await updateTodo(clickedId, {title: newTitle});
		}
	}
    await fetchTodosAndRender();
});


newTodoFormEl.addEventListener("submit", async (e) => {
	e.preventDefault();

	const newTodoTitle = newTodoTitleEl.value.trim();

	// 🚔
	if (newTodoTitle.length < 3) {
		alert("That's too short todo to do, better do it right now!");
		return;
	}

	await saveTodos({ //no need to declare again as it has the same form as declared in types 🐫
		title: newTodoTitle,
		completed: false,
	})

	fetchTodosAndRender();
	newTodoTitleEl.value = "";
	console.log("Great success!", todos);
});

// Render initial list of todos
fetchTodosAndRender();
