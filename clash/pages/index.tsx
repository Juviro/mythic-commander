import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>MYC Clash</title>
        <meta name="description" content="App in progress" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Hier entsteht eine freshe App</h1>
    </div>
  )
}
