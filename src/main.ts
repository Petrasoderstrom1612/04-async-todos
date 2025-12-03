import "./assets/scss/app.scss";
import {fetchTodos, saveTodos} from "./services/TodosApi";
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
					<input type="checkbox" class="me-2" ${todo.completed ? "checked" : ""} />
					<span class="todo-title">${todo.title}</span>
				</span>
				<span class="todo-actions">
					<button class="btn btn-warning">Edit</button>
					<button class="btn btn-danger">Delete</button>
				</span>
			</li>`;
		})
		.join("");
}

//List for new todo form being submitted

newTodoFormEl.addEventListener("submit", async (e) => {
	e.preventDefault();

	const newTodoTitle = newTodoTitleEl.value.trim();

	// 🚔
	if (newTodoTitle.length < 3) {
		alert("That's too short todo to do, better do it right now!");
		return;
	}

	// Find the highest ID among all todos
	//const maxId = Math.max(0, ...todos.map(todo => todo.id) ); //no longer control over this

	// const newTodo: Todo = {
	// 	id: maxId + 1,
	// 	title: newTodoTitle,
	// 	completed: false,
	// }

	await saveTodos({ //no need to declare again as it has the same form as declared in types 🐫
		title: newTodoTitle,
		completed: false,
	})

	// PUSH! 🫸🏻
	// todos.push(newTodo);
	// console.log(todos)

	// // Save todos 🏊‍♀️🛟
	// await saveTodos(newTodo);

	// saveTodos(newTodo);
	// Re-render todos
	fetchTodosAndRender();

	// Clear input field
	newTodoTitleEl.value = "";

	console.log("Great success!", todos);
});

// Render initial list of todos
fetchTodosAndRender();
