import React from 'react'
import { getKoreanLabel } from '@/utils'
import useChatValueContext from '../hooks/useChatValueContext'

const Predictions = ({ index }: { index: number }) => {
  const { messages, messageCache } = useChatValueContext()
  return (
    <>
      <h2 className="text-sm pb-4 italic">
        {messages?.[index]?.message} ({messageCache?.get(messages?.[index]?.message)})
      </h2>
      <div className="grid grid-cols-2 gap-2">
        {messages?.[index]?.prediction?.map((predict) => {
          return (
            <p
              key={predict.label + index}
              className="border rounded-xl p-2 text-sm hover:bg-gray-200 hover:text-gray-700"
            >
              {getKoreanLabel(predict.label)}
              {` - ${predict.results.map((v) =>
                (v.probabilities[1] * 100).toString().slice(0, 4)
              )}%`}
            </p>
          )
        })}
      </div>
    </>
  )
}

export default Predictions
