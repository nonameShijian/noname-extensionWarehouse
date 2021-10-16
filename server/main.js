const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const app = express();
const multiparty = require('multiparty');
//nodejs发送邮件
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
	host : 'smtp.qq.com',
	secureConnection: true, // 使用SSL方式（安全方式，防止被窃取信息）
	port: 465,
	auth: {
		user: '2954700422@qq.com', //邮箱的账号
		pass: 'gowqgdxufzjidhbf'//邮箱的授权码
	}
});

const os = require('os');
function getNetworkIp() {
	let needHost = ''; // 打开的host
	try {
		// 获得网络接口列表
		let network = os.networkInterfaces();
		for (let dev in network) {
			let iface = network[dev];
			for (let i = 0; i < iface.length; i++) {
				let alias = iface[i];
				if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
					needHost = alias.address;
				}
			}
		}
	} catch (e) {
		needHost = 'localhost';
	}
	return needHost;
}

const JsZip = require('./jszip.js');
//mysql时间戳转换
const moment = require('moment');
//连接mysql
const mysql = require('mysql');

const conn = mysql.createConnection({
		host: 'localhost',
		user: 'root',
		password: '123456',
		port: 3306,
		database: 'nonameskill',
		supportBigNumber: true,
		multipleStatements: true, //执行多条语句
});

conn.connect(err => {
	err && console.error(err);
});

const queryCode = code => {
	return new Promise((resolve, reject) => {
		conn.query(code, (err, result) => {
			console.log(code, `[${new Date().toLocaleString()}]`);
			let str = '返回结果：';
			if(err) {
				str += err.message;
			} else if(typeof result.length != 'undefined'){
				str += result.length + '条结果';
			} else {
				str += result.affectedRows + '条结果';
			}
			if(err) {
				console.log('\x1B[31m%s\x1b[39m', str);
				reject(err);
			} else {
				console.log('\x1B[33m%s\x1b[0m', str);
				resolve(result);
			}
		});
	});
};

const selectQuery = ({
	field, /*字段*/
	tableName, /*表名*/
	where = '', /*条件*/
}) => {
	return queryCode(`select ${field} from ${tableName} ${where}`);
};

const updateQuery = ({
	field, /*字段*/
	newFieldData, /*新数据*/
	tableName, /*表名*/
	where = '', /*条件*/
}) => {
	return queryCode(`update ${tableName} set ${field} = ${newFieldData} ${where}`);
};

const updateQuery2 = ({
	newData,
	tableName, /*表名*/
	where = '', /*条件*/
}) => {
	let str = '';
	for (let i = 0; i < newData.length; i++) {
		const {field, newFieldData} = newData[i];
		str += `${i > 0 ? ', ' : ''}${field} = ${newFieldData}`;
	}
	return queryCode(`update ${tableName} set ${str} ${where}`);
};

const insertQuery = ({
	fields, /*字段组*/
	newFieldData, /*新数据组*/
	tableName, /*表名*/
}) => {
	return queryCode(`insert into ${tableName} (${fields}) values (${newFieldData})`);
};

const deleteQuery = ({
	tableName, /*表名*/
	where = '', /*条件*/
}) => {
	return queryCode(`delete from ${tableName} ${where}`);
};

//path目录下的文件夹
const getDirectoryList = (path) => {
	let folders = [];
	let dir = __dirname + '/' + path;
	if(!fs.existsSync(dir)) return;
	let filelist = fs.readdirSync(dir);
	for (let i = 0; i < filelist.length; i++) {
		if (filelist[i][0] == '.' || filelist[i][0] == '_') continue;
		if (fs.statSync(dir + '/' + filelist[i]).isDirectory()) {
			folders.push(filelist[i]);
		}
	}
	return folders.sort();
}

//path目录下的文件和子目录的文件
const getFileList = (path) => {
	let files = [];
	let dir = __dirname + '/files/extension/' + path;
	if(!fs.existsSync(dir)) {
		console.log(`没有${dir}文件夹`);
		return [];
	}
	let filelist = fs.readdirSync(dir);
	for (let i = 0; i < filelist.length; i++) {
		if (filelist[i][0] != '.' && filelist[i][0] != '_') {
			if (fs.statSync(dir + '/' + filelist[i]).isDirectory()) {
				let list = getFileList(path + '/' + filelist[i])
				.map(item => filelist[i] + '/' + item);
				files = files.concat(list);
			} else {
				files.push(filelist[i]);
			}
		}
	}
	return files.sort();
}

