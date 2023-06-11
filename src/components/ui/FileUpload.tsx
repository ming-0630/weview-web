import React, { useRef, useState } from 'react';
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
}

const CustomFileUpload = (props: FileUploadProps) => {
    const toast = useRef<Toast>(null);
    const [totalSize, setTotalSize] = useState(0);
    const fileUploadRef = useRef<FileUpload>(null);

    // Need internal files to keep track of index to remove from the parent prop,
    // as the parent holds the string[] (blob) instead of File type while Component returns File as param
    // when deleting

    // const [internalFiles, setInternalFiles] = useState<File[]>([]);

    const onSelect = (e: FileUploadSelectEvent) => {
        // Calculate size used
        let _totalSize = totalSize;
        let newFiles = e.files;

        for (let i = 0; i < newFiles.length; i++) {
            _totalSize += newFiles[i].size || 0;
        }

        setTotalSize(_totalSize);


        let chosenFiles = Array.prototype.slice.call(props.files);
        // let internalChosenFiles = Array.prototype.slice.call(internalFiles);

        let newFilesArr = Array.prototype.slice.call(newFiles);

        newFilesArr.forEach((file) => {
            chosenFiles.push(file);
            // internalChosenFiles.push(file)
        })

        props.setFiles(chosenFiles);
        // setInternalFiles(internalChosenFiles);
    };

    const onRemove = (chosenFile: File, callback: Function) => {
        setTotalSize(totalSize - chosenFile.size);

        let chosenFiles = Array.prototype.slice.call(props.files);
        // let internalChosenFiles = Array.prototype.slice.call(internalFiles);

        // const indexToRemove = internalChosenFiles.findIndex(file => file == chosenFile);

        const indexToRemove = chosenFiles.findIndex(file => file == chosenFile);
        // internalChosenFiles.splice(indexToRemove, 1)
        chosenFiles.splice(indexToRemove, 1)

        props.setFiles(chosenFiles)
        // setInternalFiles(internalChosenFiles);
        callback();
    };

    const onClear = () => {
        setTotalSize(0);
        props.setFiles([]);
        // setInternalFiles([]);
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
        <div className='w-full overflow-y-auto max-h-[65vh]'>
            <Toast ref={toast}></Toast>

            <Tooltip target=".custom-choose-btn" content="Choose" position="bottom" />
            <Tooltip target=".custom-cancel-btn" content="Clear" position="bottom" />

            <FileUpload ref={fileUploadRef} name="demo[]" url="/api/upload" multiple accept="image/*" maxFileSize={10000000}
                onSelect={onSelect} onError={onClear} onClear={onClear}
                headerTemplate={headerTemplate} itemTemplate={itemTemplate} emptyTemplate={emptyTemplate}
                chooseOptions={chooseOptions} customUpload cancelOptions={cancelOptions}
                contentClassName="min-h-[40vh] flex justify-center w-full [&>*:nth-child(3)]:w-full" />
        </div>
    )
}

export default CustomFileUpload