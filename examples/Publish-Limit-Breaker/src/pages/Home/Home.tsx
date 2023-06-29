import React from 'react'
import { useSelector } from 'react-redux'
import { Paragraph } from '../../styles/components/Common-styles'
import {RootState} from "../../globalState/store";

export const Home = () => {
  const username = useSelector((state: RootState) => state.auth?.user?.name)

  return <div>{username && <Paragraph>Welcome {username}</Paragraph>}</div>
}
