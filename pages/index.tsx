import type { NextPage } from 'next'
import HeaderMobile from '../components/Header/Header'
import Sidebar from '../components/Sidebar/Sidbar'
import Editor from '../components/Editor/Editor'

import styles from '../styles/Home.module.css'
import Output from '../components/Output/Output'

const Home: NextPage = () => {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.sidebar}>
          <Sidebar />
      </div>
      <div className={styles.main}>
        <HeaderMobile />
        <div className={styles.contentContainer}>
          <div className={styles.content}>
            <Editor />
          </div>
          <div className={styles.output}>
            <Output />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
