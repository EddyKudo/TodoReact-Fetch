import React, { useState } from "react";

//create your first component
export default function TodoList() {
	const [newTodo, setNewTodo] = useState("");
	const [todos, setTodos] = useState([{ id: 1, text: "build your life" }]);

	function handleNewTodoChange(e) {
		e.preventDefault();
		setNewTodo(e.target.value);
	}
	function handleTodoUponEnter(e) {
		e.preventDefault();
		if (newTodo === "") return;
		setTodos([...todos, { id: Date.now(), text: newTodo }]);
		e.target.reset();
	}
	function removeTodo(id) {
		setTodos(todos.filter(todo => todo.id != id));
	}

	return (
		<div className="text-center mt-5 todoBox mx-auto">
			<h1>Task List</h1>
			<form onSubmit={handleTodoUponEnter}>
				<input
					placeholder="New Task..."
					onChange={handleNewTodoChange}
				/>
				<ul className="todoList">
					{todos.map(todo => (
						<li key={todo.id} className="todoLine">
							{todo.text}
							<a
								className="float-right mr-2"
								onClick={() => removeTodo(todo.id)}>
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
