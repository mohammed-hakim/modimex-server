const { google } = require('googleapis');
const fs = require('fs');
const mime = require('mime-types');

import sharp from 'sharp';
import { errors } from '@commerce/shared';
import { HttpException } from '@nestjs/common';

let { INVALID_CREDENTIALS, SERVER_ERR } = errors;
let allfiles = [];
let allfiles2 = [];
let rad = 'http://drive.google.com/uc?export=view&id=';

export const manyfiles = async (myfile, token) => {
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

    const resy = await drive.files.create(
      {
        resource: {
          name: Date.now() + myfile.filename,
          mimeType: fileMimeType,
          //
          parents: ['1utj3UxkawzkuB3JNOJgU6BsfCvPH-YtT'],
        },
        fields: 'id',
        media: {
          body: fs.createReadStream(fileName),
          mimeType: 'application/octet-stream',
        },
      },
      {
        onUploadProgress: (evt) => {},
      },
      function (err, file) {
        if (err) {
          reject(err);
        } else {
          let ans = file.data.id;
          res(rad + ans);
          allfiles.push(rad + ans);
        }
      },
    );
  });
};
export const manyfiles2 = async (myfile, token) => {
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

    const resy = await drive.files.create(
      {
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
      },
      {
        onUploadProgress: (evt) => {},
      },
      function (err, file) {
        if (err) {
          reject(err);
        } else {
          let ans = file.data.id;
          res(rad + ans);
          allfiles2.push(rad + ans);
        }
      },
    );
  });
};
export const uploadDrive = async (data, token) => {
  return new Promise(async (res, reject) => {
    try {
      let arr = [];
      let arr2 = [];
      for (let index = 0; index < data.length; index++) {
        const x = data[index];

        arr.push(manyfiles(x, token));

        arr2.push(manyfiles2(x, token));
      }

      let files = Promise.all([await Promise.all(arr), await Promise.all(arr2)])
        .then((x) => {
          res(x);
        })
        .catch((x) => {
          reject([INVALID_CREDENTIALS]);
        });
    } catch (e) {
      reject([INVALID_CREDENTIALS]);
    }
  })
    .then((x) => {
      return x;
    })
    .catch((x) => {
      throw new HttpException(x, 404);
    });
};
export const uploadDrive01 = async (data, token) => {
  return new Promise(async (res, reject) => {
    try {
      let file = await manyfiles(data, token);
      let file2 = await manyfiles2(data, token);
      res([file, file2]);
    } catch (e) {
      reject([INVALID_CREDENTIALS]);
    }
  });
};
export const compress = async (path) => {
  let newpath = path.replace('.', 'comp.');
  let newpath1 = newpath.replace('.', 'x8x.');
  try {
    await sharp(path).jpeg({ quality: 80 }).resize(350, 250).toFile(newpath);

    await sharp(newpath).jpeg({ quality: 45 }).blur(10).toFile(newpath1);
  } catch (e) {
    throw new HttpException([SERVER_ERR], 404);
  }
};
