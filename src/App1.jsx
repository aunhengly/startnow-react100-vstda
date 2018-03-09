import React, { Component } from 'react';
import Todo from './Todo';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todolist: [],
      description: '',
      priority: '',
    };
    this.handleInput = this.handleInput.bind(this);
    this.add = this.add.bind(this);
    this.handleDeleteTodo = this.handleDeleteTodo.bind(this);
    this.handleBtnSave = this.handleBtnSave.bind(this);
  }

  handleInput(event) {
    let value = event.target.value;
    let name = event.target.name;
    this.setState({
      [name]: value,
    });
  }

  add() {
    var todolist = [...this.state.todolist];
    var { priority, description } = this.state;
    todolist.push({ description, priority });
    this.setState({ todolist });
  }
  handleDeleteTodo(index){
    //Use index and slice from this.state.todolist
    var newList = [...this.state.todolist];
    var newArr  = newList.map(key => key.id).indexOf(index.id);
    newArr.splice(index, 1);
    this.setState({todolist: newArr});
    //console.log("AR is the terminator, DeleteToDo index", index);
  }
  handleBtnSave(todo, index){
    var todolist = [...this.state.todolist];
    todolist[index] = todo;
    this.setState({ todolist })
  }

  render() {
    return (
      <div className='container'>
        <div id="topheader">
          <h2>Very Simple Todo App</h2>
          <p>Track all of the things</p>
          <hr />
        </div>
        <div className="row">
          <div className="col-md-4">
            <div className="card">
              <div className="card-header">Add New Todo</div>
              <div className="card-body">
                <form>
                  <div className="form-group">
                    <label htmlFor="todolist"><b>I want to..</b></label>
                    <textarea className="create-todo-text" name="description" onChange={this.handleInput}></textarea>
                  </div>
                  <div className="form-group">
                    <label htmlFor="priorityFormControlSelect">How much of a priority is this?</label>
                    <select className="form-control create-todo-priority" defaultValue="hengly" name="priority" onChange={this.handleInput}>
                      <option hidden value="hengly">Select a Priority</option>
                      <option value="danger">High</option>
                      <option value="warning">Medium</option>
                      <option value="success">Low</option>
                    </select>
                  </div>
                </form>
              </div>
              <div className="card-footer">
                <button className="btn btn-success btn-md btn-block create-todo" name="btnAdd" type="submit" onClick={this.add}> Add</button>
              </div>
            </div>
          </div>

          <div className="col-md-8">
            <div className="card">
              <div className="card-header">View Todos</div>
              <div className="card-body" >
                {!this.state.todolist.length &&
                  <div>
                    <h4>Welcome to Very Simple Todo App!</h4>
                    <label className="welcome" name="welcome">Get started now by add a new todo on the left.</label>
                  </div>
                }
                {this.state.todolist.map((todo, index) => {
                  return (
                    <Todo
                     key={index} 
                     todo={todo} 
                     deleteTodo={this.handleDeleteTodo} 
                     index={index}
                     handleBtnSave={this.handleBtnSave} />
                    
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
