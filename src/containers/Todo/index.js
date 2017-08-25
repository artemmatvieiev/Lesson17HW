import React from "react"
import TodoComponent from "./components/TodoComponent"

export default class TodoContainer extends React.Component {
	state = {
		todos: []
	}
	constructor(props){
		super(props)
	}
	componentDidMount() {
    this.setState({ todos: this.getTodos() })
  }
	handleSubmit = (event) => {
		event.preventDefault()
		if (this.inputNameComponent.value && this.inputAuthorComponent.value) {
			const todos = this.getTodos()
			todos.unshift({
				name: this.inputNameComponent.value,
				author: this.inputAuthorComponent.value
			})
			this.setState({ todos }, () => { 
				this.setTodos(todos)
				this.inputNameComponent.value = ""
				this.inputAuthorComponent.value = ""
			})
		}
	}
	setTodos(todos) {
    localStorage.setItem("todos", JSON.stringify(todos))
    return this
  }
	getTodos() {
    const toParseData = localStorage.getItem("todos")
    return toParseData && JSON.parse(toParseData) || []
  }
	handleClickDelete = (id) => {
		const { todos } = this.state
		const filtered = todos.filter((el, index) => index != id)
		this.setState({ todos: filtered }, () => this.setTodos(filtered))
	}
	render() {
		const { todos } = this.state
		return (
			<div>
				<form onSubmit={this.handleSubmit}>
					<input 
						type={"text"} 
						placeholder={"Введите название книги"} 
						ref={(input) => this.inputNameComponent = input}
					/>
					<input 
						type={"text"} 
						placeholder={"Введите автора книги"} 
						ref={(input) => this.inputAuthorComponent = input}
					/>
					<button type={"submit"}>Добавить книгу</button>
				</form>	
				<div>
					{ 
						todos.map((el, index) => (	
								<TodoComponent 
									key={index} 
	            		handleClickDelete={this.handleClickDelete}            
									params={{...el, index}}
								/>
							)
						) 
					}
				</div>
			</div>
		)
	}
}
