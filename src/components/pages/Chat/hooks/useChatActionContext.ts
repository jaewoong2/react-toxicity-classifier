import { useContext } from 'react'
import { ChatActionContext } from '../context/ChatContext'

const useChatActionContext = () => {
  return useContext(ChatActionContext)
}

export default useChatActionContext
