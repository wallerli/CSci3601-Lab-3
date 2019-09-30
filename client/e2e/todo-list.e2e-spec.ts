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
    return protractor.promise.delayed(100);
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
    expect(page.getUniqueTodo("58895985c1849992336c219b")).toEqual("Fry");
    page.backspace();
    page.enterAField('todoOwner', 'Blanche');
    expect(page.getUniqueTodo("588959850ccede43cc675826")).toEqual("Blanche");
    expect(page.getUniqueTodo("5889598528c4748a0292e014")).toThrowError();
  });

  it('should type something into content filter box and check that it returned the correct elements', () => {
    page.navigateTo();
    // Testing content filtering
    page.enterAField('todoContent', 'Deserunt velit reprehenderit deserunt');
    expect(page.getUniqueTodo("58895985847a6c1445ec4048")).toEqual("Fry");
    page.backspace();

  });

});
