export interface projectProps {
  title: string
  description?: string
  content: projectElementProps[]
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
  tip = "tips",
}
