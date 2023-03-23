import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../state/store'
import { useParams } from 'react-router-dom'

import { List, ListItem, Typography } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import BlogPostPreview from '../BlogList/PostPreview'
import { setIsLoadingGlobal } from '../../state/features/globalSlice'
import { BlogPost } from '../../state/features/blogSlice'
import { useFetchPosts } from '../../hooks/useFetchPosts'
import LazyLoad from '../../components/common/LazyLoad'
export const BlogIndividualProfile = () => {
  const navigate = useNavigate()
  const { user } = useSelector((state: RootState) => state.auth)
  const { blog, user: username } = useParams()
  const dispatch = useDispatch()
  const [userBlog, setUserBlog] = React.useState<any>(null)
  const { checkAndUpdatePost, getBlogPost, hashMapPosts } = useFetchPosts()

  const [blogPosts, setBlogPosts] = React.useState<BlogPost[]>([])

  const getBlogPosts = React.useCallback(async () => {
    let name = username

    if (!name) return
    if (!blog) return

    try {
      dispatch(setIsLoadingGlobal(true))
      const offset = blogPosts.length
      const url = `/arbitrary/resources/search?service=BLOG_POST&query=${blog}-post-&limit=2&name=${name}&includemetadata=true&offset=${offset}`
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const responseData = await response.json()

      const structureData = responseData.map((post: any): BlogPost => {
        return {
          title: post?.metadata?.title,
          category: post?.metadata?.category,
          categoryName: post?.metadata?.categoryName,
          tags: post?.metadata?.tags || [],
          description: post?.metadata?.description,
          createdAt: '',
          user: post.name,
          postImage: '',
          id: post.identifier
        }
      })
      setBlogPosts(structureData)
      const copiedBlogPosts: BlogPost[] = [...blogPosts]
      structureData.forEach((post: BlogPost) => {
        const index = blogPosts.findIndex((p) => p.id === post.id)
        if (index !== -1) {
          copiedBlogPosts[index] = post
        } else {
          copiedBlogPosts.push(post)
        }
      })
      setBlogPosts(copiedBlogPosts)

      for (const content of structureData) {
        if (content.user && content.id) {
          const res = checkAndUpdatePost(content)
          console.log({ res })
          if (res) {
            getBlogPost(content.user, content.id, content)
          }
        }
      }
    } catch (error) {
    } finally {
      dispatch(setIsLoadingGlobal(false))
    }
  }, [username, blog, blogPosts])
  const getBlog = React.useCallback(async () => {
    let name = username

    if (!name) return
    if (!blog) return
    try {
      const urlBlog = `/arbitrary/BLOG/${name}/${blog}`
      const response = await fetch(urlBlog, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const responseData = await response.json()
      setUserBlog(responseData)
    } catch (error) {}
  }, [username, blog, blogPosts])

  React.useEffect(() => {
    getBlog()
  }, [username, blog])
  const getPosts = React.useCallback(async () => {
    await getBlogPosts()
  }, [getBlogPosts])

  if (!userBlog) return null
  return (
    <>
      <Typography
        variant="h1"
        color="textPrimary"
        sx={{
          textAlign: 'center',
          marginTop: '20px'
        }}
      >
        {userBlog.title}
      </Typography>

      <List
        sx={{
          margin: '0px',
          padding: '10px',
          display: 'flex',
          flexWrap: 'wrap'
        }}
      >
        {blogPosts.map((post, index) => {
          const existingPost = hashMapPosts[post.id]
          let blogPost = post
          if (existingPost) {
            blogPost = existingPost
          }
          return (
            <ListItem
              onClick={() => {}}
              disablePadding
              sx={{
                display: 'flex',
                gap: 1,
                alignItems: 'center',
                width: 'auto',
                position: 'relative'
              }}
              key={blogPost.id}
            >
              <BlogPostPreview
                onClick={() => {
                  const str = blogPost.id
                  const arr = str.split('-post')
                  const str1 = arr[0]
                  navigate(`/${blogPost.user}/${str1}/${blogPost.id}`)
                }}
                description={blogPost?.description}
                title={blogPost?.title}
                createdAt={blogPost?.createdAt}
                author={blogPost.user}
                postImage={blogPost?.postImage}
              />

              {blogPost.user === user?.name && (
                <EditIcon
                  className="edit-btn"
                  sx={{
                    position: 'absolute',
                    zIndex: 10,
                    bottom: '25px',
                    right: '25px',
                    cursor: 'pointer'
                  }}
                  onClick={() => {
                    const str = blogPost.id
                    const arr = str.split('-post')
                    const str1 = arr[0]
                    navigate(`/${blogPost.user}/${str1}/${blogPost.id}/edit`)
                  }}
                />
              )}
            </ListItem>
          )
        })}
      </List>
      <LazyLoad onLoadMore={getPosts}></LazyLoad>
    </>
  )
}
