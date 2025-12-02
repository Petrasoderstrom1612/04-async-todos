import "./assets/scss/app.scss";
import {fetchTodos} from "./services/TodosApi";
import type {Todo } from "./services/Types";
import {todos} from "./services/TodosApi";

//DOM references
const todosEl = document.querySelector<HTMLUListElement>("#todos")!;
const newTodoFormEl = document.querySelector<HTMLFormElement>("#new-todo-form")!;
const newTodoTitleEl = document.querySelector<HTMLInputElement>("#new-todo-title")!;

console.log("Environment variables:", import.meta.env);
const BASE_URL = import.meta.env.BASE_URL;
console.log(BASE_URL)


const saveTodos = async (newTodo: Todo) => {
		try {
		const res = await fetch("http://localhost:3000/todos",{
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(newTodo)
		})
		const data = await res.json() as Todo[];
		console.log("data", data)
		return data

	} catch (error){
		throw new Error(`error: ${error}`)
	}
	
}

const fetchTodosAndRender = async () => {
	await fetchTodos()
	renderTodos()
}



//Render todos to DOM
const renderTodos = () => {
	todosEl.innerHTML = todos
		.map(todo => {
			return `<li class="list-group-item d-flex justify-content-between align-items-center">
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
	const maxId = Math.max(0, ...todos.map(todo => todo.id) );

	const newTodo: Todo = {
		id: maxId + 1,
		title: newTodoTitle,
		completed: false,
	}

	// PUSH! 🫸🏻
	todos.push(newTodo);
	console.log(todos)

	// Save todos 🏊‍♀️🛟
	await saveTodos(newTodo);

	// Re-render todos
	fetchTodosAndRender();

	// Clear input field
	newTodoTitleEl.value = "";

	console.log("Great success!", todos);
});

// Render initial list of todos
fetchTodosAndRender();
