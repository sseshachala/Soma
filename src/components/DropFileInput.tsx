// DropFileInput.jsx
import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import './drop-file-input.css';
import { ImageConfig } from './ImageConfig';

const DropFileInput = (props :any) => {

    const wrapperRef = useRef<any>(null);

    const [fileList, setFileList] = useState<any>([]);

    const onDragEnter = () => wrapperRef?.current?.classList.add('dragover');

    const onDragLeave = () => wrapperRef?.current?.classList.remove('dragover');

    const onDrop = () => wrapperRef.current.classList.remove('dragover');

    const onFileDrop = (e: any) => {
        const newFile = e.target.files[0];
        if (newFile) {
            const updatedList = [...fileList, newFile];
            setFileList(updatedList);
            props.onFileChange(updatedList);
        }
    }

    const fileRemove = (file: any) => {
        const updatedList = [...fileList];
        updatedList.splice(fileList.indexOf(file), 1);
        setFileList(updatedList);
        props.onFileChange(updatedList);
    }

    return (
        <>
            <div
                ref={wrapperRef}
                className="drop-file-input border border-gray-500 rounded-lg border-dashed mt-6"
                onDragEnter={onDragEnter}
                onDragLeave={onDragLeave}
                onDrop={onDrop}
            >
                <div className="drop-file-input__label">
                    <img className='m-auto' src={"https://media.geeksforgeeks.org/wp-content/uploads/20240308113922/Drag-.png"}
                        alt="" />
                    <p className='mt-3'>Drag & Drop your files here</p>
                </div>
                <input type="file" value="" onChange={onFileDrop} />
            </div>
            {
                fileList.length > 0 ? (
                    <div className="drop-file-preview">
                        <p className="text-xs">
                            Ready to upload
                        </p>
                        {
                            fileList.map((item: any, index: number) => (
                                <div key={index} className="drop-file-preview__item">
                                    <img src={ImageConfig[item.type.split('/')[1]] ||
                                        ImageConfig['default']} alt="" />
                                    <div className="drop-file-preview__item__info text-xs">
                                        <p>{item.name}</p>
                                        <p>{item.size}B</p>
                                    </div>
                                    <span className="drop-file-preview__item__del"
                                        onClick={() => fileRemove(item)}>
                                        x
                                    </span>
                                </div>
                            ))
                        }
                    </div>
                ) : null
            }
        </>
    );
}

DropFileInput.propTypes = {
    onFileChange: PropTypes.func
}

export default DropFileInput;
