import LoadingIcon from '@/components/atoms/LoadingIcon'
import React from 'react'
import useChatActionContext from '../hooks/useChatActionContext'
import useChatValueContext from '../hooks/useChatValueContext'

const MessageForm = () => {
  const { message, isLoading } = useChatValueContext()
  const { onChangeMessage, onSubmitMessage } = useChatActionContext()

  return (
    <form
      className="bg-white w-full flex focus-within:outline-blue-300 focus-within:outline"
      onSubmit={onSubmitMessage}
    >
      <input
        className="bg-white p-2 outline-none w-[calc(100%-45px)]"
        onChange={onChangeMessage}
        value={message}
      />
      <button
        className="bg-yellow-500 text-white p-2 text-sm rounded-lg w-[45px] flex items-center justify-center"
        type="submit"
      >
        {isLoading ? <LoadingIcon /> : '전송'}
      </button>
    </form>
  )
}

export default MessageForm
