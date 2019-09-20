//循环点击每个发送按钮，发送所有邮件

function sendAll() {
    var submitSends = document.getElementsByClassName("submitSend");
    var len = submitSends.length;
    alert(len);
    if (len < 1) {
        alert("没有需要批量发送的邮件");
        return;
    }
    for (var i = 0; i < len; i++) {
        submitSends[i].click();
    }
}

function addRow() {
    var tab = document.getElementById("info_table");
    //alert(tab.rows.length)
    var rownum = tab.rows.length + 1; // 行数
    var newRow = tab.insertRow(rownum - 1);

    var cellname = newRow.insertCell(0);
    cellname.innerHTML = (rownum - 1);

    var cellage = newRow.insertCell(1);
    cellage.innerHTML = "<input type='email' value='' />";
    var cellage = newRow.insertCell(2);
    cellage.innerHTML = "<input type='text' value=''/>";
    var cellage = newRow.insertCell(3);
    cellage.innerHTML = "<textarea rows='8'></textarea>";
    var cellage = newRow.insertCell(4);
    cellage.innerHTML = "";

    var action = newRow.insertCell(5);
    action.innerHTML = button_del_save_html;
}

function save(obj) {
    var tr = obj.parentNode.parentNode; // 获取的本行的tr 
    tr.cells[1].innerHTML = tr.cells[1].childNodes[0].value
    tr.cells[2].innerHTML = tr.cells[2].childNodes[0].value

    tr.cells[3].innerHTML = tr.cells[3].childNodes[0].value

    tr.cells[5].innerHTML = "<td>"+button_del_update_send_html+"</td>";
}

function dele(obj) {
    //提示
    var c = confirm("确定删除吗");
    //判断
    if (!c) {
        return;
    }
    var otr = obj.parentNode.parentNode;
    var tab = otr.parentNode; //自己的父节点 就是table  
    tab.removeChild(otr);
}

function update(obj) {
    var tr = obj.parentNode.parentNode; // 获取的本行的tr 
    tr.cells[1].innerHTML = "<input type='email' value='" + tr.cells[1].innerHTML + "' />";
    tr.cells[2].innerHTML = "<input type='text' value='" + tr.cells[2].innerHTML + "'/>";
    tr.cells[3].innerHTML = "<textarea rows='8'>" + tr.cells[3].innerHTML + "</textarea>";
    tr.cells[5].innerHTML = button_del_save_html;
}
//以table中的行为单位发送邮件

function send(obj) {
    var tr = obj.parentNode.parentNode;
    sendEmail({
        "to": tr.cells[1].innerHTML,
        "title": tr.cells[2].innerHTML,
        "content": tr.cells[3].innerHTML
    }, obj);
}

var sendEmail = function(email, obj) {
    var tr = obj.parentNode.parentNode;
    var xmlhttp;
    if (window.XMLHttpRequest) {
        //  IE7+, Firefox, Chrome, Opera, Safari 浏览器执行代码
        xmlhttp = new XMLHttpRequest();
    } else {
        // IE6, IE5 浏览器执行代码
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var data = JSON.parse(xmlhttp.responseText)
            if (data["ok"] == 1) {
                tr.cells[4].innerHTML = data["sendmail"];
            } else {
                tr.cells[4].innerHTML = data["info"];
            }
        }
    }
    var info = document.getElementById("info");
    xmlhttp.open("POST", "email.php", true);
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    tr.cells[4].innerHTML = "正在发送";
    xmlhttp.send(JSON.stringify(email));
}