//计算文件夹中所有文件的大小
function convertSize(size){
	function pow1024(num) {
		return Math.pow(1024, num);
	}
	if (!size) return '';
	if (size < pow1024(1)) return size + ' B';
	if (size < pow1024(2)) return (size / pow1024(1)).toFixed(2) + ' KB';
	if (size < pow1024(3)) return (size / pow1024(2)).toFixed(2) + ' MB';
	if (size < pow1024(4)) return (size / pow1024(3)).toFixed(2) + ' GB';
	return (size / pow1024(4)).toFixed(2) + ' TB';
}

function calcSizeSync(dirPath, cb) {
	let fileSize = 0;
	function calc(dirPath) {
		const statObj = fs.statSync(dirPath);
		const files = fs.readdirSync(dirPath);
		files.forEach(item => {
			const filePath = path.join(dirPath, item);
			const fileStat = fs.statSync(filePath);
			if (fileStat.isDirectory()) {
				calc(filePath);
			} else {
				fileSize += fileStat.size;
			}
		});
	}
	calc(__dirname + '/' + dirPath);
	return convertSize(fileSize) ;
}

app.all('*', (req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
	res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
	res.header('Cache-Control','no-cache');
	res.header('X-Powered-By', '3.2.1');
	next();
});

// 解析 application/json
app.use(bodyParser.json());
// 解析 application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(path.resolve(__dirname, 'public')));

app.use('/blob', (req, res) => {
	let filePath = path.join(__dirname , 'files/extension' , decodeURI(req.url));
	let bool = fs.existsSync(filePath);
	if (bool) {
		res.sendFile(filePath);
	} else {
		res.send('Error: ENOENT: no such file or directory');
	}
});

app.get('/catalog', (req, res) => {
	//生成catalog.js
	let catalog = '';
	selectQuery({
		field: '*',
		tableName: 'extension',
	})
	.then(async result => {
		for (let i = 0; i < result.length; i++) {
			let extScore = (await selectQuery({
				field: '*',
				tableName: 'extscore',
				where: `where extName = '${result[i].extName}'`,
			}))[0];
			let extObj = {
				name: result[i].extName,
				author: result[i].author,
				version: result[i].version,
				intro: result[i].intro,
				size: calcSizeSync('files/extension/' + result[i].extName),
				files: getFileList(result[i].extName),
				extScore: {
					peopleNum: extScore.peopleNum,
					score: extScore.totalScore / extScore.peopleNum,
				},
				commit: (commit => {
					if(!commit) return;
					const i = /[0-9]{4}-[0-9]{1,2}-[0-9]{1,2} 更新内容：/g;
					const y = /[0-9]{4}-[0-9]{1,2}-[0-9]{1,2}/g;
					let result, resultArray = [], x = 0;
					let array = commit.split(i).slice(1);
					while((result = i.exec(commit)) != null) {
						resultArray.push({
							timestamp: y.exec(commit)[0],
							content: array[x++],
						});
					}
					return resultArray;
				})(result[i].commit),
			}
			catalog += `extension['${result[i].extName}'] = ${JSON.stringify(extObj)};\r\n`;
		}
		res.send(catalog);
	})
	.catch(err => {
		console.error(err);
		res.send(err);
	});
});

app.get('/download', async (req, res) => {
	const { fileURL } = req.query;
	const fileList = getFileList(fileURL);
	const zip = new JsZip();
	fileList.forEach(item => {
		let url = path.join(__dirname , 'files/extension' , fileURL, item);
		let data = fs.readFileSync(url);
		zip.file(item, data);
	});
	await zip.generateAsync({
		type: "nodebuffer"
	}).then(nodebuffer => {
		res.send(nodebuffer);
	});
});

app.get('/login', async (req, res) => {
	const { userName, passWord } = req.query;
	const sendMessage = {
		hasUser: false,
		correctPassword: false,
		userScoreData: null,
		userThumbsUpData: null
	};
	selectQuery({
		field: '*',
		tableName: 'users',
		where: `where userName = '${userName}'`,
	})
	.then(result => {
		if(result.length == 0) {
			//没有这个用户
			res.send(sendMessage);
		} else {
			sendMessage.hasUser = true;
			selectQuery({
				field: '*',
				tableName: 'users',
				where: `where userName = '${userName}' and passWord = '${passWord}'`,
			})
			.then(async result => {
				if(result.length > 0) {
					//密码正确
					sendMessage.correctPassword = true;
					await selectQuery({
						field: 'score, thumbsUp',
						tableName: 'users',
						where: `where userName = '${userName}'`,
					})
					.then(res => res[0])
					.then(data => {
						sendMessage.userScoreData = data.score;
						if(data.thumbsUp) sendMessage.userThumbsUpData = data.thumbsUp.split(',');
					});
				}
				res.send(sendMessage);
			});
		}
	})
	.catch(err => {
		console.log(err);
		res.send({ errMessage: err.message});
	});
});

