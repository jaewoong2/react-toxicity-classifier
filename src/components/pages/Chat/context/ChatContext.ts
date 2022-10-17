import { Message } from '@/types'
import { createContext } from 'react'

type ChatValue = {
  message: string
  messages: Message[]
  isLoading: boolean
}

type ChatAction = {
  onChangeMessage: (e: React.ChangeEvent<HTMLInputElement>) => void
  onSubmitMessage: (e: React.FormEvent<HTMLFormElement>) => void
}

const initValue: ChatValue = {
  message: '',
  messages: [],
  isLoading: false,
}

const initAction: ChatAction = {
  onChangeMessage: () => {},
  onSubmitMessage: () => {},
}

export const ChatValueContext = createContext(initValue)
export const ChatActionContext = createContext(initAction)
