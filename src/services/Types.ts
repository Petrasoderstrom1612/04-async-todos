// Initial state
export interface Todo {
	id: number;
	title: string;
	completed: boolean;
}

// export interface CreateTodoPayload {
// 	title: string;
// 	completed: boolean;
// }

export type CreateTodoPayload = Omit<Todo, "id"> //create a same type based on interface but without one property


