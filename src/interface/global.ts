export interface projectProps {
  title: string
  description?: string
  elements: projectElementProps[]
  author: string
}

export interface projectElementProps {
  type: projectElementTypes
  content?: string
  alt?: string //if element type is an image, provide an alt props
  source?: string //if element type is image, provide a source
}

export enum projectElementTypes {
  heading = "heading",
  subheading = "subheading",
  paragraph = "paragraph",
  image = "image",
  tip = "tip",
}

export enum projectUpdateActions {
  createFolder = "createFolder",
  deleteFolder = "deleteFolder",
  writeFile = "writeFile",
  deleteFile = "deleteFile",
  updateFile = "updateFile",
}
