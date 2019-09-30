import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {Todo} from './todo';
import {TodoComponent} from './todo.component';
import {TodoListService} from './todo-list.service';
import {Observable} from 'rxjs';
import { of } from 'rxjs';

describe('Todo component', () => {

  let todoComponent: TodoComponent;
  let fixture: ComponentFixture<TodoComponent>;

  let todoListServiceStub: {
    getTodoById: (todoId: string) => Observable<Todo>
  };

  beforeEach(() => {
    // stub TodoService for test purposes
    todoListServiceStub = {
      getTodoById: (todoId: string) => of([
        {
          id: "first",
          owner: "Blanche",
          status: false,
          body: "First, create a web page",
          category: "software design"
        },
        {
          id: "second",
          owner: "Fry",
          status: false,
          body: "Second, take a Minecraft break.",
          category: "video games"
        },
        {
          id: "third",
          owner: "Fry",
          status: true,
          body: "Third, finish intro 101 course homework.",
          category: "homework"
        },
        {
          id: "fourth",
          owner: "Blanche",
          status: true,
          body: "Fourth, code Minecraft video game into web page.",
          category: "software design"
        },
        {
          id: "fifth",
          owner: "Blanche",
          status: true,
          body: "Fifth, pick up Ramen and Oreos!",
          category: "groceries"
        }
      ].find(todo => todo.id === todoId))
    };

    TestBed.configureTestingModule({
      declarations: [TodoComponent],
      providers: [{provide: TodoListService, useValue: todoListServiceStub}]
    })
  });

  beforeEach(async(() => {
    TestBed.compileComponents().then(() => {
      fixture = TestBed.createComponent(TodoComponent);
      todoComponent = fixture.componentInstance;
    });
  }));

  it('can retrieve fifth todo by id', () => {
    todoComponent.setId('fifth');
    expect(todoComponent.todo).toBeDefined();
    expect(todoComponent.todo.category).toBe('groceries');
    expect(todoComponent.todo.owner).toBe('Blanche');
    expect(todoComponent.todo.status).toBe(true);
    expect(todoComponent.todo.body).toBe('Fifth, pick up Ramen and Oreos!');
  });

  it('returns undefined for sixth', () => {
    todoComponent.setId('sixth');
    expect(todoComponent.todo).not.toBeDefined();
  });

});
