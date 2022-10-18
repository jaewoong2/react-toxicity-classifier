import '@tensorflow/tfjs'
import { load } from '@tensorflow-models/toxicity'
import { useCallback, useRef, useState } from 'react'

type Predictions = {
  label: string
  results: { probabilities: Float32Array; match: boolean }[]
}

const useToxicityPrecition = (initThreshold: number) => {
  const [predictions, setPredictions] = useState<Predictions[]>()
  const [isLoading, setIsLoading] = useState(false)
  const [threshold, setThreshold] = useState(initThreshold)
  const cache = useRef(new Map<string, Predictions[]>())

  const predict = useCallback(
    async (sentences: string[]) => {
      const cachePredict = cache.current.get(sentences[0])
      if (cachePredict) {
        setPredictions(cachePredict)
        return cachePredict
      }

      setIsLoading(true)
      const model = await load(threshold, [])
      const prediction = await model.classify(sentences)
      if (prediction) {
        cache.current.set(sentences[0], prediction)
        setPredictions(prediction)
      }
      setIsLoading(false)
      return prediction
    },
    [threshold]
  )

  return { predictions, isLoading, predict, setThreshold, cache }
}

export default useToxicityPrecition
