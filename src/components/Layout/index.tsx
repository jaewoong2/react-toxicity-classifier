import React, { PropsWithChildren } from 'react'

const Layout = ({ children, title }: PropsWithChildren<{ title?: React.ReactNode }>) => {
  return (
    <div className="bg-gray-100 min-h-screen w-full flex justify-center items-center flex-col">
      {title}
      <div className="min-h-[400px] max-w-[500px] w-full bg-gray-300 shadow-lg">{children}</div>
      <footer className="w-[500px] flex items-end py-2 text-xs text-gray-600 flex-col">
        <a target="_blank" href="https://github.com/jaewoong2/22-graduation" rel="noreferrer">
          2022-2 전자정보공학부 IT융합전공 졸업작품
        </a>
        <p>20160569 임재웅</p>
        <p>20160561 이창범</p>
      </footer>
    </div>
  )
}

export default Layout
