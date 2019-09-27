import { browser, by , element , Key} from 'protractor';

export class TodoPage {
  navigateTo() {
    return browser.get('/todos');
  }

  // http://www.assertselenium.com/protractor/highlight-elements-during-your-protractor-test-run/
  highlightElement(byObject) {
    function setStyle(element, style) {
      const previous = element.getAttribute('style');
      element.setAttribute('style', style);
      setTimeout(() => {
        element.setAttribute('style', previous);
      }, 200);
      return 'highlighted';
    }

    return browser.executeScript(setStyle, element(byObject).getWebElement(), 'color: red; background-color: yellow;');
  }

  getTodoTitle() {
    let title = element(by.id('todo-list-title')).getText();
    this.highlightElement(by.id('todo-list-title'));

    return title;
  }

  // this for entering any of the search fields that will be on the webpage.
  // Field Inputs: 'todoOwner', 'todoStatus', 'todoCategory', 'todoContent'
  enterAField(field: string, content: string) {
    let input = element(by.id(field));
    input.click();
    input.sendKeys(content);
  }

  backspace() {
    browser.actions().sendKeys(Key.BACK_SPACE).perform();
  }

  getUniqueTodo(_id: string) {
    let todo = element(by.id(_id)).getText();
    this.highlightElement(by.id(_id));

    return todo;
  }
}
