## qiankun微前端在vue3中的使用详细说明

### 首先说一下，qiankun微前端在公司应用中解决了那些问题

- 1、项目大了之后改动一处便要将前端项目进行全部打包，而且打包时长有时候都可以喝一杯咖啡了。

- 2、多人协作，无论使用的什么框架都可以进行接入，react、vue、angular、jQuery、原生JS，由于公司有人比较喜欢使用原生JS，主要是历史悠久，封装了一套原生的JS库。

- 3、经常性的出现git提交代码发生冲突的问题，主要是解决合并代码解决冲突的能力不够，对git只会常用操作。


使用之后的感受

- 1、哪里有问题需要进行变更改动，便打包那个子系统即可。（当然也存在都要进行打包的情况，比如新增需求等等）

- 2、每个子系统可独立发挥团队中每个人的优势，使用自己熟悉的框架进行快速开发。

- 3、发生冲突的概率小了，不能说不存在了，同一个子系统有时候也是多个人一起协作的。还是要从根本上解决自身问题，使用git解决代码冲突的能力。


-------------------

### 当前项目目录如下（暂时抛弃其他没有使用到的文件和文件夹）

    ├── common/                # 存放共用的工具库
    ├── components/            # 存放公共的组件库
    ├── main-vite-app-ts/      # 存放主应用 main-vite-app-ts 的文件夹
    |── webpack-app/           # 存放微应用 webpack-app 的文件夹
    |── map-app/               # 存放微应用 map-app 的文件夹
    |——.....                   # 后续添加使用之后，再进行对应的补充
    |——qiankun.conf            # 项目部署的nginx基础配置文件
    |——build.sh                # 通过脚本对主应用和子应用进行统一的打包


#### 1、main-vite-app-ts 主应用开发环境启动后的访问地址 http://localhost:1000(yarn安装依赖如果有问题，可以尝试一下 pnpm i)

- 使用 Vue3 + Vite2 +TypeScript + Element Plus 搭建

-  vite2一款新的打包工具，打包的时候真的就比webpack要快，尤其是开发环境中，但毕竟是一个新的工具，目前还有非常多的缺陷

- 目前用于qiankun的限制，子应用使用vite2进行打包没那么方便，故只在主应用中使用vite2,待qiankun乾坤更新后再使用到子应用中

- 主要负责搭建项目的整体布局，顶部导航栏和左侧菜单列表，以及登录页面等404通用页面布局

- 负责子应用的注册引入和管理（可动态管理子应用）

#### 2、webpack-app-ts 微应用开发环境启动后的访问地址 http://localhost:4000(yarn安装依赖如果有问题，可以尝试一下 pnpm i)

- 使用 Vue3 + webpack + Element Plus 搭建

- 引用自己封装的组件  aehyok-form-vue3 进行demo页面的初始化，包括动态form表单和动态table列表，以及json阅读器

- 根据json配置对象直接生成动态form表单，目前已经完成基本架构，待有时间继续完善细节

- 根据son配置对象直接生成动态table列表，目前刚刚开始，很多功能还需要调整，已经在公司项目中使用，后期可能存在重构的情况，持续完善中

- 使用ffmpeg通过webassembly对视频进行前端转码功能的实现，目前demo可以查看，具体细节功能待后续完善

#### 3、map-app-ts 微应用开发环境启动后的访问地址 http://localhost:5000(yarn安装依赖如果有问题，可以尝试一下 pnpm i)

- 使用 Vue3 + webpack + Element Plus +TypeScript 搭建

- 使用leaflet展示地图并对基本图层进行处理

- 使用leflet-geoman处理点坐标和多边形坐标组的编辑

- 同时在该微应用项目中正在尝试vue3的hooks(学习中)

#### 4、common 公用方法库
> 使用方法：通过在文件上import 相对路径的方式引入

- 封装常用element-plus弹窗

- 封装请求 axios(准备使用typescript)

- 封装常用表单验证字段列表

- 封装常用字符串处理、数组处理、等等

- 封装常用日期转换、以及日期格式等

