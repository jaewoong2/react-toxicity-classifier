import React, { PropsWithChildren } from 'react'

const Message = ({ children }: PropsWithChildren) => {
  return (
    <li className="flex items-center justify-center gap-2">
      <p className="bg-white p-2 w-fit rounded-2xl">{children}</p>
    </li>
  )
}

export default Message
