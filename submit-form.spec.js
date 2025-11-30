const { test, expect } = require('@playwright/test');

test('submit todo form and filter completed tasks', async ({ page }) => {

  test.setTimeout(45000);

  // 1. Открываем TodoMVC
  await page.goto('https://demo.playwright.dev/todomvc', {
    waitUntil: 'domcontentloaded',
    timeout: 20000
  });

  console.log('Страница загружена');

  await page.waitForSelector('.new-todo', { timeout: 10000 });
  console.log('Поле ввода найдено');

  const todoInput = page.locator('.new-todo');
  await todoInput.fill('Complete Playwright Course');
  await todoInput.press('Enter');
  
  console.log('Задача добавлена: Complete Playwright Course');

  const todoItems = page.locator('.todo-list li');
  await expect(todoItems).toHaveCount(1);
  await expect(todoItems).toHaveText('Complete Playwright Course');
  
  console.log('Задача успешно отображается в списке');

  const todoCheckbox = page.locator('.toggle');
  await todoCheckbox.check();
  
  await expect(todoCheckbox).toBeChecked();
  console.log('Задача отмечена как завершенная');

  const completedFilter = page.locator('a[href="#/completed"]');
  await completedFilter.click();
  
  console.log('Применен фильтр "Completed"');

  await page.waitForTimeout(1000);

  await expect(todoItems).toHaveCount(1);
  await expect(todoItems).toHaveText('Complete Playwright Course');
  
  console.log('Задача видна в фильтре "Completed" - тест пройден!');
});