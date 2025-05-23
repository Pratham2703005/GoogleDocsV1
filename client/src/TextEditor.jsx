import React, { useCallback } from 'react'
import 'quill/dist/quill.snow.css'
import Quill from 'quill'
import {io} from 'socket.io-client'
import { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
const TOOLBAR_OPTIONS = [
  [{header: [1,2,3,4,5,6,false]}],
  [{font: []}],
  [{list: "ordered"}, {list:"bullet"}],
  ["bold","italic","underline"],
  [{color:[]},{background:[]}],
  [{script:"sub"},{script:"super"}],
  [{align:[]}],
  ["blockquote","code-block"],
  ["clean"]
]
const SAVE_TIMEINTERVAL = 2000;
const TextEditor = () => {
  const {id:documentId} = useParams();
  const [socket,setSocket] = useState();
  const [quill, setQuill] = useState();
    useEffect(()=>{
      const s  = io(import.meta.env.VITE_BACKEND_URL)
      setSocket(s);
      return ()=>{
        s.disconnect();
      }
    },[])

    useEffect(()=>{
      if(socket == null || quill == null) return;
      socket.once('load-document',document => {
        quill.setContents(document);
        quill.enable()
      })
      socket.emit('get-document', documentId);
      
    },[socket,quill,documentId])
    useEffect(()=>{
      if(socket == null || quill == null) return;

      const interval = setInterval(()=>{
        socket.emit('save-document',quill.getContents())

      },SAVE_TIMEINTERVAL)
      return ()=>{clearInterval(interval)}
    },[socket,quill])
    const wrapperRef= useCallback((wrapper)=>{
        if(wrapper == null) return
        wrapper.innerHTML = "";
        const editor = document.createElement('div')
        wrapper.append(editor);
        const q =new Quill(editor,{theme:"snow", modules:{toolbar:TOOLBAR_OPTIONS}})
        q.enable(false);
        q.setText('loading...');
        setQuill(q);

      },[])

      useEffect(()=>{
      if(socket == null || quill == null) return;

      const handler = (delta)=>{
        quill.updateContents(delta)
      }

      socket.on('receive-changes',handler)

      return ()=>{
        socket.off('receive-changes',handler)
      }
    },[socket,quill])

    useEffect(()=>{
      if(socket == null || quill == null) return;

      const handler = (delta, onDelta, source)=>{
        if(source !== 'user') return;
        socket.emit('send-changes',delta)
      }

      quill.on('text-change',handler)

      return ()=>{
        quill.off('text-change',handler)
      }
    },[socket,quill])
  return (
    <div className='container' ref={wrapperRef}></div>
  )
}

export default TextEditor
