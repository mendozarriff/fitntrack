import React from 'react'

const ExercisesContext = React.createContext()

export const ExercisesProvider = ExercisesContext.Provider
export const ExercisesConsumer = ExercisesContext.Consumer

export default ExercisesContext