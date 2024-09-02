import { useState } from "react"
import blogService from '../services/blogs'


// Form for creating new blogs, not rendered unless user logged in
const BlogForm = ({ setBlogs, showNotification, blogFormRef }) => {
	const [title, setTitle] = useState('')
	const [author, setAuthor] = useState('')
	const [url, setUrl] = useState('')

	// Send post request to backend
	const blogSubmitHandler = async (event) => {
		event.preventDefault()
		try {
			const newBlog = {
				'title': title,
				'author': author,
				'url': url
			}
			const response = await blogService.postBlog(newBlog)
			showNotification(`added ${response.title} by ${response.author}`)
			setBlogs((prevBlogs) => prevBlogs.concat(response));
			setTitle('')
			setAuthor('')
			setUrl('')
			blogFormRef.current.changeVisibility()
			console.log('blog submitted ', response.title)
		}
		catch (exception) {
			showNotification(`error creating new blog`)
			console.log('error creating blog: ', exception)
		}
	}

	return (
		<form onSubmit={blogSubmitHandler}>
			<h2>add new blog</h2>
			<div>
				title
				<input
					type="text"
					value={title}
					name="Title"
					onChange={({ target }) => setTitle(target.value)}
				/>
			</div>
			<div>
				author
				<input
					type="text"
					value={author}
					name="Author"
					onChange={({ target }) => setAuthor(target.value)}
				/>
			</div>
			<div>
				url
				<input
					type="text"
					value={url}
					name="Url"
					onChange={({ target }) => setUrl(target.value)}
				/>
			</div>
			<button type="submit">submit</button>
		</form>
	)
}

export default BlogForm