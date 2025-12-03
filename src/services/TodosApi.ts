import type{ Todo, CreateTodoPayload, UpdateTodoPayload} from "./Types"

import axios from "axios";
import { AxiosError } from 'axios';


console.log(import.meta.env.VITE_API_BASEURL) //when .env is created in the root - directly under src the .env the variables you add get added to the default existing ones (but for console.log VITE does not show DB_PASSWORD) !Also make sure .env is not in .gitignore for when you deploy to Netlify
const BASE_URL = import.meta.env.VITE_API_BASEURL
//    ^?

const handleError = (error: unknown) => {
    if(error instanceof AxiosError){
    alert("Something went wrong" + error.message)
    console.log(error)
    throw Error(`error message: ${error.message}`)
    } else{
        alert("Something unexpected happened")
        console.log("Something unexpected happened")
    }
}


export const fetchTodos = async (): Promise<Todo[]> => {
	try {
		const res = await fetch(`${BASE_URL}/todos`) //denna startar hämtningen och ger mig ett löfte om att återkomma med en respons(uppfyld eller bruten)

        if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
        }

		const data = await res.json() as Todo[]; //needed as Typescript does not read 5 when fetching, it will assign any
		console.log("data", data)
		// todos = data


		return data
	} catch (error){
		handleError(error)
        return[]
	}	

}

// export const fetchTodos = async () => { //the same as the fetch above, axios takes care of content type (JSON) but also if res is not ok
//     const res = await axios.get<Todo[]>(`${BASE_URL}/todos`)
//      console.log("AXIOS GET DATA:", res.data);
//     return res.data
// }

export const saveTodos = async (newTodo: CreateTodoPayload) => {
    try {
    const res = await fetch(`${BASE_URL}/todos`,{
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTodo)
    })
    
    if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json() as Todo[];
    console.log("data", data)
    return data

    } catch (error){
    handleError(error)
    }
    
}

// export const saveTodos = async (newTodo: CreateTodoPayload) => { //the same as the fetch above, axios takes care of content type (JSON) but also if res is not ok
//     const res = await axios.post<Todo[]>(`${BASE_URL}/todos`,newTodo)
//     return res.data
// }

// export const deleteTodo = async (e, deletedTodo: Todo) => {
//     if(e.document.target)
// }

// export const deleteTodo = async(oneObjId: string) => {
//     try {
//         const res = await fetch(`${BASE_URL}/todos/${oneObjId}`,{
//             method: "DELETE",
//             headers: { "Content-Type": "application/json" },
//         })
        
//         if (!res.ok) {
//             throw new Error(`HTTP error! status: ${res.status}`);
//     }
    
//     console.log("deleted item with id: ", oneObjId)
    
// } catch (error){
//     throw new Error(`error: ${error}`)
// }

// }

export const deleteTodo = async(oneObjId: number) => {
    try{
    const res = await axios.delete(`${BASE_URL}/todos/${oneObjId}`)
    console.log("AXIOS GET DATA:", res.data);
    return true;
    }
    catch(error){
        handleError(error)
    }

}


// const fetchOneTodo = async (oneObjId: number) => {
//     try {
//     const res = await fetch(`${BASE_URL}/todos/${oneObjId}`) //denna startar hämtningen och ger mig ett löfte om att återkomma med en respons(uppfyld eller bruten)

//     if (!res.ok) {
//     throw new Error(`HTTP error! status: ${res.status}`);
//     }

//     const data = await res.json() as Todo; //needed as Typescript does not read 5 when fetching, it will assign any
//     console.log("data", data)

//     return data
// 	} catch (error){
// 		throw Error(`error: ${error}`)
// 	}	

// }

export const updateTodo = async(oneObjId: number, updates: UpdateTodoPayload) => {
    try{
    const res = await axios.patch<Todo>(`${BASE_URL}/todos/${oneObjId}`, updates) //<Todo> ensures your promise is not any
    console.log("AXIOS PATCH DATA:", res.data);
    return res.data;
    }
    catch(error){
        handleError(error)
    }
}

// export const updateTodo = async(oneObjId: number, updates: UpdateTodoPayload) => {

//     if(oneObjId){
//         const editedTodo = await fetchOneTodo(oneObjId)
//         console.log("editedTodo", editedTodo)
//         try {
//         const res = await fetch(`${BASE_URL}/todos/${oneObjId}`,{
//             method: "PATCH",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify(updates)
//         })
        
//         if (!res.ok) {
//         throw new Error(`HTTP error! status: ${res.status}`);
//         }
    
//         const data = await res.json() as Todo[];
//         console.log("edited data", data)
//         return data
    
//         } catch (error){
//             throw new Error(`error: ${error}`)
//         }

//     }

// }

