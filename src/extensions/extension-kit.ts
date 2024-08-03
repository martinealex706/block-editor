'use client'

import {
  Dropcursor,
  Placeholder,
  StarterKit,
  TextStyle,
} from '.'
import { CodeBlockLowlight } from '@tiptap/extension-code-block-lowlight'
// import { ImageUpload } from './ImageUpload'
// import { TableOfContentsNode } from './TableOfContentsNode'
// import { lowlight } from 'lowlight'

export const ExtensionKit = () => [
  Document,
  Selection,
  StarterKit.configure({
    document: false,
    dropcursor: false,
    heading: false,
    horizontalRule: false,
    blockquote: false,
    history: false,
    codeBlock: false,
  }),
  CodeBlockLowlight.configure({
    defaultLanguage: null,
  }),
  TextStyle,
  Highlight.configure({ multicolor: true }),
  Placeholder.configure({
    includeChildren: true,
    showOnlyCurrent: false,
    placeholder: () => '',
  }),
  Dropcursor.configure({
    width: 2,
    class: 'ProseMirror-dropcursor border-black',
  }),
]

export default ExtensionKit
