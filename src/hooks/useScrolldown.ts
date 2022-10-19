import React, { useEffect } from 'react'

const useScrolldown = <T extends Element | null>(
  ref: React.MutableRefObject<T>,
  { trigger }: { trigger: React.DependencyList }
) => {
  const scrollDown = () => {
    ref?.current?.scrollTo({ behavior: 'smooth', top: ref?.current?.scrollHeight })
  }

  useEffect(() => {
    scrollDown()
  }, [...trigger])

  return scrollDown
}

export default useScrolldown
