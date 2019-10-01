import {TodoPage} from './todo-list.po';
import {browser, protractor} from 'protractor';

let origFn = browser.driver.controlFlow().execute;

// https://hassantariqblog.wordpress.com/2015/11/09/reduce-speed-of-angular-e2e-protractor-tests/
browser.driver.controlFlow().execute = function () {
  let args = arguments;

  // This delay is only put here so that you can watch the browser do its' thing.
  // If you're tired of it taking long you can remove this call
  origFn.call(browser.driver.controlFlow(), function () {
    return protractor.promise.delayed(25);
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

    page.enterAField('todoOwner', 'F');
    expect(page.getUniqueTodo('Ullamco irure laborum magna dolor non. Anim occaecat adipisicing cillum eu magna in.')).toEqual(
      'DONE: Ullamco irure laborum magna dolor non. Anim occaecat adipisicing cillum eu magna in.'
    );

    page.navigateTo();
    page.enterAField('todoOwner', 'b');
    expect(page.getUniqueTodo('Qui officia excepteur officia ex anim ad ullamco Lorem. Pariatur cupidatat aliqua excepteur laboris nostrud elit laborum do aliqua.')).toEqual(
      'TODO: Qui officia excepteur officia ex anim ad ullamco Lorem. Pariatur cupidatat aliqua excepteur laboris nostrud elit laborum do aliqua.'
    );

    page.navigateTo();
    page.enterAField('todoOwner', 'blanche');
    expect(page.getUniqueTodo('Aliqua ut proident sunt minim. Sunt cupidatat ullamco reprehenderit sit Lorem.')).toEqual(
      'TODO: Aliqua ut proident sunt minim. Sunt cupidatat ullamco reprehenderit sit Lorem.'
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

  it('should type something into status filter box and check that it returned the correct elements', () => {
    page.navigateTo();
    page.enterAField('todoStatus', 'Complete');
    expect(page.getUniqueTodo('Excepteur anim mollit magna amet in cillum. Elit quis aliqua elit mollit eu.')).toEqual(
      'DONE: Excepteur anim mollit magna amet in cillum. Elit quis aliqua elit mollit eu.'
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

    expect(page.getUniqueTodo('Aliqua adipisicing ex magna quis esse cupidatat veniam non ullamco aute nisi dolore. Sint non adipisicing officia eu adipisicing non deserunt in ex magna consectetur esse tempor.')).toEqual(
      'TODO: Aliqua adipisicing ex magna quis esse cupidatat veniam non ullamco aute nisi dolore. Sint non adipisicing officia eu adipisicing non deserunt in ex magna consectetur esse tempor.'
    );
  });

  it('should type something into api request field and check that correct elements are returned', () => {
    page.navigateTo();
    page.enterAField('apiRequest', 'owner=Barry&contains=Lorem');
    page.selectEnterKey();
    expect(page.getUniqueTodo('Laborum pariatur in et ipsum occaecat qui occaecat enim ut adipisicing nisi cupidatat magna veniam. Amet ullamco veniam Lorem officia aute consectetur aliquip quis laborum fugiat velit incididunt.')).toEqual(
      'DONE: Laborum pariatur in et ipsum occaecat qui occaecat enim ut adipisicing nisi cupidatat magna veniam. Amet ullamco veniam Lorem officia aute consectetur aliquip quis laborum fugiat velit incididunt.'
    );

    expect(page.getUniqueTodo('Veniam commodo exercitation consequat eu ut duis ex do. Sit fugiat cupidatat enim Lorem tempor minim sint laboris.')).toEqual(
      'TODO: Veniam commodo exercitation consequat eu ut duis ex do. Sit fugiat cupidatat enim Lorem tempor minim sint laboris.'
    );
  });
});
