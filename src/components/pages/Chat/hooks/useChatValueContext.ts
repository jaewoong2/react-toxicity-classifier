import { useContext } from 'react'
import { ChatValueContext } from '../context/ChatContext'

const useChatValueContext = () => {
  return useContext(ChatValueContext)
}

export default useChatValueContext
