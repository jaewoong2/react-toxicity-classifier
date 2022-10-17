import { Message } from '@/types'
import { useState, useCallback } from 'react'
import usePapago from './usePapago'
import useToxicityPrecition from './useToxicityPrecition'

const useMessage = () => {
  const [messages, setMessages] = useState<Message[]>([])
  const [message, setMessage] = useState('')
  const { isLoading: predictLoading, predict, predictions } = useToxicityPrecition(0.9)
  const { translate, isLoading: translateLoading } = usePapago()

  const onChangeMessage: React.ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
    setMessage(e.target.value)
  }, [])

  const onSubmitMessage: React.FormEventHandler<HTMLFormElement> = useCallback(
    async (e) => {
      e.preventDefault()
      const translatedMessage = await translate(message)
      const data = await predict([translatedMessage])
      setMessages((prev) => [...prev, { message, prediction: data }])
    },
    [message, predictions]
  )

  return {
    messages,
    message,
    onChangeMessage,
    onSubmitMessage,
    isLoading: predictLoading || translateLoading,
  }
}

export default useMessage
