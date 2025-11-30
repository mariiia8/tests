const { test, expect } = require('@playwright/test');

test('todo assertions test - add, complete and verify task', async ({ page }) => {
  test.setTimeout(45000);

  await page.goto('https://demo.playwright.dev/todomvc', {
    waitUntil: 'domcontentloaded',
    timeout: 15000
  });

  await page.waitForSelector('.new-todo', { timeout: 10000 });
  console.log('Приложение загружено');

  const todoInput = page.locator('.new-todo');
  await todoInput.fill('Learn Playwright');
  await todoInput.press('Enter');
  console.log('Задача "Learn Playwright" добавлена');

  const todoItem = page.locator('.todo-list li').first();
  const todoCheckbox = todoItem.locator('.toggle');
  const todoLabel = todoItem.locator('label');

  console.log('Проверки до отметки задачи:');
  
  await expect(todoItem).toBeVisible();
  console.log('Задача видна в списке');

  await expect(todoLabel).toHaveText('Learn Playwright');
  console.log('Задача имеет текст "Learn Playwright"');

  await expect(todoCheckbox).not.toBeChecked();
  console.log('Чекбокс не отмечен (ожидаемо)');

  await expect(todoItem).not.toHaveClass('completed');
  console.log('Задача не имеет класс completed (ожидаемо)');

  await todoCheckbox.check();
  console.log('Задача отмечена как завершенная');

  console.log('🔍 Проверки после отметки задачи:');

  await expect(todoItem).toBeVisible();
  console.log('Задача все еще видна');

  await expect(todoCheckbox).toBeChecked();
  console.log('Чекбокс отмечен');
  
  await expect(todoItem).toHaveClass('completed');
  console.log('Задача имеет класс completed');

  await expect(todoLabel).toHaveText('Learn Playwright');
  console.log('Текст задачи сохранился');

  console.log('все утверждения пройдены успешно!');
});