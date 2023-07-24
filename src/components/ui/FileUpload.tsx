import React, { useEffect, useRef, useState } from 'react';
import { Toast } from 'primereact/toast';
import { FileUpload, FileUploadHeaderTemplateOptions, FileUploadSelectEvent, FileUploadUploadEvent, ItemTemplateOptions, } from 'primereact/fileupload';
import { ProgressBar } from 'primereact/progressbar';
import { Button } from 'primereact/button';
import { Tooltip } from 'primereact/tooltip';
import { Tag } from 'primereact/tag';
import { PhotoIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import classNames from 'classnames';

export interface FileUploadProps {
    files: File[];
    setFiles: (...args: any[]) => void;
    containerClassName?: string;
    isSingle?: boolean;
}

const CustomFileUpload = (props: FileUploadProps) => {
    const toast = useRef<Toast>(null);
    const [totalSize, setTotalSize] = useState(0);
    const fileUploadRef = useRef<FileUpload>(null);

    useEffect(() => {
        if (props.files) {
            fileUploadRef.current?.setFiles(props.files)

            let _totalSize = 0;
            let newFiles = props.files;

            for (let i = 0; i < newFiles.length; i++) {
                _totalSize += newFiles[i].size || 0;
            }

            setTotalSize(_totalSize);
        }
    }, [props.files])

    const onSelect = (e: FileUploadSelectEvent) => {
        // Calculate size used
        let _totalSize = totalSize;
        let newFiles = e.files;

        for (let i = 0; i < newFiles.length; i++) {
            _totalSize += newFiles[i].size || 0;
        }

        setTotalSize(_totalSize);


        let chosenFiles = Array.prototype.slice.call(props.files);

        let newFilesArr = Array.prototype.slice.call(newFiles);

        newFilesArr.forEach((file) => {
            chosenFiles.push(file);
        })

        props.setFiles(chosenFiles);
    };

    const onRemove = (chosenFile: File, callback: Function) => {
        setTotalSize(totalSize - chosenFile.size);

        let chosenFiles = Array.prototype.slice.call(props.files);
        console.log(chosenFiles)
        const indexToRemove = chosenFiles.findIndex(file => file == chosenFile);
        console.log(indexToRemove)
        chosenFiles.splice(indexToRemove, 1)

        props.setFiles(chosenFiles)
        callback();
    };

    const onClear = () => {
        setTotalSize(0);
        props.setFiles([]);
    };

    const headerTemplate = (options: FileUploadHeaderTemplateOptions) => {
        const { className, chooseButton, cancelButton } = options;
        const value = totalSize / 100000;
        const formatedValue = fileUploadRef && fileUploadRef.current ? fileUploadRef.current.formatSize(totalSize) : '0 B';

        return (
            <div className={classNames(className, "bg-transparent flex items-center")}>
                {chooseButton}
                {cancelButton}
                <div className="flex items-center gap-3 ml-auto">
                    <span>{formatedValue} / 10 MB</span>
                    <ProgressBar value={value} showValue={false} className='w-52 !h-3'></ProgressBar>
                </div>
            </div>
        );
    };

    const itemTemplate = (inFile: object, props: ItemTemplateOptions) => {
        const file = inFile as File;
        return (
            <div className="flex items-center flex-wrap justify-between shadow w-full">
                <div className="flex items-center w-[40%]">
                    <img alt={file.name} role="presentation" src={URL.createObjectURL(file)} width={100} />
                    <span className="flex flex-col text-left ml-3">
                        {file.name}
                        <small>{new Date().toLocaleDateString()}</small>
                    </span>
                </div>
                <Tag value={props.formatSize} severity="warning" className="px-3 py-2" />
                <Button type="button" className="p-button-outlined p-button-rounded p-button-danger ml-auto !rounded-full !p-3"
                    onClick={() => onRemove(file, props.onRemove)}>
                    <TrashIcon className='w-5'></TrashIcon>
                </Button>

            </div >
        );
    };

    const emptyTemplate = () => {
        return (
            <div className="flex items-center justify-center flex-col">
                <PhotoIcon className='bg-gray-200 rounded-full w-12 p-3 mr-3'></PhotoIcon>
                <span className="my-5 text-xl">
                    Drag and Drop Image Here
                </span >
            </div >
        );
    };

    const chooseOptions = { icon: <PlusIcon className='w-7'></PlusIcon>, iconOnly: true, className: 'custom-choose-btn p-button-rounded p-button-outlined' };
    const cancelOptions = { icon: <TrashIcon className='w-7'></TrashIcon>, iconOnly: true, className: 'custom-cancel-btn p-button-danger p-button-rounded p-button-outlined' };

    return (
        <div className={classNames('w-full overflow-y-auto max-h-[65vh]', props.containerClassName)}>
            <Toast ref={toast}></Toast>

            <FileUpload ref={fileUploadRef} accept="image/*" maxFileSize={10000000}

                onSelect={onSelect} onError={onClear} onClear={onClear}
                headerTemplate={headerTemplate} itemTemplate={itemTemplate} emptyTemplate={emptyTemplate}
                chooseOptions={chooseOptions} customUpload cancelOptions={cancelOptions}
                multiple={props.isSingle ? false : true}
                contentClassName="min-h-[30vh] flex justify-center w-full [&>*:nth-child(3)]:w-full" />
        </div>
    )
}

export default CustomFileUpload