- 封装常用cookie、locaStorage、Web Sql 存储

- 封装一些常用的算法

#### 5、components 共用组件库

> 使用方法：通过在文件上import 相对路径的方式引入（qiankun乾坤共享组件这块还不成熟，可参考webpack5中联邦模块 Module Federation）

- 动态form表单生成器（已单独抽离到npm发包，具体可查看aehyok-form-vue3）

- 动态table表单生成器（已单独抽离到npm发包，具体可查看aehyok-form-vue3）

- 文件上传组件

- 下拉树组件

- 富文本编辑组件

- 等等，日常中使用的各种可复用的组件

#### 6、项目线上部署前的打包（通过脚本批量进行编译打包：项目根目录build.sh打包脚本）
> 通过  sh build.sh  执行脚本（如有使用请进行调节各个目录）当然你可以使用其他自动化的各种工具
  ```
    ## 1、当前脚本文件所在路径
    current_path=$(cd $(dirname $0); pwd)
    version='V0.1.0.0012'

    ## 打印当前目录
    echo $current_path

    # 打印当前目录文件列表
    # echo $a*

    #-----------------------------1、需要拉取的项目路径------------------

    ## 项目仓库本地文件路径
    base_url ='/e/work/aehyok/github/vue-qiankun'

    ## 开始pull拉取项目
    project_path=${base_url}
    cd $project_path
    git pull
      echo -e "\033[32m拉取项目：${project_path} 成功\033[0m";


    #-------------------------2、设置需要编译的项目路径----------------------
    npmbuild_pathArr=(
      "/e/work/aehyok/github/vue-qiankun/main-vite-app-ts"    #主应用
      "/e/work/aehyok/github/vue-qiankun/webpack-app"         # webpack-app 子应用
      "/e/work/aehyok/github/vue-qiankun/map-app"             #map-app 子应用
    )

    #-------------------------3、 开始 build 项目--------------------------
    for ((i=0;i<${#npmbuild_pathArr[*]};i++))
    do
      project_path=${npmbuild_pathArr[i]}
      cd $project_path
      yarn build
      echo -e "\033[32m编译项目：${npmbuild_pathArr[i]} 成功\033[0m";
    done

    #-------------------------4、 开始拷贝文件到服务器----------------------
    # /e/work/aehyok/github/qiankun 是我本地打包后的文件夹
    scp -r /e/work/aehyok/github/qiankun/main root@139.186.205.7:/usr/local/qiankun/main/


    ######、拷贝完之后进行git 的提交
    cd /e/work/aehyok/github/qiankun
    ## git add .
    ## git status
    ## sleep 1s
    ## message="chore：build.sh 脚本打包 commit-version:${version}"
    ## git commit -m $message .
    ## git push origin

    echo "5秒后将自动退出本脚本："
    for i in $(seq 5 -1 1)
    do
      echo -e $i;sleep 1
    done
    exit

    ## 执行脚本  sh build.sh
  ```

#### 7、打包和部署（仓库根目录qiankun.conf）

- 目前自己的项目部署在腾讯云上，通过nginx进行承载，灰常之方便
  ```
    server {
            listen 8080;
            server_name localhost;
            location / {
                root  /usr/local/qiankun/main/;
                index index.html;
            }
        }

  ```


- 主应用部署在一级目录模式为 hash模式，子应用部署在二级目录模式也为 hash

- 目前主要是一个主应用和两个微应用，打包后部署目录结构如下
    ```

    └── main/                 # 根文件夹
    |
    ├── child/                # 存放所有微应用的文件夹
    |   ├── webpack-app/      # 存放微应用 webpack-app 的文件夹
    |   ├── map-app/          # 存放微应用 map-app 的文件夹
    ├── index.html            # 主应用的index.html
    ├── css/                  # 主应用的css文件夹
    ├── js/                   # 主应用的js文件夹

    ```
