import { createEditor, Editor, Transforms, Text } from 'slate'
import { Slate, Editable, withReact } from 'slate-react'
import { useCallback, useMemo, useState } from 'react'

const CodeElement = props => {
    return (
      <pre {...props.attributes}>
        <code className='hover:cursor-text m-2 text-sm font-light bg-navBar dark:bg-borderBlack rounded-lg overflow-x-scroll'>{props.children}</code>
      </pre>
    )
  }
  
  const DefaultElement = props => {
    return <p className='hover:cursor-text m-2 text-sm' {...props.attributes}>{props.children}</p>
  }
  
  const Leaf = props => {
    return (
      <span className='m-2 text-sm hover:cursor-text' {...props.attributes}
            style={{ fontWeight: props.leaf.bold ? "bold" : "normal" }}
            >
              {props.children}
            </span>
    )
  }
  
  const CustomEditor = {
    isBoldMarkActive(editor){
      const [match] = Editor.nodes(editor, {
        match: n => n.bold === true,
        universal: true,
      })
      return !!match
    },
    isCodeBlockActive(editor){
      const [match] = Editor.nodes(editor, {
        match: n => n.type === 'code',
      })
      return !!match
    },
    toggleBoldMark(editor){
      const isActive = CustomEditor.isBoldMarkActive(editor)
      Transforms.setNodes(
        editor,
        { bold: isActive ? null : true },
        { match: n => Text.isText(n), split: true }
      )
    },
    toggleCodeBlock(editor){
      const isActive = CustomEditor.isCodeBlockActive(editor)
      Transforms.setNodes(
        editor,
        { type: isActive ? null : 'code' },
        { match: n => Editor.isBlock(editor, n) }
      )
    },
  }

export default function TextAreaBody({value = null,showButtons = false}){
    const [editor] = useState(() => withReact(createEditor()))
  
    const initialValue = useMemo(
      () => value != null ? JSON.parse(value) : JSON.parse(localStorage.getItem('content')),
      []
    )
    
    const renderElement = useCallback(props => {
      switch(props.element.type){
        case 'code':
          return <CodeElement {...props} />
        default:
          return <DefaultElement {...props} />
      }
    })
  
    const renderLeaf = useCallback(props => {
      return <Leaf {...props} />
    },[])

    
    return(
      <Slate
       editor={editor}
       value={initialValue}
       onChange={value => {
        const isAstChange = editor.operations.some(
          op => 'set_selection' !== op.type
        )
        if(isAstChange){
          localStorage.setItem('content',JSON.stringify(value))
        }
       }}>

        {showButtons && (
            <div className='flex flex-row py-1 px-3 bg-formColor border-b w-full dark:bg-borderBlack'>
                <div
                className='hover:bg-gray-200 border-[1px] rounded-lg p-1 mx-2 hover:cursor-pointer'
                onMouseDown={event => {
                    event.preventDefault()
                    CustomEditor.toggleBoldMark(editor)
                }}
                >
                    <img src='/images/bold.svg' width='24px' height='24px' />
                </div>
        
                <div
                className='hover:bg-gray-200 border-[1px] rounded-lg p-1 mx-2 hover:cursor-pointer'
                onMouseDown={event => {
                    event.preventDefault()
                    CustomEditor.toggleCodeBlock(editor)
                }}
                >
                    <img src='/images/code.svg' width='24px' height='24px' />
                </div>
            </div>
        )}
  
        <Editable 
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          onKeyDown={event => {
            if(!event.ctrlKey){
              return
            }
  
            switch(event.key){
  
              case '`': {
                event.preventDefault()
  
                CustomEditor.toggleCodeBlock(editor)
                break
              }
  
              case 'b': {
                event.preventDefault()
  
                CustomEditor.toggleBoldMark(editor)
                break
              }
  
            }
          }
          } />
      </Slate>
    )
  }