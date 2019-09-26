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


  // Inject the TodoListService into this component.
  // That's what happens in the following constructor.
  //
  // We can call upon the service for interacting
  // with the server.

  constructor(private todoListService: TodoListService) {

  }

  public updateName(newOwner: string): void {
    this.todoOwner = newOwner;
    this.updateFilter();
  }

  public updateAge(newStatus: string): void {
    this.todoStatus = newStatus;
    this.updateFilter();
  }

  public updateFilter() {
    this.filteredTodos =
      this.todoListService.filterTodos(
        this.todos,
        this.todoOwner,
        this.todoStatus);
  }

  /**
   * Starts an asynchronous operation to update the todos list
   *
   */
  ngOnInit(): void {
    const users: Observable<Todo[]> = this.todoListService.getTodos();
    users.subscribe(
      returnedTodos => {
        this.todos = returnedTodos;
      },
      err => {
        console.log(err);
      });
  }
}