function updateScore() {
	//更新评分
	return selectQuery({
		field: 'score',
		tableName: 'users',
	}).then(result => {
		return result.map(item => item.score).filter(item => item != null);
	}).then(async result => {
		if(!result.length) return;
		let resultData = {};
		for(let data of result) {
			data = JSON.parse(data);
			for(let i in data) {
				resultData[i] =  [resultData[i] ? resultData[i][0] + 1 : 1, resultData[i] ? resultData[i][1] + data[i] : data[i]]
			}
		}
		for (let i in resultData) {
			let [num, score] = resultData[i];
			await updateQuery({
				field: 'peopleNum',
				newFieldData: `'${num}'`,
				tableName: 'extscore',
				where: `where extName = '${i}'`,
			});
			await updateQuery({
				field: 'totalScore',
				newFieldData: `'${score}'`,
				tableName: 'extscore',
				where: `where extName = '${i}'`,
			});
		}
		return resultData;
	});
}

app.post('/saveScore', async (req, res) => {
	const { userName } = req.query;
	await updateQuery({
		field: 'score',
		newFieldData: `'${JSON.stringify(req.body)}'`,
		tableName: 'users',
		where: `where userName = '${userName}'`,
	}).then(async ({affectedRows}) => {
		if(affectedRows > 0) {
			let resultData = await updateScore();
			res.send({
				message: '评分数据提交成功',
				resultData
			});
		} else {
			res.send({message: '评分数据提交失败'});
		}
	});
});

async function getMailCode(target, code) {
	return await selectQuery({
		field: '*', /*字段*/
		tableName: 'registeremail', /*表名*/
		where: `where email = '${target}' ${ code ? "and code = \'" + code + "\'" : '' }` , /*条件*/
	});
}

async function saveMailCode(target, code) {
	let deleteData = async () => {
		return await deleteQuery({
			tableName: 'registeremail', /*表名*/
			where: `where email = '${target}'`,
		})
	}
	const result = await getMailCode(target);
	if(result.length) {
		//数据库里有结果，就不应该存数据了
		return false;
	}
	await insertQuery({
		fields: 'email, code', /*字段组*/
		newFieldData: `'${target}', '${code}'`, /*新数据组*/
		tableName: 'registeremail', /*表名*/
	}).then(({affectedRows}) => {
		if(affectedRows > 0) {
			//60秒后删除验证码数据
			setTimeout(deleteData, 60000);
		}
	});
}

//邮箱验证
app.post('/getMailCode', async (req, res) => {
	//生成验证码
	const codeStr = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

	// 用来生成随机整数
	function getRandom(n, m) { // param: (Number, Number)
		// 确保 m 始终大于 n
		(n > m) && ([n, m] = [m, n]); //短路运算 + 数组解构,替换两个变量的值
		return Math.floor(Math.random() * (m - n) + n);
	}

	let str = '';
	// 验证码有几位就循环几次
	for (let i = 0; i < 6; i++) {
		str += codeStr.charAt(getRandom(0, 62));
	}

	if((await saveMailCode(req.body.email, str)) === false){
		return res.send({
				code: 400,
				message: '一分钟内不能重复获取验证码',
		});
	}

	const mailOptions = {
		from: '"root【请勿回复此邮件】" <2954700422@qq.com>', //邮件来源
		to: req.body.email, //邮件发送到哪里，多个邮箱使用逗号隔开
		subject: 'noname-server邮箱验证', // 邮件主题
		text:`
			您的验证码是：${str}。
			请在一分钟内完成注册。
			如非本人操作，请忽略。
			您的验证码只用于注册noname-server用户，请勿泄露及转发。
		`, // 存文本类型的邮件正文
		html: `
			您的验证码是：<b>${str}</b>。</br>
			<b>请在一分钟内完成注册。</b></br>
			如非本人操作，请忽略。</br>
			您的验证码只用于注册noname-server用户，请勿泄露及转发。
		`, // html类型的邮件正文
	};

	transporter.sendMail(mailOptions, (error, info) => {
		if (error) {
			return res.send({
				code: 200,
				message: `邮件发送失败：${error}`,
			});
		}
		res.send({
			code: 200,
			message: '邮件已发送，验证码有效期为一分钟',
		});
	});
});

