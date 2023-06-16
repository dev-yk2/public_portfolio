import React, { ReactNode, createContext, useContext, useState } from 'react'

type LoadingState = {
  isLoading: boolean | null
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
}

const initialState: LoadingState = {
  isLoading: null,
  setIsLoading: () => {},
}

const LoadingContext = createContext<LoadingState>(initialState)

type Props = {
  children: ReactNode
}

export const LoadingContextProvider: React.FC<Props> = ({ children }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  return <LoadingContext.Provider value={{ isLoading, setIsLoading }}>{children}</LoadingContext.Provider>
}

export const useLoadingContext = () => useContext(LoadingContext)
