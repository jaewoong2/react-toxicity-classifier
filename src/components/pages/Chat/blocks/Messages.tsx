import useScrolldown from '@/hooks/useScrolldown'
import { getFeeling } from '@/utils'
import { useModal } from '@jaewoong2/modal'
import React, { useCallback, useRef, useState } from 'react'
import Message from '../../../atoms/Message'
import useChatValueContext from '../hooks/useChatValueContext'
import Predictions from './Predictions'

const Messages = () => {
  const { messages } = useChatValueContext()
  const [currentMessage, setCurrentMessage] = useState(-1)

  const ref = useRef<HTMLUListElement>(null)

  const { show, hide } = useModal('text', {
    buttonText: '확인',
    message: '',
    onClickButton: () => hide(),
    description: <Predictions index={currentMessage} />,
  })

  const onClickMessage = useCallback(
    (i: number) => () => {
      setCurrentMessage(i)
      show()
    },
    []
  )

  useScrolldown(ref, {
    trigger: [messages],
  })

  return (
    <ul
      ref={ref}
      className="min-h-[400px] max-w-[600px] bg-gray-300 p-3 flex flex-col gap-1 items-end overflow-y-scroll max-h-[700px]"
    >
      {messages?.map((msg, i) => (
        <button
          key={`${msg}-${+i}`}
          type="button"
          className="flex gap-2 items-center"
          onClick={onClickMessage(i)}
        >
          <p className="text-xs text-gray-600 italic">
            {msg?.prediction?.[6]?.results[0]?.probabilities[1].toString().slice(0, 6)}
          </p>
          <Message key={`${msg}-${+i}`}>
            {getFeeling(msg?.prediction?.[6]?.results[0]?.probabilities[1])}
            {msg.message}
          </Message>
        </button>
      ))}
    </ul>
  )
}

export default Messages
