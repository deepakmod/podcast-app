import React, { useEffect, useState } from 'react';

function InputFile(props) {

    const [fileSelected , setFileSelected ]= useState('');

    useEffect(()=>{
        if(props.data===null){
            setFileSelected('');
        }
    },[props.data])

    return (
        <div className={props.class} >
            <label  htmlFor={props.id} > {fileSelected?(`File Selected : ${fileSelected}`):props.text} </label>
            <input type="file" id={props.id} accept={props.accept} style={{display:'none'}} onChange={(e)=>{
                props.handleFiles(e.target.files[0]) 
                setFileSelected(e.target.files[0].name);
            }} />
        </div>
    );
}

export default InputFile;