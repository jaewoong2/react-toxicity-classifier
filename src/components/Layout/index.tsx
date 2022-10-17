import React, { PropsWithChildren } from 'react'

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className="bg-gray-100 min-h-screen w-full flex justify-center items-center">
      <div className="min-h-[400px] max-w-[500px] w-full bg-gray-300 shadow-lg">{children}</div>
    </div>
  )
}

export default Layout
