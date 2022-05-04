import type { AppProps } from "next/app"
import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"
import { persistStore } from "redux-persist"
import Script from "next/script"

import Layout from "@/components/ui/layout"
import { TINY_API_TOKEN } from "@/constants"
import { store } from "@/app/store"
import "../styles/globals.css"

let persistor = persistStore(store)

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Script src={TINY_API_TOKEN} strategy="beforeInteractive" />
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </PersistGate>
      </Provider>
    </>
  )
}

export default MyApp
