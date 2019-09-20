# groupmail
根据excel中的信息，批量发送邮件，并且可以用excel中的值替换要发送的邮件

注意:
1. 如需使用需要下载[wangEditor](https://github.com/wangfupeng1988/wangEditor)，并放到根目录中
2. 目录中必须包含emailFlag这个文件夹，作用是保存发送邮件的hash值，避免重复发送邮件
目录结构
```
sendEmail
│  email.php
│  Smtp.class.php
│  xml.xml
│  发送邮件.html
│  
├─css
│      index.css
│      
├─emailFlag 需要自行手动创建
├─img
│      forkme_left_darkblue_121621.png
│      
├─js
│      date.js
│      editor.js
│      excel.js
│      global.js
│      table.js
│      
└─wangEditor
      里面的内容请自行下载
```
