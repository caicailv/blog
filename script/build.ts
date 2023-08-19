import * as archiver from 'archiver';
import { exec } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
const config = {
  // 打包后产物路径
  buildPath: path.resolve('./dist'),
  // dev服务器对应的文件夹路径
  serviceFilePath: '/home/nestjs-backend/',
  serviceUser: 'root@1.117.146.183',
};

// 在本地压缩文件
const compressFile = () => {
  return new Promise((resolve, reject) => {
    console.log('压缩打包产物...');
    // const zipFilePath = path.resolve(config.buildPath, 'output.zip')
    const zipFilePath = path.resolve('./', 'output.zip');
    const output = fs.createWriteStream(zipFilePath);
    const archive = archiver('zip', {
      zlib: { level: 9 }, // 压缩级别
    });
    archive.pipe(output);
    archive.directory(config.buildPath, false);
    archive.finalize();
    output.on('close', function () {
      console.log('压缩完成');
      fs.access(zipFilePath, fs.constants.F_OK, (err) => {
        if (err) {
          reject('压缩文件不存在。');
        } else {
          console.log(
            `压缩完毕,压缩包大小:${(archive.pointer() / 1024 / 1024).toFixed(
              1,
            )}MB`,
          );
          resolve(undefined);
        }
      });
    });
    output.on('warning', function (msg) {
      console.log('warning', msg);
      // resolve()
    });
    output.on('end', function () {
      console.log('压缩end');
    });
    archive.on('error', function (err) {
      reject(err);
    });
  });
};
const execPro = (execstr) => {
  return new Promise((resolve, reject) => {
    exec(execstr, (error, stdout, stderr) => {
      if (error) {
        reject(error);
        return;
      }
      console.log(`执行成功${execstr}`);
      console.log(stdout);
      resolve(stdout);
    });
  });
};
const deleteOutput = () => {
  return new Promise((resolve, reject) => {
    // 使用node 删除./output.zip
    fs.unlink('./output.zip', (err) => {
      if (err) {
        reject('node删除失败');
        console.log(err);
        return;
      } else {
        resolve(undefined);
      }
    });
  });
};
const copyPackage = ()=>{
  const file =  path.resolve('./package.json')
  const target = path.resolve(config.buildPath,'package.json')
  fs.copyFileSync(file,target)
}

const init = async () => {
  try {

    copyPackage()
    await compressFile();
    // 上传服务器
    await execPro(
      `scp ./output.zip ${config.serviceUser}:${config.serviceFilePath}`,
    );
    // 上传sh脚本
    // await execPro(`scp ./extract.sh ${config.serviceUser}:/opt/fdsec/`)
    await execPro(
      `ssh ${config.serviceUser} bash /home/nestjs-backend/extract.sh`,
    );
    // 删除原来的文件
    await deleteOutput();
    console.log('上传完成');
  } catch (err) {
    console.error(err);
  }
};

init();
