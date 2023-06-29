import React from 'react'
import { useSelector } from 'react-redux'
import { Paragraph } from '../../styles/components/Common-styles'

export const Home = () => {
  const username = useSelector((state) => state.auth?.user?.name)

  return <div>{username && <Paragraph>Welcome {username}</Paragraph>}</div>
}
