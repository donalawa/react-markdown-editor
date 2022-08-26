import { useEffect, useState } from 'react';
import styles from './Sidebar.module.css';
import { demoContent, untitledDocument } from '../../constants/data';
import { Document } from '../../interfaces';
import { currentFileContentState, currentActiveFileState } from '../../atoms/editorAtom';
import { useRecoilState, useRecoilValue } from 'recoil';

const Sidebar = () => { 
    let [allFiles, setAllFiles] = useState<Document[]>([])
    let [currentActive, setCurrentActive] = useRecoilState(currentFileContentState);
    let [currentActiveFileName, setCurrentActiveFileName] = useRecoilState(currentActiveFileState);

    const createNewFile = () => {
        let newFile: Document= {fileName: '', lastUpdatedDate: new Date(), content: ''};

        newFile.fileName = `untitled-document-${allFiles.length}`;
        newFile.content = ``;

        setAllFiles([...allFiles, newFile]);
        
        console.log("ALL FILES BEFORE SETTING");
        console.log(allFiles);

        localStorage.setItem("documents", JSON.stringify([...allFiles, newFile]));

        console.log("NEW ITEM IN LOCAL STORAGE")
    }

    const setActiveContent = (file: Document) => {
        setCurrentActive(file.content);
        setCurrentActiveFileName(file.fileName);
    }


    useEffect(() => {   
        let docs:any = localStorage.getItem('documents');
        let cleanDocs = JSON.parse(docs);

        // console.log('ALL AVAILABLE DOCS');
        // console.log(JSON.parse(docs));
        console.log(cleanDocs);
        if(docs != null) {
            setAllFiles(cleanDocs)
        }else {
            setAllFiles([demoContent, untitledDocument])
        }
        
    },[])
  
    return (
        <div className={styles.sidbarContainer}>
            <div className={styles.sidebar_title}>
                <p>MY DOCUMENTS</p>
            </div>
            <div className={styles.new_document}>
                <button onClick={createNewFile} className={styles.new_document_btn}>
                    <span>+ New Document</span>
                </button>
            </div>
            <div className={styles.files}>
                {
                    allFiles.map((file) => (
                        <div className={styles.file} onClick={() =>{setActiveContent(file)}}>
                            <svg width="14" height="16" xmlns="http://www.w3.org/2000/svg"><path d="M13.107 3.393c.167.167.31.393.429.678.119.286.178.548.178.786v10.286c0 .238-.083.44-.25.607a.827.827 0 0 1-.607.25h-12a.827.827 0 0 1-.607-.25.827.827 0 0 1-.25-.607V.857C0 .62.083.417.25.25A.827.827 0 0 1 .857 0h8c.238 0 .5.06.786.179.286.119.512.261.678.428l2.786 2.786ZM9.143 1.214v3.357H12.5c-.06-.172-.125-.294-.196-.366L9.509 1.411c-.072-.072-.194-.137-.366-.197Zm3.428 13.643V5.714H8.857a.827.827 0 0 1-.607-.25.827.827 0 0 1-.25-.607V1.143H1.143v13.714H12.57Z" fill="#FFF"/></svg>
                            <div className={styles.file_info}>
                                <span className={styles.file_date}>{file.lastUpdatedDate.toString()}</span>
                                <p className={styles.file_name}>{file.fileName}.md</p>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Sidebar;