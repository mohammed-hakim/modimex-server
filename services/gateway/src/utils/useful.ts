import { createWriteStream } from 'fs';
import { FileUpload } from 'graphql-upload';
import { join } from 'path';
import sharp from 'sharp';
import { uploadDrive, uploadDrive01 } from './driveupload';

export const downAll = async (IMG, token, original = false) => {
  let urls2 = [];
  let paths = [];
  for (let index = 0; index < IMG.length; index++) {
    const x = await IMG[index];
    paths.push(download(x, token, original));
  }
  let urls = await Promise.all(paths);
  let data = await uploadDrive(urls, token);

  return data;
};

export const download = async (
  { createReadStream, filename }: FileUpload,
  back,
  original = false,
) => {
  return new Promise(async (res, rej) => {
    let name = Date.now() + filename;
    let path = join(__dirname, `./../images/${name}`);
    let url = URL + '/images/' + name;
    let data = await createReadStream()
      .pipe(createWriteStream(path))
      .on('finish', async (e) => {
        console.log({ back });

        await compress(path, back, original);
        res({ path, filename, name });

        return e;
      })
      .on('error', (e) => {
        console.log(e);
        return e;
      });
  });
};

export const compress = async (path, back, original) => {
  let newpath = path.replace('.', 'comp.');
  let newpath1 = newpath.replace('.', 'x8x.');
  try {
    let img1 = await sharp(path); //.resize(100);

    if (!original) {
      await img1.jpeg({ quality: 80 }).resize(350, 250);
    }
    await img1.toFile(newpath);

    let img2 = await sharp(newpath);
    if (original) {
      await img2.flatten({
        background: { r: 255, g: 255, b: 255, alpha: 0.3 },
      });
    }
    await img2.jpeg({ quality: 60 }).blur(8).toFile(newpath1);
  } catch (e) {
    console.log({ e });
  }
};

export const getsub = ({ info, allow = false }, asl) => {
  let vals = [];
  info.selectionSet.selections.forEach((selection, i) => {
    allow &&
      selection.name.value != '__typename' &&
      !asl.fragments[selection.name.value] &&
      vals.push(selection.name.value);
    let field = selection.name.value;

    if (selection.selectionSet) {
      let data = getsub({ info: selection, allow: true }, asl);

      vals.push({ parent: field, data });
    } else if (selection.kind == 'FragmentSpread') {
      let frag = selection.name.value;
      let data = asl.fragments[frag];

      if (data.selectionSet) {
        let data2 = getsub({ info: data, allow: true }, asl);
        vals.push(...data2);
      }
    }
  });

  return vals;
};
export const searchParent = async ({ data, search }, res) => {
  for (let i = 0; i < data.length; i++) {
    let x = data[i];

    if (x.parent && x.parent == search) {
      res(x.data);
    } else if (x.parent) {
      await searchParent({ data: x.data, search: search }, res);
    } else {
      setTimeout(() => {
        res('*');
      }, 1000);
    }
  }

  // return vals;
};
export const searchFields = async ({ info, search, none = [] }) => {
  let data = await getsub({ info: info.fieldNodes[0] }, info);

  let sel = (await new Promise(async (res, rej) => {
    await searchParent({ data, search }, res);
  })) as any;

  if (sel && sel instanceof Array) {
    sel = sel.filter((x) => {
      return !x.parent && !none.find((c) => c == x);
    });

    if (none.find((x) => x == 'user')) {
      sel.push('user_id');
    }
    !sel.find((x) => x == 'id') && sel.push('id');
  }

  // sel = sel.join(' , ');

  return sel;
};

export const downOne = async (IMG, token, back = false) => {
  let url = await download(IMG, back, back);
  let data = await uploadDrive01(url, token);

  return data;
};
