export type Prediction = {
  label: string
  results: { probabilities: Float32Array; match: boolean }[]
}

export type Message = {
  message: string
  prediction?: Prediction[]
}

export type Translate = {
  message: {
    result: {
      srcLangType: string
      tarLangType: string
      translatedText: string
      engineType: string
    }
  }
}

export type Label =
  | 'identity_attack'
  | 'insult'
  | 'obscene'
  | 'severe_toxicity'
  | 'sexual_explicit'
  | 'threat'
  | 'toxicity'
