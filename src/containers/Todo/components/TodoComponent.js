import React from "react"

export default class TodoComponent extends React.Component {
  constructor(props) {
    super(props)
  }

  handleClick = (event) => {
    event.preventDefault()
    const { params: { index } } = this.props
    this.props.handleClickDelete(index)
  }

  render() {
    const { params: { name, author } } = this.props
    
    return (
      <div>
        <span>Книга:</span>
        <span>{ name }</span>
				<br/>
        <span>Автор:</span>
        <span>{ author } </span>
				<br/>
        <button onClick={this.handleClick}>Удалить</button>
				<br/>
				<br/>
      </div>
    )
  }
}