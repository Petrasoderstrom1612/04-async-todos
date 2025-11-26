import "./assets/scss/app.scss";
// import {fetchTodos} from "./services/TodosApi";

//DOM references
const todosEl = document.querySelector<HTMLUListElement>("#todos")!;
const newTodoFormEl = document.querySelector<HTMLFormElement>("#new-todo-form")!;
const newTodoTitleEl = document.querySelector<HTMLInputElement>("#new-todo-title")!;

console.log("Environment variables:", import.meta.env);
const BASE_URL = import.meta.env.BASE_URL;
console.log(BASE_URL)


// Initial state
interface Todo {
	id: number;
	title: string;
	completed: boolean;
}

// // Get JSON of Todos from localStorage
// const jsonTodos = localStorage.getItem("todos") ?? "[]";

// // Parse JSON into something we can use in JavaScript
// let todos: Todo[] = JSON.parse(jsonTodos);

// //Save todos to localStorage
// const saveTodos = () => {
// 	// Convert todos-array to JSON
// 	const jsonTodos = JSON.stringify(todos);

// 	// Save JSON to localStorage
// 	localStorage.setItem("todos", jsonTodos);
// }

/*
let todos: Todo[] = [
	{ id: 1, title: "🤓 Learn about TypeScript", completed: true },
	{ id: 2, title: "😇 Take over the world", completed: false },
	{ id: 3, title: "💰 Profit", completed: false },
	{ id: 4, title: "😈 Be nice", completed: true },
];
*/

let todos: Todo[] = [];

const fetchTodos = async () => {
	try {
		const res = await fetch("http://localhost:3000/todos")
		const data = await res.json() as Todo[];
		console.log("data", data)
		todos = data
		return data
	} catch (error){
		throw Error(`error: ${error}`)
	}
	
}

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
		throw Error(`error: ${error}`)
	}
	
}




//Render todos to DOM
const renderTodos = async () => {
	await fetchTodos()
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

newTodoFormEl.addEventListener("submit", (e) => {
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
	saveTodos(newTodo);

	// Re-render todos
	renderTodos();

	// Clear input field
	newTodoTitleEl.value = "";

	console.log("Great success!", todos);
});

// Render initial list of todos
renderTodos();
