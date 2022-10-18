export const getFeeling = (threshold?: number) => {
  if (!threshold) return '🤔'
  if (threshold < 0.2) {
    return '😃'
  }
  if (threshold < 0.3) {
    return '😕'
  }
  if (threshold < 0.5) {
    return '😕'
  }
  if (threshold < 0.8) {
    return '😨'
  }
  return '🤬'
}

export const getKoreanLabel = <T extends string>(label: T) => {
  if (label === 'identity_attack') {
    return '인신공격 정도'
  }
  if (label === 'insult') {
    return '모욕성 정도'
  }
  if (label === 'obscene') {
    return '외설 정도'
  }

  if (label === 'severe_toxicity') {
    return '심한 말 정도'
  }

  if (label === 'sexual_explicit') {
    return '성적 암시 정도'
  }

  if (label === 'threat') {
    return '위협적인 정도'
  }

  if (label === 'toxicity') {
    return '못된말 정도'
  }
}