app.post('/registerUser', (req, res) => {
	const form = new multiparty.Form();
	form.encoding = 'utf-8';
	form.uploadDir = __dirname + "/users";
	form.parse(req, async (err, fields, files) => {
		const userName = fields['userName'][0];
		const passWord = fields['passWord'][0];
		const email = fields['email'][0];
		const verificationCode = fields['verificationCode'][0];
		const avatar = files['avatar'][0];
		const url = path.join(__dirname , 'users' , userName, 'avatar.jpg');
		const folderUrl = path.join(__dirname , 'users' , userName);
		const commentUrl = path.join(__dirname , 'users' , userName, 'comment');

		function removeFile() {
			//未通过注册时删除上传的文件
			if(fs.existsSync(avatar.path)) fs.unlink(avatar.path, () => {});
		}

		let hasUser = (await selectQuery({
			field: '*',
			tableName: 'users',
			where: `where userName = '${userName}'`,
		})).length > 0;

		if(hasUser) {
			removeFile();
			return res.send({
				code: 400,
				message: '用户名已被注册',
			});
		}

		const MailCodeResult = await getMailCode(email);

		if(!MailCodeResult.length) {
			//数据库里没有存储验证码
			removeFile();
			return res.send({
				code: 400,
				message: '验证码过期或未获取验证码',
			});
		}

		const MailCodeResult2 = await getMailCode(email, verificationCode);
		if(!MailCodeResult2.length) {
			removeFile();
			return res.send({
				code: 400,
				message: '验证码错误',
			});
		}

		//注册成功后删除数据库中记录的验证码信息
		await deleteQuery({
			tableName: 'registeremail', /*表名*/
			where: `where email = '${email}'`,
		});

		//创建用户文件夹
		if(!fs.existsSync(folderUrl)) fs.mkdirSync(folderUrl);
		//创建用户评论文件夹
		if(!fs.existsSync(commentUrl)) fs.mkdirSync(commentUrl);
		//移动头像文件
		fs.renameSync(avatar.path, url);

		//用户信息存入数据库
		await insertQuery({
			fields: 'userName, passWord, access, score, email', /*字段组*/
			newFieldData: `'${userName}', '${passWord}', 'normal', null, '${email}'`, /*新数据组*/
			tableName: 'users', /*表名*/
		}).then(({affectedRows}) => {
			if(affectedRows > 0) {
				res.send({
					code: 200,
					message: '注册成功',
				});
			} else {
				removeFile();
				res.send({
					code: 400,
					message: '注册失败, 数据库写入数据失败',
				});
			}
		}).catch(({message}) => {
			removeFile();
			res.send({
				code: 400,
				title: '注册失败',
				message,
			});
		});
	});
});

app.use('/getApp', (req, res) => {
	let filePath = path.join(__dirname , 'files/game' , decodeURI(req.url));
	let bool = fs.existsSync(filePath);
	if (bool) {
		res.sendFile(filePath);
	} else {
		res.send('Error: ENOENT: no such file or directory');
	}
});

async function getCommentLoop(result) {
	for (let i = 0; i < result.length; i++) {
		//默认没被点赞
		result[i].isLike = false;
		//默认不展示评论
		result[i].showComment = false;
		//发布评论的时间格式化
		result[i].date = moment(new Date(result[i].date)).format('YYYY-MM-DD HH:mm:ss');
		//此评论被删除了
		if(result[i].deleted != 'N') {
			//判断是否有人回复此评论，如果没有，就不显示
			let replyNum = await selectQuery({
				field: 'toId',
				tableName: 'comment',
				where: `where toId = ${result[i].id} and deleted = 'N'`
			}).then(result2 => result2.length);
			if(replyNum > 0) {
				result[i].content = '此条评论已被删除';
			} else {
				result.splice(i, 1);
				i--;
				continue;
			}
		}
		//如果评论是path开头
		if(result[i].content.startsWith('path:')) {
			let filePath = path.join(__dirname, 'users', result[i].fromId, result[i].content.slice(5));
			result[i].content = fs.readFileSync(filePath, 'utf-8');
		}
		//如果是回复别人的评论
		if(result[i].toId) {
			const to = await selectQuery({
				field: '*',
				tableName: 'comment',
				where: `where id = ${result[i].toId} and ownerId = ${result[i].ownerId}`
			}).then(result2 => result2[0]);
			result[i].toName = to.fromId;
		}
		if(result[i].reply == null) result[i].reply = [];
		else {
			//储存的被评论id转换成对应的评论数据
			await selectQuery({
				field: '*',
				tableName: 'comment',
				where: `where id in (${result[i].reply}) and ownerId = ${result[i].ownerId}`
			}).then(async result2 => {
				result[i].reply = await getCommentLoop(result2);
			});
		}
	}
	return result;
}

