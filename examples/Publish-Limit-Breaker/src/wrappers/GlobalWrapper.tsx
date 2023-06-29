import React, { useCallback, useEffect } from 'react'
import { setUser } from '../globalState/authSlice'
import { useDispatch } from 'react-redux'

// @ts-ignore
export const GlobalWrapper = ({ children }) => {
  const dispatch = useDispatch()
  const askForAccountInformation = useCallback(async () => {
    try {
      let account = await qortalRequest({
        action: 'GET_USER_ACCOUNT'
      })

      const names = await qortalRequest({
        action: 'GET_ACCOUNT_NAMES',
        address: account.address
      })
      console.log({ names })
      if (names.length === 0) throw new Error('User has no registered name')
      const accountName = names[0]
      dispatch(setUser({ ...account, name: accountName.name }))
    } catch (error) {
      console.error(error)
    }
  }, [])

  useEffect(() => {
    askForAccountInformation()
  }, [])

  return <>{children}</>
}
