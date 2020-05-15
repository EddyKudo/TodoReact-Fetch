import React, { useState, useEffect } from "react";
//create your first component
export default function TodoList() {
	const [newTodo, setNewTodo] = useState("");
	const [todos, setTodos] = useState([]);
	const api = "https://assets.breatheco.de/apis/fake/todos/user/eddykudo";
	useEffect(() => {
		syncAPI();
	}, []);

	function syncAPI() {
		fetch(api)
			.then(response => {
				if (!response.ok) {
					throw Error(response.text);
				}

				return response.json();
			})
			.then(data => {
				setTodos(data);
			})
			.catch(error => {
				console.error(error);
			});
	}

	function handleNewTodoChange(e) {
		e.preventDefault();
		setNewTodo(e.target.value);
	}
	function handleTodoUponEnter(e) {
		e.preventDefault();
		if (newTodo === "") return;

		fetch(api, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify([...todos, { label: newTodo, done: false }])
		})
			.then(response => {
				if (!response.ok) {
					throw Error(response.text);
				}

				return response.json();
			})
			.then(data => {
				// Resync our local component with API data
				syncAPI();
			})
			.catch(error => {
				console.error(error);
			});

		// reset current todo
		setNewTodo("");
		e.target.reset;
	}

	function removeTodo(index) {
		setTodos(todos.filter((todo, i) => i != index));
	}

	return (
		<div className="text-center mt-5 todoBox mx-auto">
			<h1>Task List</h1>
			<form onSubmit={handleTodoUponEnter}>
				<input
					placeholder=" New Task..."
					onChange={handleNewTodoChange}
				/>
				<ul className="todoList">
					{todos.map((todo, index) => (
						<li key={index} className="todoLine">
							{todo.label}
							<a
								className="float-right mr-2"
								onClick={() => removeTodo(index)}>
								<i className="fas fa-eraser" />
							</a>
						</li>
					))}
				</ul>
			</form>
		</div>
	);
}
export { TodoList };
