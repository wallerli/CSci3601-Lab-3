import {Component, OnInit} from '@angular/core';
import {TodoListService} from './todo-list.service';
import {Todo} from './todo';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-todo-list-component',
  templateUrl: 'todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
  providers: []
})

export class TodoListComponent implements OnInit {
  // These are public so that tests can reference them (.spec.ts)
  public todos: Todo[];
  public filteredTodos: Todo[];

  public todoOwner: string;
  public todoStatus: string;
  public todoCategory: string;
  public todoBody: string;
  public todoAPI: string;


  // Inject the TodoListService into this component.
  // That's what happens in the following constructor.
  //
  // We can call upon the service for interacting
  // with the server.

  constructor(private todoListService: TodoListService) {
  }

  public updateAPI(newAPI: string): void{
    this.todoAPI = newAPI;
    console.log(this.todoAPI + " initialized");
    const todos: Observable<Todo[]> = this.todoListService.getTodosByRequest(this.todoAPI);
    todos.subscribe(
      returnedTodos => {
        this.filteredTodos = returnedTodos;
      },
      err => {
        console.log(err);
      });
    console.log(this.todoAPI + " loaded");
  }

  public updateOwner(newOwner: string): void {
    this.todoOwner = newOwner;
    this.updateFilter();
  }

  public updateStatus(newStatus: string): void {
    this.todoStatus = newStatus;
    this.updateFilter();
  }

  public updateCategory(newCategory: string): void {
    this.todoCategory = newCategory;
    this.updateFilter();
  }

  public updateBody(newBody: string): void {
    this.todoBody = newBody;
    this.updateFilter();
  }

  // public updateCategory(newCategory: string): void {
  //   this.todoCategory = newCategory;
  //   this.todoListService.getTodoByCategory(this.todoCategory);
  // }

  public updateFilter() {
    this.filteredTodos =
      this.todoListService.filterTodos(
        this.todos,
        this.todoOwner,
        this.todoStatus,
        this.todoCategory,
        this.todoBody);
  }

  /**
   * Starts an asynchronous operation to update the todos list
   *
   */
  ngOnInit(): void {
    const todos: Observable<Todo[]> = this.todoListService.getTodos();
    todos.subscribe(
      returnedTodos => {
        this.todos = returnedTodos;
      },
      err => {
        console.log(err);
      });
  }
}
