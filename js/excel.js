// 获取excel中的内容，并设置table，让他显示
var getExcel = function () {
    var t1 = document.getElementById("info_table");

    var rowNum = t1.rows.length;
    if (rowNum > 1) {
        for (i = 1; i < rowNum; i++) {
            t1.deleteRow(i);
            rowNum = rowNum - 1;
            i = i - 1;
        }
    }

    //var files = e.target.files;
    var files = document.getElementById("excel-file").files;
    if (files.length != 1) {
        alert("文件选择错误，请选择1个excel文件");
        return;
    }
    console.log(files);
    var fileReader = new FileReader();
    fileReader.onload = function (ev) {
        try {
            var data = ev.target.result
            var workbook = XLSX.read(data, {
                type: 'binary'
            }) // 以二进制流方式读取得到整份excel表格对象
            var persons = []; // 存储获取到的数据
        } catch (e) {
            console.log('文件类型不正确');
            return;
        }
        // 表格的表格范围，可用于判断表头是否数量是否正确
        var fromTo = '';
        // 遍历每张表读取
        for (var sheet in workbook.Sheets) {
            if (workbook.Sheets.hasOwnProperty(sheet)) {
                fromTo = workbook.Sheets[sheet]['!ref'];
                console.log(fromTo);
                persons = persons.concat(XLSX.utils.sheet_to_json(workbook.Sheets[sheet]));
                // break; // 如果只取第一张表，就取消注释这行
            }
        }
        //获取内容

        var old_content = document.getElementById("content").value;

        //var old_content = editor.txt.html();



        var old_title = document.getElementById("title").value;
        //在控制台打印出来表格中的数据
        console.log(persons);
        if (!persons[0]["邮箱"]) {
            alert("未检测到excel中存在【邮件】列，请添加后再试");
            return;
        }
        var time1 = new Date().format("yyyy-MM-dd hh:mm:ss");

        //console.log(time1);
        // for(let k in persons[0]) {  
        //     console.log(k);  
        // }
        for (var i = 0; i < persons.length; i++) {
            var email_content = old_content;
            var email_title = old_title;
            for (let k in persons[i]) {

                email_content = email_content.replace(new RegExp("#" + k + "#", 'g'), persons[i][k]);
                email_content = email_content.replace(new RegExp("#时间#", 'g'), time1);
                email_title = email_title.replace(new RegExp("#" + k + "#", 'g'), persons[i][k]);
                email_title = email_title.replace(new RegExp("#时间#", 'g'), time1);

                //console.log(persons[i][k]);  
            }
            var table = document.getElementById("info_table");
            var rows = table.rows.length;
            var newRow = table.insertRow(); //创建新行
            //序号
            var newCell1 = newRow.insertCell(0); //创建新单元格
            newCell1.innerHTML = "<td>" + rows + "</td>"; //单元格内的内容
            newCell1.setAttribute("align", "center"); //设置位置
            //邮箱
            var newCell2 = newRow.insertCell(1); //创建新单元格
            newCell2.innerHTML = "<td>" + persons[i]["邮箱"] + "</td>";
            newCell2.setAttribute("align", "center"); //设置位置
            //主题
            var newCell3 = newRow.insertCell(2); //创建新单元格
            newCell3.innerHTML = "<td>" + email_title + "</td>";
            newCell3.setAttribute("align", "center"); //设置位置
            //内容
            var newCell4 = newRow.insertCell(3); //创建新单元格 

            newCell4.innerHTML = "<td>" + email_content + "</td>";
            //发送邮箱
            var newCell5 = newRow.insertCell(4); //创建新单元格 
            newCell5.innerHTML = "<td></td>";
            newCell5.setAttribute("align", "center"); //设置位置  
            //操作
            var newCell6 = newRow.insertCell(5); //创建新单元格 
            newCell6.innerHTML = "<td>" + button_del_update_send_html + "</td>";


            newCell6.setAttribute("align", "center"); //设置位置  
        }
    };
    // 以二进制方式打开文件
    fileReader.readAsBinaryString(files[0]);
}

 //给input标签绑定change事件，一上传选中的.xls文件就会触发该函数
$('#excel-file').change(function (e) {
    var step2s = document.getElementsByClassName("step2");
    for (var i = 0; i < step2s.length; i++) {
        step2s[i].style.display = "inline";
        console.log(step2s[i]);
    }
});

$('#title').change(function () {
    var step3s = document.getElementsByClassName("step3");
    for (var i = 0; i < step3s.length; i++) {
        step3s[i].style.display = "inline";
    }
    var step4s = document.getElementsByClassName("step4");
    for (var i = 0; i < step4s.length; i++) {
        step4s[i].style.display = "inline";
    }
    var step5s = document.getElementsByClassName("step5");
    for (var i = 0; i < step5s.length; i++) {
        step5s[i].style.display = "inline";
    }
});