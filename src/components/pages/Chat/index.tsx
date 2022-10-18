import React from 'react'
import Layout from '@/components/Layout'
import { ModalProvider } from '@jaewoong2/modal'
import MessageForm from './blocks/MessageForm'
import Messages from './blocks/Messages'
import ChatContextProvider from './context/ChatContextProvider'

const Chat = () => {
  return (
    <Layout>
      <ChatContextProvider>
        <ModalProvider>
          <Messages />
          <MessageForm />
        </ModalProvider>
      </ChatContextProvider>
    </Layout>
  )
}

export default Chat
