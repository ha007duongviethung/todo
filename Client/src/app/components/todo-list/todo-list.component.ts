import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import axios from 'axios';
import { Todo } from 'src/app/models/todo.model';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  id!: any;
  todoList!: Todo[];
  todo!: Todo;
  accountAction!: boolean;
  user!: User;

  constructor(private router: Router) {
    this.todo = new Todo();
    this.accountAction = false;
  }

  ngOnInit(): void {
    this.validateUser();
  }

  validateUser(): void {
    let _id = localStorage.getItem('token');
    if(_id) {
      this.id = JSON.parse(_id);
      axios.get(`https://server-todolist.onrender.com/api/user/${this.id}`).then((res) => {
        this.user = res.data.user;
        this.fetchAllTodo();
      }).catch(
        () => {
          this.router.navigate(['/login']);
        }
      )
    } else this.router.navigate(['/login']);
  }

  logout(): void {
    this.user = new User();
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  fetchAllTodo(): void {
    axios.get(`https://server-todolist.onrender.com/api/todo/user/${this.id}`).then((res) => {
      this.todoList = res.data.todos;
    }).catch((err) => console.log(err))
  }

  addNewTodo(): void {
    if(this.todo.title) {
      this.todo.userId = this.id;
      axios.post('https://server-todolist.onrender.com/api/todo', this.todo).then(() => {
        this.todo = new Todo();
        this.fetchAllTodo();
      }).catch(err => console.log(err))
    }
  }

  removeTodo(todoId: string): void {
    if(todoId) {
      axios.delete(`https://server-todolist.onrender.com/api/todo/${todoId}`).then(() => {
        this.todo = new Todo();
        this.fetchAllTodo();
      }).catch(err => console.log(err))
    }
  }

  updateTodo(todoId: string): void {
    if(todoId) {
      const todoUpdate = this.todoList.find(todo => todo._id === todoId) as Todo;
      axios.put(`https://server-todolist.onrender.com/api/todo`, todoUpdate).then(() =>{
        this.fetchAllTodo();
      }).catch(err => console.log(err))
    }
  }
}
