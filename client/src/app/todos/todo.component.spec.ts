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
          id: 'cw_id',
          owner: 'Blanche',
          status: false,
          body: 'Create a web page',
          category: 'software design'
        },
        {
          id: 'mc_id',
          owner: 'Fry',
          status: false,
          body: 'Take a Mine-craft break.',
          category: 'video games'
        },
        {
          id: 'hw_id',
          owner: 'Fry',
          status: true,
          body: 'Finish intro 101 course homework.',
          category: 'homework'
        },
        {
          id: 'wp-id',
          owner: 'Blanche',
          status: true,
          body: 'Code Mine-craft video game into web page.',
          category: 'software design'
        },
        {
          id: 'ro_id',
          owner: 'Workman',
          status: true,
          body: 'Pick up Ramen and Oreos!',
          category: 'groceries'
        }
      ].find(todo => todo.id === todoId))
    };

    TestBed.configureTestingModule({
      declarations: [TodoComponent],
      providers: [{provide: TodoListService, useValue: todoListServiceStub}]
    });
  });

  beforeEach(async(() => {
    TestBed.compileComponents().then(() => {
      fixture = TestBed.createComponent(TodoComponent);
      todoComponent = fixture.componentInstance;
    });
  }));

  it('can retrieve fifth todo by id', () => {
    todoComponent.setId('ro_id');
    expect(todoComponent.todo).toBeDefined();
    expect(todoComponent.todo.category).toBe('groceries');
    expect(todoComponent.todo.owner).toBe('Workman');
    expect(todoComponent.todo.status).toBe(true);
    expect(todoComponent.todo.body).toBe('Pick up Ramen and Oreos!');
  });

  it('returns undefined for Panda', () => {
    todoComponent.setId('Panda');
    expect(todoComponent.todo).not.toBeDefined();
  });

});
