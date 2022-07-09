import { FileUpload } from 'graphql-upload';
export declare const downAll: (IMG: any, token: any, original?: boolean) => Promise<unknown>;
export declare const download: ({ createReadStream, filename }: FileUpload, back: any, original?: boolean) => Promise<unknown>;
export declare const compress: (path: any, back: any, original: any) => Promise<void>;
export declare const getsub: ({ info, allow }: {
    info: any;
    allow?: boolean;
}, asl: any) => any[];
export declare const searchParent: ({ data, search }: {
    data: any;
    search: any;
}, res: any) => Promise<void>;
export declare const searchFields: ({ info, search, none }: {
    info: any;
    search: any;
    none?: any[];
}) => Promise<any>;
export declare const downOne: (IMG: any, token: any, back?: boolean) => Promise<unknown>;
