<?php
header("Content-type:text/html;charset=utf-8");
//获取传过来的数据
$data = json_decode(file_get_contents("php://input"), true);


$file = 'xml.xml';
//将XML中的数据,读取到数组对象中
$xml_object=simplexml_load_file($file); 

$emailList = $xml_object->data;

require_once "Smtp.class.php";

for($email_pos = 0; $email_pos < sizeof($emailList); $email_pos++){
    $smtpserver = $emailList[$email_pos]->server;//SMTP服务器  其他的写stmp.xx.com就好了，QQ的不行，加了ssl://才可以
    $smtpserverport = (int)$emailList[$email_pos]->port;//SMTP服务器端口
    $smtpusermail = $emailList[$email_pos]->usermail;//SMTP服务器的用户邮箱
    
    $smtpuser = $emailList[$email_pos]->user;//SMTP服务器的用户帐号，注：部分邮箱只需@前面的用户名
    $smtppass = $emailList[$email_pos]->psw;//SMTP服务器的用户密码
    
    //echo $smtpserver."\n".$smtpserverport."\n".$smtpusermail."\n".$smtpuser."\n".$smtppass."\n";
    
    $smtpemailto = $data["to"];//发送给谁
    
    $mailtitle = $data["title"];//邮件主题
    
    
    $mailcontent = $data["content"];//邮件内容
    
    $md5Flag = md5($smtpemailto . $mailtitle . $mailcontent);
    $fileName = "emailFlag/".$md5Flag;
    if(file_exists($fileName)){
        echo '{ "ok":"0" , "info":"内容重复"}';
        exit();
    }
    

    
    
    
    $mailtype = "HTML";//邮件格式（HTML/TXT）,TXT为文本邮件
    $smtp = new Smtp($smtpserver,$smtpserverport,true,$smtpuser,$smtppass);//这里面的一个true是表示使用身份验证,否则不使用身份验证.
    $smtp->debug = false;//是否显示发送的调试信息
    $state = $smtp->sendmail($smtpemailto, $smtpusermail, $mailtitle, $mailcontent, $mailtype);
    if($state==""){
        //echo "要发送的邮箱:".$smtpemailto."<br />";
        //echo "error\n";
        //$data = json_decode(file_get_contents("php://input"));
        //$data = var_dump(file_get_contents("php://input"));
        //var_dump(json_decode(file_get_contents("php://input"), true));
        //echo "<a href='index.html'>点此返回</a>";
        //exit();
    }else{
        echo '{ "ok":"1" , "sendmail":"'.$emailList[$email_pos]->usermail.'"}';
        
        $myfile = fopen($fileName, "w");
        fclose($myfile);
        
        exit();
    }
}
echo '{ "ok":"0" , "info":"邮件群发系统账号资源耗尽"}';

    
    