import { useCallback, useState } from 'react'
import axios from 'axios'
import { Translate } from '@/types'

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
  const [data, setData] = useState<any>()
  const [isLoading, setIsLoading] = useState(false)

  const translate = useCallback(async (message: string) => {
    setIsLoading(true)
    const papagoData = await postTranslate(message)
    setData(papagoData)
    setIsLoading(false)
    return papagoData
  }, [])
  return { isLoading, data, translate }
}

export default usePapago
