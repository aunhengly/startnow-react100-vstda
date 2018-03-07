import React, { Component } from 'react';

class Todo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            completed: false, //for checkbox
            isEditing: false,
            description: props.todo.description,
            priority: props.todo.priority,
        };
        this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
        this.handleBtnEdit = this.handleBtnEdit.bind(this);
        this.handleBtnDelete = this.handleBtnDelete.bind(this);
        this.handleBtnSave = this.handleBtnSave.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
    }
    handleUpdate(event) {
        let value = event.target.value;
        let name = event.target.name;
        this.setState({
            [name]: value,
        })
    }
    handleBtnSave(index) {
        this.props.handleBtnSave(this.state, index);
        this.setState({ isEditing: false })
        //console.log('It clicked on save', index);
    }
    handleCheckboxChange() {
        this.setState({ completed: !this.state.completed });
    }
    handleBtnEdit() {
        this.setState({ isEditing: !this.state.isEditing });
    }
    handleBtnDelete() {
        this.props.deleteTodo(this.state)
    }

    render() {
        return (

            <li className={`hengly success list-group-item list-group-item-${this.state.priority}`}>
                {this.state.isEditing ? (
                    <form onSubmit={e => e.preventDefault()}>
                        <div className="form-group">
                            <div className="line">
                                <label> Description</label>
                            </div>
                            <textarea className="update-todo-text desc" name="description" value={this.state.description} onChange={this.handleUpdate}></textarea>
                        </div>
                        <div className="form-group">
                            <label>Priority</label>
                            <select className="form-control create-todo-priority desc" value={this.state.priority} name="priority" onChange={this.handleUpdate}>
                                <option hidden value="hengly">Select a Priority</option>
                                <option value="danger">High</option>
                                <option value="warning">Medium</option>
                                <option value="success">Low</option>
                            </select>
                        </div>
                        <button className="btn btn-success btn-md update-todo" onClick={() => this.handleBtnSave(this.props.index)}>Save</button>
                    </form>
                ) : (
                        <div className="eric">
                            <div><input type="checkbox" name="checkbox" value={this.state.completed} onChange={this.handleCheckboxChange} /></div>
                            <div className="art"><p className={`overflow ${this.state.completed ? 'strike' : ''}`}>{this.props.todo.description}</p></div>
                            <div>
                                <span onClick={this.handleBtnEdit}><i className="fas edit-todo fa-edit edit-todo" name="btnedit" ></i></span>
                                <span onClick={this.handleBtnDelete}><i className="fas delete-todo fa-trash-alt delete-todo" name="btndelete"></i></span>
                            </div>
                        </div>
                    )}
            </li>
        );
    }

}

export default Todo;