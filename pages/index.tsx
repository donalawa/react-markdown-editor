import type { NextPage } from 'next'
import HeaderMobile from '../components/Header/Header'
import Sidebar from '../components/Sidebar/Sidbar'
import Editor from '../components/Editor/Editor'

import styles from '../styles/Home.module.css'
import Output from '../components/Output/Output'
import { useRecoilValue } from 'recoil'
import { navbarShowState } from '../atoms/navbarAtom';
import { showPreviewowOnlyState } from '../atoms/editorAtom'

const Home: NextPage = () => {

  let navbarActives = useRecoilValue(navbarShowState)
  let onlyPreview = useRecoilValue(showPreviewowOnlyState)

  return (
    <div className={styles.mainContainer}>
      <div className={navbarActives ? styles["sidebar"] : styles["sidebar_active"]}>
          <Sidebar />
      </div>
      <div className={navbarActives ? styles["nav_active"] : styles["main"]}>
        <HeaderMobile />
        <div className={styles.contentContainer}>
          <div className={onlyPreview ? styles["hide_content"] : styles["content"]}>
            <Editor />
          </div>
          <div className={onlyPreview ? styles["output_only"] : styles["output"]}>
            <Output />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
