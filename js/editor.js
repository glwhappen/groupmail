//wangEditor富文本编辑器，调用对象名称editor
var E = window.wangEditor;
var editor = new E('#div3');
editor.customConfig.uploadImgShowBase64 = true;
//将富文本中的html同步到testarea
editor.customConfig.onchange = function (html) {
    document.getElementById("content").value = html;
}
editor.create();
// 将testarea中的内容同步到富文本编辑器
var input_content = document.getElementById("content");
input_content.onchange = function () {
    editor.txt.html(input_content.value);
}