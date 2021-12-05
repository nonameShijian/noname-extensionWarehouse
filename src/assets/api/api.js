import fs from 'fs';
import path from 'path';

export { fs, path };

export const getFileList = (dir, callback, ignore) => {
	const files = [],
		folders = [];
	if (!ignore) dir = __dirname + '/' + dir;
	if (!fs.existsSync(dir) || !fs.statSync(dir).isDirectory()) {
		console.error(dir, '不是一个目录');
		return false;
	}
	//dir不是文件夹就不执行
	fs.readdir(dir, (err, filelist) => {
		for (let i = 0; i < filelist.length; i++) {
			if (filelist[i][0] != '.' && filelist[i][0] != '_') {
				if (fs.statSync(dir + '/' + filelist[i]).isDirectory()) {
					folders.push(filelist[i]);
				} else {
					files.push(filelist[i]);
				}
			}
		}
		callback(folders, files);
	});
};
