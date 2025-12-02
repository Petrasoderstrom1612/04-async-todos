import type{ Todo} from "./Types"

const BASE_URL = "http://localhost:3000"

export let todos: Todo[] = [];

export const fetchTodos = async () => {
	try {
		const res = await fetch(`${BASE_URL}/todos`) //denna startar hämtningen och ger mig ett löfte om att återkomma med en respons(uppfyld eller bruten)
		const data = await res.json() as Todo[]; //needed as Typescript does not read 5 when fetching, it will assign any
		console.log("data", data)
		todos = data
		return data
	} catch (error){
		throw Error(`error: ${error}`)
	}
	
}