const { test, describe, expect, beforeEach } = require('@playwright/test')

describe('Blog Application', () => {

  // this is not working
  beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173')
  })

  test('front page can be opened', async ({ page }) => {

    const locator = await page.getByText('blogs')
    await expect(locator).toBeVisible()
    await expect(page.getByText('man does a tester 1 by testman ')).toBeVisible()
  })

  describe('Login', () => {
    test('form is shown by default', async ({ page }) => {
      await expect(page.locator('input[name="Username"]')).toBeVisible()
      await expect(page.locator('input[name="Password"]')).toBeVisible()
    })

    test('succeeds with correct credentials', async ({ page }) => {
      await page.getByRole('textbox').first().fill('root')
      await page.getByRole('textbox').last().fill('secret')
      await page.getByRole('button', { name: 'log in' }).click()
      await expect(page.getByText('logged in as root')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await page.getByRole('textbox').first().fill('root')
      await page.getByRole('textbox').last().fill('wrongpassword')
      await page.getByRole('button', { name: 'log in' }).click()
      await expect(page.getByText('wrong username or password')).toBeVisible()
    })
  })

  describe('When logged in', () => {

    beforeEach(async ({ page }) => {
      await page.fill('input[name="Username"]', 'root')
      await page.fill('input[name="Password"]', 'secret')
      await page.getByRole('button', { name: 'log in' }).click()
    })

    test('can create new blog', async ({ page }) => {

      await page.getByRole('button', { name: 'new blog' }).click()
      await page.getByPlaceholder('title').fill('new blog made in testing')
      await page.getByPlaceholder('author').fill('playwrigth')
      await page.getByPlaceholder('url').fill('https://playwright.com')
      await page.getByRole('button', { name: 'submit' }).click()
      await expect(page.getByText('added new blog made in')).toBeVisible()
    })

    test('can like a blog', async ({ page }) => {
      const blogElement = await page.locator('text=/new blog made in testing by playwrigthview/i').first()
      await expect(blogElement).toBeVisible()

      const viewButton = await blogElement.locator('button', { hasText: 'view' })
      await expect(viewButton).toBeVisible()
      await viewButton.click()

      const likeButton = await blogElement.getByRole('button', { name: 'like' })
      await likeButton.click()
    })
  })
})  