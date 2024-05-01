import React, { useRef, forwardRef, useImperativeHandle, useEffect } from "react";

import { FileUpload } from "primereact/fileupload";
import { Button } from "primereact/button";
import { Tooltip } from "primereact/tooltip";
import { addLocale, locale } from "primereact/api";
const File_upload = forwardRef((props, ref) => {
    addLocale("es", {
        pending: "Pendiente",
    });
    locale("es");



    const fileUploadRef = useRef(null);
    const onRemove = (file, callback) => {
        callback();
    };
    const onFileUploadClick = () => {
        const inputEl = fileUploadRef.current?.getInput();
        inputEl?.click();
    };

    useImperativeHandle(ref, () => ({
        getFiles: () => {
            if (fileUploadRef.current) {
                return fileUploadRef.current.getFiles();
            }
            return [];
        },
        clear: () => {

            fileUploadRef.current.clear();
        }
        // Otros métodos que desees exponer
    }));
    const headerTemplate = (options) => {
        const { className, chooseButton, uploadButton, cancelButton } = options;
        return (
            <div
                className={className}
                style={{
                    backgroundColor: "transparent",
                    display: "flex",
                    alignItems: "center",
                }}
            >
                {chooseButton}
                {uploadButton}
                {cancelButton}
            </div>
        );
    };



    const emptyTemplate = () => {
        return (
            <div className="flex align-items-center flex-column" onClick={onFileUploadClick}>
                <i
                    className="pi pi-image mt-3 p-5"
                    style={{
                        fontSize: "5em",
                        borderRadius: "50%",
                        backgroundColor: "var(--surface-b)",
                        color: "var(--surface-d)",
                    }}
                ></i>
                <span
                    style={{ fontSize: "1.2em", color: "var(--text-color-secondary)" }}
                    className="my-5"
                >
                    Arrastre y suelte sus imagenes aquí
                </span>
            </div>
        );
    };
    
    const chooseOptions = {
        icon: "pi pi-fw pi-images",
        iconOnly: true,
        className: "custom-choose-btn p-button-rounded p-button-outlined",
    };
    const uploadOptions = {
        icon: "pi pi-fw pi-cloud-upload",
        iconOnly: true,
        className:
            "hidden custom-upload-btn p-button-success p-button-rounded p-button-outlined",
    };
    const cancelOptions = {
        icon: "pi pi-fw pi-times",
        iconOnly: true,
        className:
            "custom-cancel-btn p-button-danger p-button-rounded p-button-outlined",
    };
    return (
        <div>

            <Tooltip target=".custom-choose-btn" content="Cargar" position="bottom" />
            <Tooltip target=".custom-upload-btn" content="Upload" position="bottom" />
            <Tooltip target=".custom-cancel-btn" content="Limpiar" position="bottom" />
            <FileUpload
                ref={fileUploadRef}
                name="files[]"
                url="/api/upload"
                multiple
                accept="image/*"
                maxFileSize={1000000000}
                headerTemplate={headerTemplate}

                emptyTemplate={emptyTemplate}
                chooseOptions={chooseOptions}
                uploadOptions={uploadOptions}
                cancelOptions={cancelOptions}
            />
        </div>
    );
})
File_upload.displayName = 'File_upload';
export default File_upload;