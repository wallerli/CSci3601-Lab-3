import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {Observable} from 'rxjs';
import { of } from 'rxjs';
import {FormsModule} from '@angular/forms';

import {CustomModule} from '../custom.module';

import {Todo} from './todo';
import {TodoListComponent} from './todo-list.component';
import {TodoListService} from './todo-list.service';

describe('Todo list', () => {

  let todoList: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;

  let todoListServiceStub: {
    getTodos: () => Observable<Todo[]>
  };

  beforeEach(() => {
    // stub TodoService for test purposes
    todoListServiceStub = {
      getTodos: () => of([
        {
          id: 'first',
          owner: 'Blanche',
          status: false,
          body: 'First, create a web page',
          category: 'software design'
        },
        {
          id: 'second',
          owner: 'Fry',
          status: false,
          body: 'Second, take a Minecraft break.',
          category: 'video games'
        },
        {
          id: 'third',
          owner: 'Fry',
          status: true,
          body: 'Third, finish intro 101 course homework.',
          category: 'homework'
        },
        {
          id: 'fourth',
          owner: 'Blanche',
          status: true,
          body: 'Fourth, code Minecraft video game into web page.',
          category: 'software design'
        },
        {
          id: 'fifth',
          owner: 'Workman',
          status: true,
          body: 'Fifth, pick up Ramen and Oreos!',
          category: 'groceries'
        }
      ])
    };

    TestBed.configureTestingModule({
      imports: [CustomModule],
      declarations: [TodoListComponent],
      // providers:    [ TodoListService ]  // NO! Don't provide the real service!
      // Provide a test-double instead
      providers: [{provide: TodoListService, useValue: todoListServiceStub}]
    });
  });

  beforeEach(async(() => {
    TestBed.compileComponents().then(() => {
      fixture = TestBed.createComponent(TodoListComponent);
      todoList = fixture.componentInstance;
      fixture.detectChanges();
    });
  }));

  it('contains all the todos', () => {
    expect(todoList.todos.length).toBe(5);
  });

  it('contains a todo owned by \'Workman\'', () => {
    expect(todoList.todos.some((todo: Todo) => todo.owner === 'Workman')).toBe(true);
  });

  it('contain to-dos owned by \'Blanche\'', () => {
    expect(todoList.todos.some((todo: Todo) => todo.owner === 'Blanche')).toBe(true);
  });

  it('doesn\'t contain a todo owned by \'Emma\'', () => {
    expect(todoList.todos.some((todo: Todo) => todo.owner === 'Emma')).toBe(false);
  });

  it('has two to-dos with category software design', function () {
    expect(todoList.todos.filter((todo: Todo) => todo.category === 'software design').length).toBe(2);
  });

  it('has three to-dos with status true', function () {
    expect(todoList.todos.filter((todo: Todo) => todo.status === true).length).toBe(3);
  });
});

describe('Misbehaving Todo List', () => {
  let todoList: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;

  let todoListServiceStub: {
    getTodos: () => Observable<Todo[]>
  };

  beforeEach(() => {
    // stub TodoService for test purposes
    todoListServiceStub = {
      getTodos: () => Observable.create(observer => {
        observer.error('Error-prone observable');
      })
    };

    TestBed.configureTestingModule({
      imports: [FormsModule, CustomModule],
      declarations: [TodoListComponent],
      providers: [{provide: TodoListService, useValue: todoListServiceStub}]
    });
  });

  beforeEach(async(() => {
    TestBed.compileComponents().then(() => {
      fixture = TestBed.createComponent(TodoListComponent);
      todoList = fixture.componentInstance;
      fixture.detectChanges();
    });
  }));

  it('generates an error if we don\'t set up a TodoListService', () => {
    // Since the observer throws an error, we don't expect todos to be defined.
    expect(todoList.todos).toBeUndefined();
  });
});
