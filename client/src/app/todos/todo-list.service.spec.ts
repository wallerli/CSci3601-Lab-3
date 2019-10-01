import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';
import {HttpClient} from '@angular/common/http';

import {Todo} from './todo';
import {TodoListService} from './todo-list.service';

describe('Todo list service: ', () => {
  // a small collection of test todos
  const testTodos: Todo[] = [
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
  ];
  let todoListService: TodoListService;
  // These are used to mock the HTTP requests so that we (a) don't have to
  // have the server running and (b) we can check exactly which HTTP
  // requests were made to ensure that we're making the correct requests.
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    // Set up the mock handling of the HTTP requests
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
    // Construct an instance of the service with the mock
    // HTTP client.
    todoListService = new TodoListService(httpClient);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('getTodos() calls api/todos', () => {
    // Assert that the todos we get from this call to getTodos()
    // should be our set of test todos. Because we're subscribing
    // to the result of getTodos(), this won't actually get
    // checked until the mocked HTTP request "returns" a response.
    // This happens when we call req.flush(testTodos) a few lines
    // down.
    todoListService.getTodos().subscribe(
      todos => expect(todos).toBe(testTodos)
    );

    // Specify that (exactly) one request will be made to the specified URL.
    const req = httpTestingController.expectOne(todoListService.todoUrl);
    // Check that the request made to that URL was a GET request.
    expect(req.request.method).toEqual('GET');
    // Specify the content of the response to that request. This
    // triggers the subscribe above, which leads to that check
    // actually being performed.
    req.flush(testTodos);
  });

  it('getTodoById() calls api/todos/id', () => {
    const targetTodo: Todo = testTodos[1];
    const targetId: string = targetTodo.id;
    todoListService.getTodoById(targetId).subscribe(
      todo => expect(todo).toBe(targetTodo)
    );

    const expectedUrl: string = todoListService.todoUrl + '/' + targetId;
    const req = httpTestingController.expectOne(expectedUrl);
    expect(req.request.method).toEqual('GET');
    req.flush(targetTodo);
  });

  it('filterTodos() filters by owner', () => {
    expect(testTodos.length).toBe(5);
    let todoOwner = 'a';
    expect(todoListService.filterTodos(testTodos, todoOwner, null, null, null).length).toBe(3);
  });

  it('filterTodos() filters by body content', () => {
    expect(testTodos.length).toBe(5);
    let todoContent = 'Mine-craft';
    expect(todoListService.filterTodos(testTodos, null, null, null, todoContent).length).toBe(2);
  });

  // parsing error somewhere that makes string status unreadable by required function.
  it('filterTodos() filters by status', () => {
    expect(testTodos.length).toBe(5);
    let todoStatus = 'complete';
    expect(todoListService.filterTodos(testTodos, null, todoStatus, null, null).length).toBe(3);
  });

  it('filterTodos() filters by category', () => {
    expect(testTodos.length).toBe(5);
    let todoCategory = 'video games';
    expect(todoListService.filterTodos(testTodos, null, null, todoCategory, null).length).toBe(1);
  });

  it('filterTodos() filters by combinations of fields', () => {
    expect(testTodos.length).toBe(5);
    let todoOwner = 'a';
    let todoStatus = 'incomplete';
    let todoCategory = 'software design';
    let todoContent = 'web page';
    expect(todoListService.filterTodos(testTodos, todoOwner, todoStatus, todoCategory, todoContent).length).toBe(1);
    expect(todoListService.filterTodos(testTodos, todoOwner, null, null, todoContent).length).toBe(2);
    expect(todoListService.filterTodos(testTodos, todoOwner, todoStatus, null, todoContent).length).toBe(1);
    expect(todoListService.filterTodos(testTodos, todoOwner, null, null, todoContent).length).toBe(2);
    expect(todoListService.filterTodos(testTodos, null, null, todoCategory, todoContent).length).toBe(2);
  });

});
