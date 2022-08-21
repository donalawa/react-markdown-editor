import type { NextPage } from 'next'
import HeaderMobile from '../components/Header/Header'
import Sidebar from '../components/Sidebar/Sidbar'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.sidebar}>
          <Sidebar />
      </div>
      <div className={styles.main}>
        <HeaderMobile />
      </div>
    </div>
  )
}

export default Home
