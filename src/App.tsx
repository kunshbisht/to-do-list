import { useEffect, useState } from "react";

type Task = {
	id: number;
	name: string;
	done: boolean;
};

export default function App() {
	const [tasks, setTasks] = useState<Task[]>(() => {
		const stored = localStorage.getItem("tasks");
		return stored ? JSON.parse(stored) : [];
	});
	const [inputValue, setInputValue] = useState("");

	useEffect(() => {
		localStorage.setItem("tasks", JSON.stringify(tasks));
		console.log(localStorage.getItem("tasks"));
	}, [tasks]);

	function handleSubmit() {
		if (!inputValue.trim()) return;
		setTasks(prev => [...prev, { id: Date.now(), name: inputValue, done: false }]);
		setInputValue("");
	}

	function removeTask(id: number) {
		setTasks(prev => prev.filter(task => task.id !== id));
	}

	function checkTask(id: number) {
		setTasks(prev =>
			prev.map(task =>
				task.id === id
					? { ...task, done: !task.done }
					: task
			)
		);
	}

	return (
		<div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 gap-6 px-4">
			<a href="https://portfolio-jade-pi-98.vercel.app" className="absolute left-5 top-5 text-blue-700 underline">&lt; Back to Portfolio</a>
			<h1 className="text-5xl font-bold tracking-tight">To-do list</h1>

			{/* Input */}
			<div className="flex w-full max-w-md gap-2">
				<input
					value={inputValue}
					onChange={e => setInputValue(e.currentTarget.value)}
					onKeyDown={e => e.key === "Enter" && handleSubmit()}
					className="flex-1 border rounded-xl px-4 py-2 text-lg focus:outline-none"
					type="text"
					placeholder="Task name..."
				/>
				<button
					onClick={handleSubmit}
					className="px-5 py-2 rounded-xl bg-blue-500 text-white font-medium hover:bg-blue-600 active:bg-blue-700 transition"
				>
					Add
				</button>
			</div>

			{/* List */}
			<div className="w-full max-w-md bg-white border rounded-2xl shadow-sm divide-y overflow-hidden">
				{tasks.length === 0 ? (
					<p className="p-4 text-center text-gray-400">No tasks yet</p>
				) : (
					tasks.map(task => (
						<div
							key={task.id}
							className="flex items-center justify-between px-4 py-3 hover:bg-slate-50"
						>
							<span
								className={`text-lg transition ${task.done ? "line-through text-gray-400" : ""}`}
							>
								{task.name}
							</span>
							<div className="flex gap-2 items-center">
								<button
									className={task.done
										? "p-2 rounded-lg border-2 border-transparent bg-blue-500 hover:bg-blue-600 active:bg-blue-700 transition"
										: "p-2 rounded-lg border-2 border-blue-500"
									}
									onClick={() => checkTask(task.id)}
								>
									<img className={`h-4 w-4 ${task.done ? '' : 'invert'}`} src="/check-solid-full.svg" />
								</button>
								<button
									className="p-2 rounded-lg border-2 border-transparent bg-red-500 hover:bg-red-600 active:bg-red-700 transition"
									onClick={() => removeTask(task.id)}
								>
									<img className="h-4 w-4" src="/trash-can-regular-full.svg" />
								</button>
							</div>
						</div>
					))
				)}
			</div>
		</div>
	);
}