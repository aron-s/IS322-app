import React from 'react'

export const Block = ({headerText, subtitleText}) => {
  return (
    <div>
        <h1>{headerText}</h1>
        <h2>{subtitleText}</h2>
    </div>

  )
}
