export interface FileUploaderConfig {
    /**
     * Dialog title, use translate helper outside component
     */
    title: string;
    /**
     * Max file size in MB
     */
    maxSize?: number;
    /**
     * upload url (relative path to api)
     * ex : /recruitment/mcu
     * Token authorization handled by interceptor
     */
    uploadUrl: string;
    /**
     * Upload file paramater if any
     * pass simple object
     */
    uploadParams?: any;
    /**
     * download template url (relative path to api)
     * ex : /recruitment/mcu
     * Token authorization handled by interceptor
     */
    templateUrl: string;
    /**
     * Download template file paramater if any
     * pass simple object
     */
    templateParams?: any;
    /**
     * download button text
     */
    downlodButtonText?: string;
    /**
     * upload button text
     */
    uploadButtonText?: string;
    /**
     * browse button text
     */
    browseButtonText?: string;
    
    acceptMimeType?: string;
}

export interface FileUploaderLogs {
    row: any;
    notes: any;
}

export interface FileUploadResponse {
    message: string;
    total_row: number;
    errors: FileUploaderLogs[];
}