----------------
### 后续迭代更新计划
上面说的应该都是demo中已经有的，或者正在进行优化中的。下面说的将会是继续优化，或者是将来有时间可能要做的一些思考吧。下面列举的是将要做，或者未来要做的（可能工作中如果有用到的进度就会在哪里，慢慢优化实践）
- 1、管理子系统模块的功能（目前数据全部通过接口获取）

- 2、管理子系统菜单的功能（目前数据为静态的配置文件）

- 3、管理授权的功能

- 4、管理下拉列表数据的字典功能

- 5、优化form表单生成器

- 6、优化table列表生成器

- 7、优化leaflet和geoman编辑图层的功能

- 8、cesium.js 实现2.5d或者3d地图可视化的功能

- 9、低代码和无代码工具的思考和实践

- 10、后期考虑接入后端api（java、nodejs或者.net core），对数据进行管理（目前通过rap2进行模拟api数据只能读）

- 11、大后期前后端一起考虑做一些从前端到后端一起减少工作量的封装

* 12、考虑子应用也可以单独登录、单独运行，添加一个模板。
---

### 目前本项目所使用的一些常用开源框架如下

    ├── aehyok-form-vue3       #  自己封装的json表单生成器，JSON Table列表生成器、JSON阅读器 架构已有，待优化细节
    ├── qiankun                #  微前端搭建框架，在主应用中
    ├── leaflet and geoman     #  web地图展示和编辑图层的组件，在map-app子应用中
    ├── rap2                   #  本项目静态数据都放到了rap2中，作为一个api数据提供者，很方便
    ├── swiper                 #  可实现很多效果的轮播图
    ├── @ffmpeg/ffmpeg         #  视频转码工具可通过wasm调用
    ├── swiper                 #  可实现很多效果的轮播图
    ├── vuex-persistedstate    #  针对vuex 进行缓存设置
    ├── v-contextmenu          #  鼠标右键事件触发弹窗
    ├── jsoneditor             #  json阅读编辑器
    ├── ......后续慢慢写进来

 ---
 ### 目前使用qiankun框架过程中，遇到的一些问题

 - 1、主应用中引入qiankun 乾坤框架，注意主应用注册微应用、加载微应用的时机，vue中应该在mounted或者onMounted中执行start()，要不然可能找不到我们定义的dom节点，因为页面还没有进行加载。

 - 2、子应用中引入百度地图如果升级无法解决，建议将地图放到主应用加载，微应用也引入这个地图 js（独立运行时使用），但是给 <script> 标签加上 ignore 属性。

 - 3、目前登录后的认证状态，存储在localStorage中，可实现主应用和子应用中共享访问缓存

 - 4、子应用中的返回上一页的调用无法使用vue3 路由中的 router.go(-1) ，需要使用window.history.go(-1), 待查看源码查证问题

 - 5、微应用打包之后 css 中的字体文件和图片加载 404 --建议查看https://qiankun.umijs.org/zh/faq#%E5%BE%AE%E5%BA%94%E7%94%A8%E6%89%93%E5%8C%85%E4%B9%8B%E5%90%8E-css-%E4%B8%AD%E7%9A%84%E5%AD%97%E4%BD%93%E6%96%87%E4%BB%B6%E5%92%8C%E5%9B%BE%E7%89%87%E5%8A%A0%E8%BD%BD-404

 - 6、qiankun 将会自动隔离微应用之间的样式（开启沙箱的情况下）,start方法中会有对应的参数设置
 ---

 ### 最后的最后
> [https://github.com/aehyok/vue-qiankun](https://github.com/aehyok/vue-qiankun)
  本文中不涉及到代码，有关代码问题可以访问文章开头的微前端github demo 仓库，github仓库将会保持持续更新，不断优化小demo。

> [https://github.com/aehyok/vue3-ele-form](https://github.com/aehyok/vue3-ele-form)
   同时对json数据配置生成动态form表单和table列表也会持续优化，目前刚刚在公司项目中尝试，等机会合适可能就让同事一起参与进来。

> [https://github.com/aehyok/2021](https://github.com/aehyok/2021)
   最后自己每天工作中的笔记记录仓库，主要以文章链接和问题处理方案为主。


