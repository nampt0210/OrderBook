import React from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import RootComponent from './RootComponent'
import styles from 'src/styles/app.module.css'
import { persistor, store } from './store/reducers/store'

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <div className={styles.container}>
          <main className={styles.main}>
            <RootComponent />
          </main>
        </div>
      </PersistGate>
    </Provider>
  )
}

export default App
