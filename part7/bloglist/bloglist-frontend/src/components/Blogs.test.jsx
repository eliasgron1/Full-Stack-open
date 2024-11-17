import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import ExpandedBlog from './ExpandedBlog'
import BlogForm from './BlogForm'

const user = {
  name: 'root',
  username: 'rootuser',
}

const blog = {
  title: 'Component testing is done with react-testing-library',
  author: 'test',
  url: 'www.jestdom.com',
  likes: 0,
  user: {
    name: 'root',
    username: 'rootuser',
  },
}

test('<Blog/> initially renders title & author, and not url & likes ', () => {
  const { container } = render(<Blog blog={blog} user={user} />)

  const titleAndAuthorElement = screen.getByText(
    /Component testing is done with react-testing-library by test/i
  )

  expect(titleAndAuthorElement).toBeDefined()

  const div = container.querySelector('.togglableContent')
  expect(div).toHaveStyle('display: none')
})

test('<Blog/> after clicking view, url and likes are shown', async () => {
  const { container } = render(<Blog blog={blog} user={user} />)

  const event = userEvent.setup()
  const button = screen.getByText(/view/i)
  await event.click(button)

  const div = container.querySelector('.togglableContent')
  expect(div).toHaveStyle('display: block')
})

test('<ExpandedBlog/> clicking the button calls the event handler once', async () => {
  const mockLikeHandler = vi.fn()

  render(<ExpandedBlog blog={blog} user={user} likeHandler={mockLikeHandler} />)

  const event = userEvent.setup()
  const likeButton = screen.getByText(/like/i)
  await event.click(likeButton)
  await event.click(likeButton)

  expect(mockLikeHandler.mock.calls).toHaveLength(2)
})

test('<BlogForm/>  calls event handler with correct details', async () => {
  const mockCreateBlog = vi.fn()

  render(<BlogForm createBlog={mockCreateBlog} />)

  const titleInput = screen.getByPlaceholderText('title')
  const authorInput = screen.getByPlaceholderText('author')
  const urlInput = screen.getByPlaceholderText('url')
  const submitButton = screen.getByText('submit')

  const event = userEvent.setup()
  await event.type(titleInput, 'New Blog')
  await event.type(authorInput, 'New Author')
  await event.type(urlInput, 'example.com')
  await event.click(submitButton)

  console.log('mock.calls', mockCreateBlog.mock.calls)
  expect(mockCreateBlog.mock.calls).toHaveLength(1)
  expect(mockCreateBlog).toHaveBeenCalledWith({
    title: 'New Blog',
    author: 'New Author',
    url: 'example.com',
  })
})
