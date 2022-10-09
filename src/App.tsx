import React, { useCallback, useState } from 'react'
import usePapago from './hooks/usePapago'
import useToxicityPrecition from './hooks/useToxicityPrecition'
import { Message } from './types'

const getFeeling = (threshold?: number) => {
  if (!threshold) return '🤔'
  if (threshold < 0.5) {
    return '😁'
  }
  if (threshold < 0.8) {
    return '🤨'
  }
  return '🤬'
}

const App = () => {
  const [messages, setMessages] = useState<Message[]>([])
  const [message, setMessage] = useState('')
  const { predict, predictions } = useToxicityPrecition(0.9)
  const { translate } = usePapago()

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

  return (
    <div className="bg-gray-100 min-h-screen w-full flex justify-center items-center">
      <div className="min-h-[400px] max-w-[500px] w-full bg-gray-300 shadow-lg">
        <ul className="min-h-[400px] max-w-[600px] bg-gray-300 p-3 flex flex-col gap-1 items-end overflow-y-scroll max-h-[700px]">
          {messages?.map((msg, i) => (
            <li key={`${msg}-${+i}`} className="flex items-center justify-center gap-2">
              <p className="bg-white p-2 w-fit rounded-2xl">
                {getFeeling(msg?.prediction?.[6]?.results[0]?.probabilities[1])}
                {msg.message}
              </p>
            </li>
          ))}
        </ul>
        <form
          className="bg-white w-full flex focus-within:outline-blue-300 focus-within:outline"
          onSubmit={onSubmitMessage}
        >
          <input
            className="bg-white p-2 outline-none w-[calc(100%-45px)]"
            onChange={onChangeMessage}
          />
          <button
            className="bg-yellow-500 text-white p-2 text-sm rounded-lg w-[45px]"
            type="submit"
          >
            전송
          </button>
        </form>
      </div>
    </div>
  )
}

export default App
