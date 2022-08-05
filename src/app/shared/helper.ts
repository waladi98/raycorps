
export class Helper {
    constructor() {}

    static getMimeType(filename: string): string {
        let idx = filename.split('.');
        const expl = idx.length;
        const keyword = idx[expl - 1].toLowerCase();

        const mimet = {
            txt: 'text/plain',
            htm: 'text/html',
            html: 'text/html',
            php: 'text/html',
            css: 'text/css',
            js: 'application/javascript',
            json: 'application/json',
            xml: 'application/xml',
            swf: 'application/x-shockwave-flash',
            flv: 'video/x-flv',

            // images
            png: 'image/png',
            jpe: 'image/jpeg',
            jpeg: 'image/jpeg',
            jpg: 'image/jpeg',
            gif: 'image/gif',
            bmp: 'image/bmp',
            ico: 'image/vnd.microsoft.icon',
            tiff: 'image/tiff',
            tif: 'image/tiff',
            svg: 'image/svg+xml',
            svgz: 'image/svg+xml',

            // archives
            zip: 'application/zip',
            rar: 'application/x-rar-compressed',
            exe: 'application/x-msdownload',
            msi: 'application/x-msdownload',
            cab: 'application/vnd.ms-cab-compressed',

            // audio/video
            mp3: 'audio/mpeg',
            qt: 'video/quicktime',
            mov: 'video/quicktime',
            mp4: 'video/mp4',
            avi: 'video/avi',
            mkv: 'video/mkv',

            // adobe
            pdf: 'application/pdf',
            psd: 'image/vnd.adobe.photoshop',
            ai: 'application/postscript',
            eps: 'application/postscript',
            ps: 'application/postscript',

            // ms office
            doc: 'application/msword',
            rtf: 'application/rtf',
            xls: 'application/vnd.ms-excel',
            ppt: 'application/vnd.ms-powerpoint',
            docx: 'application/msword',
            xlsx: 'application/vnd.ms-excel',
            pptx: 'application/vnd.ms-powerpoint',

            // open office
            odt: 'application/vnd.oasis.opendocument.text',
            ods: 'application/vnd.oasis.opendocument.spreadsheet',
        };

        if (keyword in mimet) {
            return mimet[keyword];
        } else {
            return 'application/octet-stream';
        }
    }

    static bytesToSize(bytes: number): string {
        const sizes: string[] = ['Bytes', 'KB', 'MB', 'GB', 'TB']
        if (bytes === 0) return 'n/a'
        const i: number = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)).toString())
        if (i === 0) return `${bytes} ${sizes[i]}`
        return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${sizes[i]}`
    }

}
