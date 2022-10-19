import useMessage from '@/hooks/useMessage'
import React, { PropsWithChildren, useMemo } from 'react'
import { ChatActionContext, ChatValueContext } from './ChatContext'

const ChatContextProvider = ({ children }: PropsWithChildren) => {
  const { message, messages, isLoading, onChangeMessage, onSubmitMessage, messageCache } =
    useMessage()

  const value = useMemo(() => {
    return {
      message,
      messages,
      isLoading,
      messageCache,
    }
  }, [message, messages, isLoading, messageCache])

  const action = useMemo(() => {
    return {
      onChangeMessage,
      onSubmitMessage,
    }
  }, [onChangeMessage, onSubmitMessage])

  return (
    <ChatValueContext.Provider value={value}>
      <ChatActionContext.Provider value={action}>{children}</ChatActionContext.Provider>
    </ChatValueContext.Provider>
  )
}

export default ChatContextProvider