app.use('/getComment', (req, res) => {
	selectQuery({
		field: '*',
		tableName: 'comment',
		where: `where toId is null and deleted = 'N'`
	})
	.then(getCommentLoop)
	.then(data => {
		res.send({
			status: "成功",
			code: 200,
			data
		});
	})
	.catch(({message}) => {
		res.send({
			status: "失败",
			code: 400,
			data: [],
			message
		});
	});
});

app.get('/setComment', async (req, res) => {
	const { userName, isLike, ownerId } = req.query;
	if(isLike) {
		//修改了点赞
		const like = JSON.parse(isLike);
		//点赞数
		let likeNum;
		await selectQuery({
			field: 'likeNum',
			tableName: 'comment',
			where: `where ownerId = '${ownerId}' and toId is null`
		}).then(r => {
			if(r[0].likeNum != null) likeNum = r[0].likeNum;
			else likeNum = 0;
		});

		let getLikeData;
		await selectQuery({
			field: 'thumbsUp',
			tableName: 'users',
			where: `where userName = '${userName}'`
		}).then(r => {
			if(r[0].thumbsUp != null) getLikeData = r[0].thumbsUp.split(',');
			else getLikeData = [];
		});

		if(like) {
			//点赞评论
			if(!getLikeData.includes(ownerId)) getLikeData.push(ownerId);
		} else {
			//取消点赞
			if(getLikeData.includes(ownerId)) getLikeData.splice(getLikeData.findIndex(e => e == ownerId), 1);
		}

		await updateQuery({
			field: 'thumbsUp',
			newFieldData: getLikeData.join(',') ? `'${getLikeData.join(',')}'` : null,
			tableName: 'users',
			where: `where userName = '${userName}'`,
		}).then(async ({affectedRows}) => {
			if(affectedRows > 0) {
				await updateQuery({
					field: 'likeNum',
					newFieldData: likeNum + (like ? 1 : -1),
					tableName: 'comment',
					where: `where ownerId = '${ownerId}' and toId is null`,
				}).then(({affectedRows}) => {
					if(affectedRows > 0) res.send({code: '200'});
					else res.send({code: '400'});
				});
			} else {
				res.send({code: '400'});
			}
		});
	}
});

app.get('/deleteComment', async (req, res) => {
	const { userName, id, ownerId } = req.query;
	await updateQuery({
		field: 'deleted',
		newFieldData: `'Y'`,
		tableName: 'comment',
		where: `where id = '${id}' and ownerId = '${ownerId}' and fromId = '${userName}'`,
	}).then(async ({affectedRows}) => {
		if(affectedRows > 0) {
			res.send({code: '200'});
		} else {
			//删除失败，判断是否有管理员权限，然后再重新删除
			await selectQuery({
				field: 'userName, access',
				tableName: 'users',
				where: `where userName = '${userName}' and access = 'root'`
			}).then(async result => {
				if(result.length > 0) {
					await updateQuery({
						field: 'deleted',
						newFieldData: `'Y'`,
						tableName: 'comment',
						where: `where id = '${id}' and ownerId = '${ownerId}'`,
					}).then(({affectedRows}) => {
						if(affectedRows > 0) {
							res.send({code: '200'});
						} else {
							res.send({code: '400'});
						}
					});
				} else {
					res.send({code: '400'});
				}
			})
		}
	}).catch(({message}) => {
		res.send({code: '400', message});
	});
});

