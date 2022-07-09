"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.compress = exports.uploadDrive01 = exports.uploadDrive = exports.manyfiles2 = exports.manyfiles = void 0;
const { google } = require('googleapis');
const fs = require('fs');
const mime = require('mime-types');
const sharp_1 = __importDefault(require("sharp"));
const shared_1 = require("@commerce/shared");
const common_1 = require("@nestjs/common");
let { INVALID_CREDENTIALS, SERVER_ERR } = shared_1.errors;
let allfiles = [];
let allfiles2 = [];
let rad = 'http://drive.google.com/uc?export=view&id=';
const manyfiles = async (myfile, token) => {
    return new Promise(async (res, reject) => {
        const oauth2Client = new google.auth.OAuth2();
        oauth2Client.setCredentials({
            access_token: token,
        });
        const drive = google.drive({
            version: 'v3',
            auth: oauth2Client,
        });
        let fileName = myfile.path.replace('.', 'comp.');
        const fileMimeType = mime.lookup(myfile.path);
        const resy = await drive.files.create({
            resource: {
                name: Date.now() + myfile.filename,
                mimeType: fileMimeType,
                parents: ['1utj3UxkawzkuB3JNOJgU6BsfCvPH-YtT'],
            },
            fields: 'id',
            media: {
                body: fs.createReadStream(fileName),
                mimeType: 'application/octet-stream',
            },
        }, {
            onUploadProgress: (evt) => { },
        }, function (err, file) {
            if (err) {
                reject(err);
            }
            else {
                let ans = file.data.id;
                res(rad + ans);
                allfiles.push(rad + ans);
            }
        });
    });
};
exports.manyfiles = manyfiles;
const manyfiles2 = async (myfile, token) => {
    return new Promise(async (res, reject) => {
        const oauth2Client = new google.auth.OAuth2();
        oauth2Client.setCredentials({
            access_token: token,
        });
        const drive = google.drive({
            version: 'v3',
            auth: oauth2Client,
        });
        let fileName = myfile.path.replace('.', 'compx8x.');
        const fileMimeType = mime.lookup(myfile.path);
        const resy = await drive.files.create({
            resource: {
                name: Date.now() + myfile.filename,
                mimeType: fileMimeType,
                parents: ['1utj3UxkawzkuB3JNOJgU6BsfCvPH-YtT'],
            },
            fields: 'id',
            media: {
                body: fs.createReadStream(fileName),
                mimeType: 'application/octet-stream',
            },
        }, {
            onUploadProgress: (evt) => { },
        }, function (err, file) {
            if (err) {
                reject(err);
            }
            else {
                let ans = file.data.id;
                res(rad + ans);
                allfiles2.push(rad + ans);
            }
        });
    });
};
exports.manyfiles2 = manyfiles2;
const uploadDrive = async (data, token) => {
    return new Promise(async (res, reject) => {
        try {
            let arr = [];
            let arr2 = [];
            for (let index = 0; index < data.length; index++) {
                const x = data[index];
                arr.push(exports.manyfiles(x, token));
                arr2.push(exports.manyfiles2(x, token));
            }
            let files = Promise.all([await Promise.all(arr), await Promise.all(arr2)])
                .then((x) => {
                res(x);
            })
                .catch((x) => {
                reject([INVALID_CREDENTIALS]);
            });
        }
        catch (e) {
            reject([INVALID_CREDENTIALS]);
        }
    })
        .then((x) => {
        return x;
    })
        .catch((x) => {
        throw new common_1.HttpException(x, 404);
    });
};
exports.uploadDrive = uploadDrive;
const uploadDrive01 = async (data, token) => {
    return new Promise(async (res, reject) => {
        try {
            let file = await exports.manyfiles(data, token);
            let file2 = await exports.manyfiles2(data, token);
            res([file, file2]);
        }
        catch (e) {
            reject([INVALID_CREDENTIALS]);
        }
    });
};
exports.uploadDrive01 = uploadDrive01;
const compress = async (path) => {
    let newpath = path.replace('.', 'comp.');
    let newpath1 = newpath.replace('.', 'x8x.');
    try {
        await sharp_1.default(path).jpeg({ quality: 80 }).resize(350, 250).toFile(newpath);
        await sharp_1.default(newpath).jpeg({ quality: 45 }).blur(10).toFile(newpath1);
    }
    catch (e) {
        throw new common_1.HttpException([SERVER_ERR], 404);
    }
};
exports.compress = compress;
//# sourceMappingURL=driveupload.js.map