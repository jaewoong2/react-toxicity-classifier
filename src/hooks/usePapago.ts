import { useCallback, useRef } from 'react'
import axios from 'axios'
import { Translate } from '@/types'
import { useMutation } from 'react-query'

const postTranslate = async (message: string) => {
  const data = await axios.post<Translate>(
    '/api/v1/papago/n2mt',
    { source: 'ko', target: 'en', text: message },
    {
      headers: {
        'X-Naver-Client-Id': import.meta.env.VITE_NAVER_CLIENT_ID,
        'X-Naver-Client-Secret': import.meta.env.VITE_NAVER_CLIENT_PASSWORD,
      },
    }
  )

  return data.data.message.result.translatedText
}

const usePapago = () => {
  const { mutate, ...mutation } = useMutation(postTranslate)
  const cache = useRef(new Map<string, string>())

  const translate = useCallback(async (message: string) => {
    const cachedMessage = cache.current.get(message)
    if (cachedMessage) {
      return cachedMessage
    }

    const papagoData = await postTranslate(message)
    cache.current.set(message, papagoData)
    mutate(papagoData)
    return papagoData
  }, [])

  return { mutate, translate, ...mutation }
}

export default usePapago
