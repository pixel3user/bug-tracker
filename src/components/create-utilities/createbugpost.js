import { addDoc, collection } from 'firebase/firestore'
import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { database } from '../../firebase'
import { createEditor, Editor, Transforms, Text } from 'slate'
import { Slate, Editable, withReact } from 'slate-react'
import TextAreaBody from '../textEditor'


// const CodeElement = props => {
//   return (
//     <pre {...props.attributes}>
//       <code className='hover:cursor-text m-2 text-sm font-light bg-navBar rounded-lg overflow-x-scroll'>{props.children}</code>
//     </pre>
//   )
// }

// const DefaultElement = props => {
//   return <p className='hover:cursor-text m-2 text-sm' {...props.attributes}>{props.children}</p>
// }

// const Leaf = props => {
//   return (
//     <span className='m-2 text-sm hover:cursor-text' {...props.attributes}
//           style={{ fontWeight: props.leaf.bold ? "bold" : "normal" }}
//           >
//             {props.children}
//           </span>
//   )
// }

// const CustomEditor = {
//   isBoldMarkActive(editor){
//     const [match] = Editor.nodes(editor, {
//       match: n => n.bold === true,
//       universal: true,
//     })
//     return !!match
//   },
//   isCodeBlockActive(editor){
//     const [match] = Editor.nodes(editor, {
//       match: n => n.type === 'code',
//     })
//     return !!match
//   },
//   toggleBoldMark(editor){
//     const isActive = CustomEditor.isBoldMarkActive(editor)
//     Transforms.setNodes(
//       editor,
//       { bold: isActive ? null : true },
//       { match: n => Text.isText(n), split: true }
//     )
//   },
//   toggleCodeBlock(editor){
//     const isActive = CustomEditor.isCodeBlockActive(editor)
//     Transforms.setNodes(
//       editor,
//       { type: isActive ? null : 'code' },
//       { match: n => Editor.isBlock(editor, n) }
//     )
//   },
// }

// function TextAreaBody(){
//   const [editor] = useState(() => withReact(createEditor()))

//   const initialValue = useMemo(
//     () => JSON.parse(localStorage.getItem('content')) || [
//       {
//         type: 'paragraph',
//         children: [{ text: 'Add body here' }],
//       },
//     ],
//     []
//   )
  
//   const renderElement = useCallback(props => {
//     switch(props.element.type){
//       case 'code':
//         return <CodeElement {...props} />
//       default:
//         return <DefaultElement {...props} />
//     }
//   })

//   const renderLeaf = useCallback(props => {
//     return <Leaf {...props} />
//   },[])

  
//   return(
//     <Slate
//      editor={editor}
//      value={initialValue}
//      onChange={value => {
//       const isAstChange = editor.operations.some(
//         op => 'set_selection' !== op.type
//       )
//       if(isAstChange){
//         localStorage.setItem('content',JSON.stringify(value))
//       }
//      }}>

//       <div className='flex flex-row py-1 px-3 bg-formColor border-b w-full'>
//         <div
//           className='hover:bg-gray-200 border-[1px] rounded-lg p-1 mx-2 hover:cursor-pointer'
//           onMouseDown={event => {
//             event.preventDefault()
//             CustomEditor.toggleBoldMark(editor)
//           }}
//           >
//             <img src='/images/bold.svg' width='24px' height='24px' />
//           </div>

//         <div
//           className='hover:bg-gray-200 border-[1px] rounded-lg p-1 mx-2 hover:cursor-pointer'
//           onMouseDown={event => {
//             event.preventDefault()
//             CustomEditor.toggleCodeBlock(editor)
//           }}
//           >
//             <img src='/images/code.svg' width='24px' height='24px' />
//           </div>
//       </div>

//       <Editable 
//         renderElement={renderElement}
//         renderLeaf={renderLeaf}
//         onKeyDown={event => {
//           if(!event.ctrlKey){
//             return
//           }

//           switch(event.key){

//             case '`': {
//               event.preventDefault()

//               CustomEditor.toggleCodeBlock(editor)
//               break
//             }

//             case 'b': {
//               event.preventDefault()

//               CustomEditor.toggleBoldMark(editor)
//               break
//             }

//           }
//         }
//         } />
//     </Slate>
//   )
// }

export default function CreateBugPost() {
    const [title,settitle] = useState()
    const [tags,settags] = useState()
    const { id } = useParams()
    const navigate = useNavigate()

    async function createBugPost(e){                                          // form submit function
        e.preventDefault()
        try{
            await addDoc(collection(database.projects,id,'data'),{            // adding bug post data to project CollectionGroup data
                title: title,
                body: localStorage.getItem('content'),
                tags: tags || null,
                comments: [],
                answers: [],
                creationTime: database.getCurrentTimeStamp(),
                votes: []
            }).then(navigate(`/${id}/bugposts`))                              // redirecting to all bugposts after form submission
        }catch(error){
            console.log(error)
        }
    }
    
   return (
    <>

            <form className='flex flex-col m-10 p-2 border-[1.5px] border-formBorderColor bg-formColor dark:bg-black' onSubmit={createBugPost}>
                <label className='text-xl font-semibold mx-auto'>Create a Bug Post</label>
                <label className='flex flex-col m-3'>
                  <span className='text-md font-semibold'>Title</span>
                  <input required className='p-1 border-[1.5px] border-inputBorderColor rounded dark:text-black' placeholder='Title' onChange={e => settitle(e.target.value)}/>
                </label>
                <label className='flex flex-col m-3'>
                  <span className='text-md font-semibold'>Body</span>
                  <pre className='flex flex-col overflow-auto h-fit bg-white border-[1.5px] border-inputBorderColor rounded dark:text-black'>
                    <TextAreaBody showButtons={true} />
                    {/* <textarea ref={selectedTextRef} className='p-1 h-full dark:bg-gray-700' placeholder='Body' onChange={e => setbody(e.target.value)} /> */}
                  </pre>
                </label>
                <label className='flex flex-col m-3'>
                  <span className='text-md font-semibold'>Tags</span>
                  <input className='p-1 border-[1.5px] border-inputBorderColor rounded dark:text-black' placeholder='Tags' onChange={e => settags(e.target.value)}/>
                </label>
                {/* {previewPost()} */}
                <button className='text-white m-3 font-medium mt-7 px-4 py-1 w-fit border outline-none rounded bg-blue hover:bg-darkBlue hover:shadow-sm hover:shadow-blue-600'>Create</button>
            </form>
    </>
  )
}
