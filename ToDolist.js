function readInput() {
    var text = document.getElementById('todo');
    var form = document.getElementById('form');
    if(text.value.trim() ===''){
         alert('请填写此字段。');
         form.reset();
    }else{
        add();
        form.reset();//reset() 方法可把表单中的元素重置为它们的默认值
    }
}
//增加记录
function add() {
    var textIn = document.getElementById('todo').value;
    var inLiHtml = document.getElementById('in').getElementsByTagName('li');
    if(inLiHtml.length ===0){
    //没有记录就新增记录
        var i =0;
        document.getElementById('in').innerHTML = "<li id=\"in-queue-"+i+"\">\n" +
            "                <input type=\"checkbox\" onclick='check(this)' id='in"+i+"'/>\n" +
            "                <p>"+textIn+"</p>\n" +
            "                <a href=\"#\" onclick=\"del(this.id)\" style='color: red' id='ai"+i+"'>\n" +
            "                    <i class=\"far fa-trash-alt\"></i>\n" +
            "                </a>\n" +
            "            </li>";

        count();
    }else {
    //有记录就先拿到所有的li标签个数，增加一个
        var liNum = inLiHtml.length;
        var liNumP = liNum+1;
        var data = document.getElementById('in').innerHTML;
        var node = '';
        // node.setAttribute('id',"in-queue-"+liNumP);
        node = "<li id=\"in-queue-"+liNumP+"\">\n" +
            "                <input type=\"checkbox\" onclick='check(this)' id='in"+liNumP+"'/>\n" +
            "                <p>"+textIn+"</p>\n" +
            "                <a href=\"#\" onclick=\"del(this.id)\" style='color: red' id='ai"+liNumP+"'>\n" +
            "                    <i class=\"far fa-trash-alt\"></i>\n" +
            "                </a>\n" +
            "            </li>";
        node += data;
        document.getElementById('in').innerHTML = node;
        count();
    }
}
// 统计新增记录数
function count() {
    var countMsg = 0;
    var countRealMsg = document.getElementById('in').getElementsByTagName('li').length;
    if(countRealMsg>0){
        //在通过 innerText 写入值时，结果会删除元素的所有子节点，插入包含相应文本值的文本节点
        document.getElementById('countInID').innerText = countRealMsg;
    }else{
         document.getElementById('countInID').innerText = countMsg;
    }
}
// 统计完成的记录数
function countOut() {
    var countMsg = 0;
    var countRealMsg = document.getElementById('out').getElementsByTagName('li').length;
    if(countRealMsg>0){
        document.getElementById('countOutID').innerText = countRealMsg;
    }else{
         document.getElementById('countOutID').innerText = countMsg;
    }
}
// 清除记录
function clear() {
    document.getElementById('s1').innerHTML = "<h2>正在进行\n" +
        "        <span id=\"countInID\">\n" +
        "            0\n" +
        "        </span>\n" +
        "        <ol id=\"in\">\n" +
        "\n" +
        "        </ol>\n" +
        "    </h2>\n" +
        "    <h2>已经完成\n" +
        "        <span id=\"countOutID\">\n" +
        "            0\n" +
        "        </span>\n" +
        "        <ol id=\"out\">\n" +
        "\n" +
        "        </ol>\n" +
        "    </h2>";
    count();
    countOut();

}
// 删除选中记录
function del(idNum) {
    var reID = /[a-z][a-z]/.exec(idNum);
    var newIdNum = idNum.replace(/[^0-9]/ig,"");
    var newID = '';
    if(reID =='ai' || reID=='in'){
          newID = "in-queue-"+newIdNum;
    }else if(reID =='ao' || reID == 'ou'){
          newID = "out-queue-"+newIdNum;
    }
    var data = document.getElementById(newID);
    data.parentNode.removeChild(data);
    count();
    countOut();
}
//分组，选中的checkbox移动到完成项
function check(idNum) {
   var cID = idNum.id;
   var newID = cID;
   var choose = document.getElementById(cID).checked;
   if (choose){
       var node = '';
       var data1 = document.getElementById(cID).parentNode.innerHTML;
       var data = document.getElementById('out').innerHTML;
       var num = /\d+/.exec(data1);
       var pText = document.getElementById(cID).parentNode.innerText;
       del(newID);
       node = "<li id=\"out-queue-"+num+"\">\n" +
           "                <input type=\"checkbox\" onclick=\"check(this)\" style='color: red' id=\"out"+num+"\" checked=\"checked\"/>\n" +
           "                <p>"+pText+"</p>\n" +
           "                <a href=\"#\" onclick=\"del(this.id)\" id=\"ao"+num+"\">\n" +
           "                    <i class=\"far fa-trash-alt\"></i>\n" +
           "                </a>\n" +
           "            </li>";
       node += data;
       document.getElementById('out').innerHTML = node;
       count();
       countOut();
   }else if(!choose){
       var node2 = '';
       var data12 = document.getElementById(cID).parentNode.innerHTML;
       var data2 = document.getElementById('in').innerHTML;
       var num2 = /\d+/.exec(data12);
       var pText2 = document.getElementById(cID).parentNode.innerText;
       del(newID);
       node2 = "<li id=\"in-queue-"+num2+"\">\n" +
           "                <input type=\"checkbox\" onclick=\"check(this)\" style='color: red' id=\"in"+num2+"\" />\n" +
           "                <p>"+pText2+"</p>\n" +
           "                <a href=\"#\" onclick=\"del(this.id)\" id=\"ai"+num2+"\">\n" +
           "                    <i class=\"far fa-trash-alt\"></i>\n" +
           "                </a>\n" +
           "            </li>";
       node2 += data2;
       document.getElementById('in').innerHTML = node2;
       count();
       countOut();
   }
}