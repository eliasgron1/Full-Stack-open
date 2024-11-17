export const sortByLikes = (blogs) => {
  const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)
  return sortedBlogs
}

export let token = null

export const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}
