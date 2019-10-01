import {TodoPage} from './todo-list.po';
import {browser, protractor} from 'protractor';

let origFn = browser.driver.controlFlow().execute;

// https://hassantariqblog.wordpress.com/2015/11/09/reduce-speed-of-angular-e2e-protractor-tests/
browser.driver.controlFlow().execute = function () {
  let args = arguments;

  // queue 100ms wait between test
  // This delay is only put here so that you can watch the browser do its' thing.
  // If you're tired of it taking long you can remove this call
  origFn.call(browser.driver.controlFlow(), function () {
    return protractor.promise.delayed(10);
  });

  return origFn.apply(browser.driver.controlFlow(), args);
};

describe('Todo List', () => {
  let page: TodoPage;

  beforeEach(() => {
    page = new TodoPage();
  });

  it('should get and highlight todo title attribute', () => {
    page.navigateTo();
    expect(page.getTodoTitle()).toEqual('Todos');
  });

  it('should type something into owner filter box and check that it returned the correct elements', () => {
    page.navigateTo();
    // Testing owner filtering
    page.enterAField('todoOwner', 'F');
    let returnedStr = page.getUniqueTodo('Ullamco irure laborum magna dolor non. Anim occaecat adipisicing cillum eu magna in.').toString();
    expect(returnedStr.substr(returnedStr.lastIndexOf(' ')) === 'DONE: Ullamco irure laborum magna dolor non. Anim occaecat adipisicing cillum eu magna in.'
    );

    page.navigateTo();
    page.enterAField('todoOwner', 'b');
    expect(page.getUniqueTodo('Qui officia excepteur officia ex anim ad ullamco Lorem. Pariatur cupidatat aliqua excepteur laboris nostrud elit laborum do aliqua.')).toEqual(
      'TODO: Qui officia excepteur officia ex anim ad ullamco Lorem. Pariatur cupidatat aliqua excepteur laboris nostrud elit laborum do aliqua.'
    );
    page.enterAField('todoOwner', 'blanche');
    expect(page.getUniqueTodo('Aliqua ut proident sunt minim. Sunt cupidatat ullamco reprehenderit sit Lorem.')).toEqual(
      'TODO: Aliqua ut proident sunt minim. Sunt cupidatat ullamco reprehenderit sit Lorem.'
    );
  });

  it('should type something into status filter box and check that it returned the correct elements', () => {
    page.navigateTo();
    page.enterAField('todoStatus', 'Complete');
    expect(page.getUniqueTodo('Excepteur anim mollit magna amet in cillum. Elit quis aliqua elit mollit eu.')).toEqual(
      'DONE: Excepteur anim mollit magna amet in cillum. Elit quis aliqua elit mollit eu.'
    );
  });

  it('should type something into content filter box and check that it returned the correct elements', () => {
    page.navigateTo();
    page.enterAField('todoContent', 'Lorem');
    expect(page.getUniqueTodo('Cupidatat ex Lorem aute laboris mollit minim minim velit laborum ad culpa consectetur enim ut. Pariatur ad elit in est aliqua.')).toEqual(
      'DONE: Cupidatat ex Lorem aute laboris mollit minim minim velit laborum ad culpa consectetur enim ut. Pariatur ad elit in est aliqua.'
    );
  });

  it('should type something into category filter box and check that it returned correct elements.', () => {
    page.navigateTo();
    page.enterAField('todoCategory', 'homework');
    expect(page.getUniqueTodo('Do ullamco cupidatat id mollit veniam ad non laborum. Sint deserunt officia reprehenderit labore et cillum.'
    )).toEqual(
      'DONE: Do ullamco cupidatat id mollit veniam ad non laborum. Sint deserunt officia reprehenderit labore et cillum.'
    );
  });

  it('should type something into multiple filters and check that correct elements are returned.', () => {
    page.navigateTo();
    page.enterAField('todoOwner', 'Blanche');
    page.enterAField('todoContent', 'Lorem');
    page.enterAField('todoCategory', 'homework');
    page.enterAField('todoStatus', 'complete');
    expect(page.getUniqueTodo('Sunt Lorem velit minim non ea incididunt dolore esse Lorem fugiat. Id Lorem irure aute duis esse laborum ut et.')).toEqual(
      'DONE: Sunt Lorem velit minim non ea incididunt dolore esse Lorem fugiat. Id Lorem irure aute duis esse laborum ut et.'
    );

    page.navigateTo();
    page.enterAField('todoOwner', 'Workman');
    page.enterAField('todoContent', 'dolore');
    page.enterAField('todoCategory', 'software');
    expect(page.getUniqueTodo('Consequat dolore amet pariatur ad excepteur proident anim non nulla aliqua. Pariatur tempor culpa sint adipisicing do.')).toEqual(
      'TODO: Consequat dolore amet pariatur ad excepteur proident anim non nulla aliqua. Pariatur tempor culpa sint adipisicing do.'
    );
  });

  it('should type something into api request field and check that correct elements are returned', () => {
    page.navigateTo();
    page.enterAField('apiRequest', 'owner=Barry&contains=Lorem');
    page.selectEnterKey();
    expect(page.getUniqueTodo('Labore reprehenderit Lorem adipisicing non. Sit incididunt commodo dolor do id.')).toEqual(
      'TODO: Labore reprehenderit Lorem adipisicing non. Sit incididunt commodo dolor do id.'
    );
  });
});
