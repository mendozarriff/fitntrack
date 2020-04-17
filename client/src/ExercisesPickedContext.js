import React from 'react'

const ExercisesPickedContext = React.createContext()

export const ExercisesPickedProvider = ExercisesPickedContext.Provider
export const ExercisesPickedConsumer = ExercisesPickedContext.Consumer

export default ExercisesPickedContext