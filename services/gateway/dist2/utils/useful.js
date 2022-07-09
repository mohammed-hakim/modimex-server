"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.downOne = exports.searchFields = exports.searchParent = exports.getsub = exports.compress = exports.download = exports.downAll = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
const sharp_1 = __importDefault(require("sharp"));
const driveupload_1 = require("./driveupload");
const downAll = async (IMG, token, original = false) => {
    let urls2 = [];
    let paths = [];
    for (let index = 0; index < IMG.length; index++) {
        const x = await IMG[index];
        paths.push(exports.download(x, token, original));
    }
    let urls = await Promise.all(paths);
    let data = await driveupload_1.uploadDrive(urls, token);
    return data;
};
exports.downAll = downAll;
const download = async ({ createReadStream, filename }, back, original = false) => {
    return new Promise(async (res, rej) => {
        let name = Date.now() + filename;
        let path = path_1.join(__dirname, `./../images/${name}`);
        let url = URL + '/images/' + name;
        let data = await createReadStream()
            .pipe(fs_1.createWriteStream(path))
            .on('finish', async (e) => {
            console.log({ back });
            await exports.compress(path, back, original);
            res({ path, filename, name });
            return e;
        })
            .on('error', (e) => {
            console.log(e);
            return e;
        });
    });
};
exports.download = download;
const compress = async (path, back, original) => {
    let newpath = path.replace('.', 'comp.');
    let newpath1 = newpath.replace('.', 'x8x.');
    try {
        let img1 = await sharp_1.default(path);
        if (!original) {
            await img1.jpeg({ quality: 80 }).resize(350, 250);
        }
        await img1.toFile(newpath);
        let img2 = await sharp_1.default(newpath);
        if (original) {
            await img2.flatten({
                background: { r: 255, g: 255, b: 255, alpha: 0.3 },
            });
        }
        await img2.jpeg({ quality: 60 }).blur(8).toFile(newpath1);
    }
    catch (e) {
        console.log({ e });
    }
};
exports.compress = compress;
const getsub = ({ info, allow = false }, asl) => {
    let vals = [];
    info.selectionSet.selections.forEach((selection, i) => {
        allow &&
            selection.name.value != '__typename' &&
            !asl.fragments[selection.name.value] &&
            vals.push(selection.name.value);
        let field = selection.name.value;
        if (selection.selectionSet) {
            let data = exports.getsub({ info: selection, allow: true }, asl);
            vals.push({ parent: field, data });
        }
        else if (selection.kind == 'FragmentSpread') {
            let frag = selection.name.value;
            let data = asl.fragments[frag];
            if (data.selectionSet) {
                let data2 = exports.getsub({ info: data, allow: true }, asl);
                vals.push(...data2);
            }
        }
    });
    return vals;
};
exports.getsub = getsub;
const searchParent = async ({ data, search }, res) => {
    for (let i = 0; i < data.length; i++) {
        let x = data[i];
        if (x.parent && x.parent == search) {
            res(x.data);
        }
        else if (x.parent) {
            await exports.searchParent({ data: x.data, search: search }, res);
        }
        else {
            setTimeout(() => {
                res('*');
            }, 1000);
        }
    }
};
exports.searchParent = searchParent;
const searchFields = async ({ info, search, none = [] }) => {
    let data = await exports.getsub({ info: info.fieldNodes[0] }, info);
    let sel = (await new Promise(async (res, rej) => {
        await exports.searchParent({ data, search }, res);
    }));
    if (sel && sel instanceof Array) {
        sel = sel.filter((x) => {
            return !x.parent && !none.find((c) => c == x);
        });
        if (none.find((x) => x == 'user')) {
            sel.push('user_id');
        }
        !sel.find((x) => x == 'id') && sel.push('id');
    }
    return sel;
};
exports.searchFields = searchFields;
const downOne = async (IMG, token, back = false) => {
    let url = await exports.download(IMG, back, back);
    let data = await driveupload_1.uploadDrive01(url, token);
    return data;
};
exports.downOne = downOne;
//# sourceMappingURL=useful.js.map