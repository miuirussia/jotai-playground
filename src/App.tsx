import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import styles from './App.module.css'

import { getDefaultStore, useAtomValue } from 'jotai';
import { bigAtom, smallAtom, suspenseAtom } from './atoms';

const store = getDefaultStore();

function App() {
  const value = useAtomValue(bigAtom);
  const username = useAtomValue(smallAtom);
  const atomResult = useAtomValue(suspenseAtom);
  const [count, setCount] = useState(0);

  console.log(atomResult);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (window as any).getAtomValue = () => {
    return store.get(smallAtom);
  };

  return (
    <>
      <div className={styles.main}>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React {username}</h1>
      <pre className={styles.pre}>{JSON.stringify(value, null, 2)}</pre>
      <div className={styles.card}>
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className={styles.readTheDocs}>
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
