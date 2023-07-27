import React, { useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css';
import { Navigate } from 'react-router';

const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ script: 'sub' }, { script: 'super' }],
      ['link', 'image'],
      ['clean'],
      ]
};
const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'list',
    'bullet',
    'script',
    'link',
    'image',
];

const CreatePost = () => {
    const [title,setTitle] = useState('');
    const [summary,setSummary] = useState('');
    const [content,setContent] = useState('');
    const [files, setFiles] = useState('');
    const [redirect, setRedirect] = useState(false);

   async function createNewPost(ev) {
        const data = new FormData();
        data.set('title', title);
        data.set('summary', summary);
        data.set('content', content);
        data.set('file', files[0]);
        ev.preventDefault();
      const response = await fetch('https://seun-u541.onrender.com', {
            method: 'POST',
            body: data,
        });
        if (response.ok) {
          setRedirect(true);
        }
    }

    if (redirect) {
      return <Navigate to={'/'} />
    }
    
  return (
    <form onSubmit={createNewPost}>
        <input type="title" 
        placeholder={"Title"} 
        value={title} 
        onChange={ev => setTitle(ev.target.value)} />

        <input type="summary" 
        placeholder={"summary"} 
        value={summary} 
        onChange={ev => setSummary(ev.target.value)} />
        <input type="file" 
        onChange={ev => setFiles(ev.target.files)} />

        <ReactQuill 
        value={content} 
        onChange={newValue => setContent(newValue)} 
        modules={modules} 
        formats={formats} />
        <button style={{marginTop:"5px"}}>Create Post</button>
    </form>
  )
}

export default CreatePost 

