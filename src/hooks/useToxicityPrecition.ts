import '@tensorflow/tfjs'
import { load } from '@tensorflow-models/toxicity'
import { useCallback, useState } from 'react'

type Predictions = {
  label: string
  results: { probabilities: Float32Array; match: boolean }[]
}

const useToxicityPrecition = (initThreshold: number) => {
  const [predictions, setPredictions] = useState<Predictions[]>()
  const [isLoading, setIsLoading] = useState(false)
  const [threshold, setThreshold] = useState(initThreshold)

  const predict = useCallback(
    async (sentences: string[]) => {
      setIsLoading(true)
      const model = await load(threshold, [])
      const prediction = await model.classify(sentences)
      if (prediction) {
        setPredictions(prediction)
      }
      setIsLoading(false)
      return prediction
    },
    [threshold]
  )

  return { predictions, isLoading, predict, setThreshold }
}

export default useToxicityPrecition
