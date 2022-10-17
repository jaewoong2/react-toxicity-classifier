import { ModalProvider } from '@jaewoong2/modal'
import React from 'react'
import MessageForm from './blocks/MessageForm'
import Messages from './blocks/Messages'
import ChatContextProvider from './context/ChatContextProvider'

const Chat = () => {
  return (
    <ChatContextProvider>
      <ModalProvider>
        <Messages />
        <MessageForm />
      </ModalProvider>
    </ChatContextProvider>
  )
}

export default Chat
