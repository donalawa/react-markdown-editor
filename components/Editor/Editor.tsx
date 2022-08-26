import styles from './Editor.module.css'
import { useRecoilState, useRecoilValue } from 'recoil';
import { showPreviewowOnlyState } from '../../atoms/editorAtom';
// var sanitizeHtml = require('sanitize-html');
import DOMPurify from 'isomorphic-dompurify';
import { currentFileContentState, currentActiveFileState } from '../../atoms/editorAtom'; 

import { demoContent } from "../../constants/data";
import { Document } from '../../interfaces';

const Editor = () => {
    const [showPreview, setShowPreview] = useRecoilState(showPreviewowOnlyState);

    const [currentContent, setCurrentContent] = useRecoilState(currentFileContentState)
    const activeFileName = useRecoilValue(currentActiveFileState)

    let cleanData = DOMPurify.sanitize(currentContent);
    

    const updateOutput = (e: any) => {
        // console.log("OUTPUT DATA")
        // console.log(e.currentTarget.textContent)
        setCurrentContent(e.currentTarget.textContent);
        updateStorage(e.currentTarget.textContent);
    }

    const updateStorage = (textData: string) => {
        let filesData: any = localStorage.getItem('documents');
        let allFiles: Document[] | any = JSON.parse(filesData);

        allFiles.forEach((file: Document, index: any) => {
            if(file.fileName == activeFileName) {
                allFiles[index].content = textData;
                return;
            }
        })
        // UPDATE LOCALSTORAGE
        localStorage.setItem('documents', JSON.stringify(allFiles));
    }
    

    const togglePreview = () => {
        setShowPreview(true);
    }

    return (
        <div className={styles.editorContainer}>
            <div className={styles.editor_header}>
                <p className={styles.editor_title}>MARKDOWN</p>
                <svg onClick={togglePreview} width="16" height="12" xmlns="http://www.w3.org/2000/svg"><path d="M7.784.003c4.782-.144 7.597 4.31 8.109 5.198a.8.8 0 0 1 0 .8c-.688 1.2-3.255 5.086-7.677 5.198h-.2c-4.71 0-7.405-4.326-7.909-5.198a.8.8 0 0 1 0-.8C.803 4.001 3.362.115 7.784.003Zm.38 1.6h-.3c-3.199.08-5.286 2.71-6.086 3.998C2.482 6.73 4.73 9.68 8.176 9.6c3.199-.08 5.262-2.711 6.086-3.999-.712-1.127-2.967-4.086-6.398-3.998ZM8 2.803A2.799 2.799 0 1 1 8 8.4a2.799 2.799 0 0 1 0-5.598Zm0 1.599A1.2 1.2 0 1 0 8 6.8a1.2 1.2 0 0 0 0-2.4Z" fill="#7C8187"/></svg>
            </div>
            <div className={styles.text_container}>
            <div className={styles.editor_text} suppressContentEditableWarning={true} onInput={updateOutput} contentEditable={true} >
                {cleanData}
            </div>
            </div>
        </div>
    )
}


export default Editor;