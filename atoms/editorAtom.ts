import { atom } from "recoil"
import { demoContent } from "../constants/data"

export const showPreviewowOnlyState = atom({
    key: 'showPreviewowOnlyState',
    default: false,
})

export const currentActiveFileState = atom({
  key: "currentActiveFile",
  default: 'default'
})

export const currentFileContentState = atom({
  key: "currentActiveContent",
  default: demoContent.content
})

