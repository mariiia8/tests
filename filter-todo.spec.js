const { test, expect } = require('@playwright/test');

test('todo test with multiple URL options', async ({ page }) => {
  test.setTimeout(40000);

  // Список рабочих URL TodoMVC
  const urls = [
    'https://todomvc.com/examples/vanillajs/',
    'https://todomvc.com/examples/react/',
    'https://todomvc.com/examples/vue/',
    'https://todomvc.com/examples/angularjs/'
  ];

  let success = false;
  
  for (const url of urls) {
    try {
      console.log(`Пробуем URL: ${url}`);
      await page.goto(url, { timeout: 15000, waitUntil: 'domcontentloaded' });
      
      // Пробуем найти поле ввода
      await page.waitForSelector('.new-todo', { timeout: 5000 });
      console.log(`Успешно загружено: ${url}`);
      success = true;
      break;
      
    } catch (error) {
      console.log(`URL ${url} не сработал: ${error.message}`);
      continue;
    }
  }

  if (!success) {
    throw new Error('Ни один из URL TodoMVC не сработал');
  }

  // Остальная логика теста
  const input = page.locator('.new-todo');
  
  await input.fill('Task 1');
  await input.press('Enter');
  
  await input.fill('Task 2');
  await input.press('Enter');

  await expect(page.locator('.todo-list li')).toHaveCount(2);
  
  await page.locator('.toggle').first().check();
  
  await page.click('a[href="#/completed"]');
  
  await expect(page.locator('.todo-list li')).toHaveCount(1);
  await expect(page.locator('.todo-list li').first()).toHaveText('Task 1');
});