//提交评论
app.post('/submitComment', (req, res) => {
	const form = new multiparty.Form();
	form.parse(req, async (err, fields, files) => {
		const comment = fields['comment'][0];
		const userId = fields['userId'][0];
		const ownerId = fields['ownerId'][0];
		const toId = fields?.['toId']?.[0]; //toId只有回复评论的时候有
		const date = moment(new Date(fields['date'][0])).format('YYYY-MM-DD HH:mm:ss');
		const sourceId = fields?.['sourceId']?.[0]; //sourceId只有回复评论的时候有

		await insertQuery({
			fields: `ownerId, fromId, content, toId, date`, /*字段组*/
			newFieldData: `'${ownerId}', '${userId}', 'null', ${toId ? '\'' + toId + '\'' : null}, '${date}'`, /*新数据组*/
			tableName: 'comment', /*表名*/
		})
		.then(async ({affectedRows, insertId}) => {
			if(affectedRows > 0) {
				const filePath = `path:comment/${insertId}`, where = `where id = '${insertId}'`;

				//把评论数据转存为文件
				await updateQuery({
					field: 'content',
					newFieldData: `'${filePath}'`,
					tableName: 'comment',
					where,
				}).then(() => {
					fs.writeFileSync(path.join(__dirname, 'users', userId, filePath.slice(5)), comment);
				}).catch(({message}) => {
					console.error(message);
				});

				if(sourceId) {
					//获取主评论的回复，转化为数组
					let getreplyData;
					await selectQuery({
						field: 'reply',
						tableName: 'comment',
						where: `where id = '${sourceId}'`
					}).then(r => {
						if(r[0].reply != null) getreplyData = r[0].reply.split(',');
						else getreplyData = [];
					});

					getreplyData.push(insertId);

					await updateQuery({
						field: 'reply',
						newFieldData: `'${getreplyData.join(',')}'`,
						tableName: 'comment',
						where: `where id = '${sourceId}'`,
					}).then(async ({affectedRows}) => {
						if(affectedRows > 0) {
							res.send({code: '200'});
						} else {
							res.send({code: '400', message: '数据修改失败'});
						}
					}).catch(({message}) => {
						res.send({code: '400', message});
					});
				} else {
					res.send({code: '200'});
				}
			} else {
				res.send({code: '400', message: '数据添加失败'});
			}
		})
		.catch(({message}) => {
			res.send({code: 400, message});
		})
	});
});

//查看指定用户信息
app.post('/getUserData', async (req, res) => {
	const form = new multiparty.Form();
	form.parse(req, async (err, fields, files) => {
		const userName = fields['userName'][0];
		const targetName = fields['targetName'][0];
		let access = (userName == targetName);
		if(!access) {
			await selectQuery({
				field: 'access',
				tableName: 'users',
				where: `where userName = '${userName}'`
			}).then(r => {
				access = (r[0].access == 'root');
			});
		}
		await selectQuery({
			field: access ? 'userName, passWord, email' : 'userName, email',
			tableName: 'users',
			where: `where userName = '${targetName}'`
		}).then(r => {
			r[0].avatar = null;
			res.send({
				code: 200,
				data: r[0]
			});
		}).catch(({message}) => {
			res.send({
				code: 400,
				data: [],
				message
			});
		});
	});
});

//修改用户信息
app.post('/setUserData', async (req, res) => {
	const form = new multiparty.Form();
	form.uploadDir = __dirname + "/users";
	form.parse(req, async (err, fields, files) => {
		const sendMessage = {
			code: 400,
			fields: false,
			avatar: false,
		};
		const userName = fields['userName'][0];
		const passWord = fields?.['passWord']?.[0];
		const email = fields?.['email']?.[0];
		const avatar = files?.['avatar']?.[0];

		if(passWord && email) {
			await updateQuery2({
				newData: [{
					field: 'passWord',
					newFieldData: `'${passWord}'`,
				}, {
					field: 'email',
					newFieldData: `'${email}'`,
				}],
				tableName: 'users', /*表名*/
				where: `where userName = '${userName}'`,
			}).then(async ({affectedRows}) => {
				if(affectedRows > 0) {
					sendMessage.code = 200;
					sendMessage.fields = true;
				}
			});
		}
		if(avatar) {
			const url = path.join(__dirname , 'users' , userName, 'avatar.jpg');
			fs.renameSync(avatar.path, url);
			sendMessage.code = 200;
			sendMessage.avatar = true;
		}
		res.send(sendMessage);
	});
});

const server = app.listen(10001, getNetworkIp(), () => {
	const host = server.address().address;
	const port = server.address().port;
	fs.writeFileSync(path.join(__dirname, '../src/config.js'), `export default 'http://${host}:${port}';`);
	console.log('服务器启动: http://%s:%s', host, port);
});
