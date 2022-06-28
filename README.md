# 学生辅助教学工具（仍在开发）
## 基础
- git clone 本仓库
- 安装依赖`npm install`
- Start the server：开发环境：`npm run dev`或生产环境先运行 `npm build`再运行 `npm start`
-  前端可以在浏览器打开`localhost:port`，port需查看`/bin/www`或`package.json`文件

## 前端框架
next.js+……（仍在开发）
## 后端框架
koa+mongodb+……  （仍在开发）

## 目录结构

### 前端目录结构
```
前端目录结构

┌── .eslintrc.json 
├── .gitignore 
├── CHANGELOG.md 
├── jsconfig.json
├── LICENSE.md
├── package.json
├── README.md
├── .dockerignore
├── .editorconfig
├── .env.development
├── .env.production
├── .gitattributes
├── docker-compose.yml
├── docker-compose.debug.yml
├── Dockerfile
├── next-env.d.ts
├── package-lock.json
├── tsconfig.json
├── public
    └── static
        ├── images
        ├── icons
└── src
    └───__mocks__
	├── components
	├── helpers
	├── icons
	├── lib
	├── services
	├── theme
	├── utils
	└── pages
	    └──api
	        ├── events.js
	        ├── login.js
	        ├── logout.js
	        ├── register.js
	        └── user.js
	    ├── 404.js
	    ├── _app.js
	    ├── _document.js
	    ├── account.js
	    ├── customers.js
	    ├── index.js
	    ├── login.js
	    ├── products.js
	    ├── register.js
	    ├── reportWebVitals.js
	    └── settings.js
		
```
### 后端目录结构
```
后端目录结构
┌──bin
   ├──www
├──src
   ├──config
        └──index.js
   ├──controller
        ├──cutomerController.js
        ├──signController.js
        └──userController.js
    ├──data
        └──user.js
    ├──dbHelper
        └──index.js
    ├──error
        ├──ApiError.js
        └──AppErrorNames.js
    ├──middleware
        ├──responseFilter.js
        └──verify.js
    ├──model
        ├──sign.js
        └──user.js
    ├──router
        ├──customer.js
        ├──sign.js
        └──user.js
    ├──app.js
├──.babelrc
├──.gitignore
├──index.js
├──LICENSE
├──package.json
├──package-lock.json
├──README.md
└──
```


