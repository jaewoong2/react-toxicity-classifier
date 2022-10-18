import React, { PropsWithChildren } from 'react'

const Layout = ({ children, title }: PropsWithChildren<{ title?: React.ReactNode }>) => {
  return (
    <div className="bg-gray-100 min-h-screen w-full flex justify-center items-center flex-col">
      {title}
      <div className="min-h-[400px] max-w-[500px] w-full bg-gray-300 shadow-lg">{children}</div>
      <footer className="w-[500px] flex justify-end py-2">
        <a target="_blank" href="https://github.com/jaewoong2/22-graduation" rel="noreferrer">
          2022-2 @jaewoong2
        </a>
      </footer>
    </div>
  )
}

export default Layout
