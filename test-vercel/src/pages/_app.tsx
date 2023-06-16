import { initializeFirebaseApp } from '@/features/auth/lib/firebase'
import { AuthContextProvider } from '@/features/auth/context/AuthContext'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import { LoadingContextProvider } from '@/features/root/context/LoadingContext'
import { ConfirmContextProvider } from '@/features/root/context/ConfirmContext'

initializeFirebaseApp()

const apolloClient = new ApolloClient({
  uri: `${process.env.NEXT_PUBLIC_BACKEND_URL}/graphql`,
  cache: new InMemoryCache({
    typePolicies: {
      User: {
        fields: {
          createdAt: {
            read(value) {
              return new Date(value)
            },
          },
          updatedAt: {
            read(value) {
              return new Date(value)
            },
          },
        },
      },
    },
  }),
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthContextProvider>
      <ConfirmContextProvider>
        <LoadingContextProvider>
          <ApolloProvider client={apolloClient}>
            <Component {...pageProps} />
          </ApolloProvider>
        </LoadingContextProvider>
      </ConfirmContextProvider>
    </AuthContextProvider>
  )
}
