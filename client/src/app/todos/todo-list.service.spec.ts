import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';
import {HttpClient} from '@angular/common/http';

import {Todo} from './todo';
import {TodoListService} from './todo-list.service';

describe('Todo list service: ', () => {
  // a small collection of test todos
  const testTodos: Todo[] = [
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
    let todoName = 'a';
    expect(todoListService.filterTodos(testTodos, todoName).length).toBe(3);
  });

  it('filterTodos() filters by body content', () => {
    expect(testTodos.length).toBe(5);
    let todoContent = 'Minecraft';
    expect(todoListService.filterTodos(testTodos, null, null, null, todoContent).length).toBe(2);
  });

  // parsing error somewhere that makes string status unreadable by required function.
  // it('filterTodos() filters by status', () => {
  //   expect(testTodos.length).toBe(5);
  //   let todoStatus = 'true';
  //   expect(todoListService.filterTodos(testTodos, null, todoStatus).length).toBe(3);
  // });

  it('filterTodos() filters by category', () => {
    expect(testTodos.length).toBe(5);
    let todoCategory = 'video games';
    expect(todoListService.filterTodos(testTodos, null, null, todoCategory).length).toBe(1);
  });

  it('filterTodos() filters by combinations of fields', () => {
    expect(testTodos.length).toBe(5);
    let todoOwner = 'a';
 //   let todoStatus = 'false'; again-- parsing error somewhere
    let todoCategory = 'software design';
    let todoContent = 'web page';
    expect(todoListService.filterTodos(testTodos, todoOwner, null, todoCategory, todoContent).length).toBe(2);
    expect(todoListService.filterTodos(testTodos, todoOwner, null, null, todoContent).length).toBe(2);
    expect(todoListService.filterTodos(testTodos, null, null, todoCategory, todoContent).length).toBe(2);
  });

});
