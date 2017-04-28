<?php

include_once("../config.php");
include_once("../include/template.php");
include_once("../include/attachments.inc.php");
include_once("../include/functions-file.php");
include_once("../config/program.conf.php");
include_once("../config/db.conf.php");
include_once("../config/system.conf.php");
include_once("../include/member.inc.php");
include_once("../include/language.zh.php");
include_once("../lib/adodb/adodb.inc.php");
include_once("../include/function_ad.php");


global $db_origin;
global $issynchronous;
global $isAgent;
global $servicesclient;
global $servicestech;
global  $page_language;
/*
公用函数
*/
date_default_timezone_set ("PRC");//设置时间默认时区
$db = &ADONewConnection($db_type);
@$db->Connect($db_host,$db_user,$db_pass,$db_dbase);
$today = date("Y-m-d");
$start= $today.' '.'00:00:00';
$startday = strtotime ($start);//1470844800
$end = $today.' '.'23:59:59';
$endday = strtotime ($end);//1470931199
countIP($startday,$endday);
countUV($startday,$endday);
countPV();
/**
 * 统计pv
*/
function countPV(){
  //获取当前的url
  $url = 'http://'.$_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI'];
  global $db,$table_pre;
  $from = $_GET['from'];
  $track_id = $_GET['track_id'];
  if($from && $track_id){
    $sql1 ="select key_word,keyword_id from wdm_sem_keyword where key_hash= '{$track_id}' ";
    $query= $db->execute($sql1);
    $key_id = $query->fields['keyword_id'];
    $time = time();
    $sql = "insert into wdm_sem_pvnum (keyword_id,pv_num,pv_time) values($key_id,1,$time)";
    $row = $db->execute($sql);
  }
}

/**
 * 统计uv
 * @param unknown $url
 */
function countUV($startday,$endday){
  $time =time();
  global $db,$table_pre;
  $from = $_GET['from'];
  $track_id = $_GET['track_id'];
  if($from && $track_id){
    $url2 = 'http://'.$_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI'];
    if($url2!=$url){
      //得到真实ip 将信息存到表
      $realyip =getIP(); 
      $sql2 ="select key_word,keyword_id from wdm_sem_keyword where key_hash= '{$track_id}' ";
      $query= &$db->execute($sql2);
      $key_id = $query->fields['keyword_id'];
      //判断今天的当前关键词是否已存在uvnum表中
      $sqlname ="select * from wdm_sem_uvnum where keyword_id= '{$key_id}' and uv_time BETWEEN $startday and $endday and uv_ip='{$realyip}' ";
      $query_name= &$db->execute($sqlname);
      $ip_name = $query_name->fields["uv_ip"];
      if($ip_name){
        //存在
        return null;
      }else {
        $sql2= "insert into wdm_sem_uvnum (keyword_id,uv_num,uv_time,uv_ip) values($key_id,1,$time,'{$realyip}')";
        $query= &$db->execute($sql2);
      }
    }
  }
}
/**
 * 统计ip
 */
function countIP($startday,$endday){
  $time =time();
  global $db,$table_pre;
  $from = $_GET['from'];
  $track_id = $_GET['track_id'];
  if($from && $track_id){
    $url2 = 'http://'.$_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI'];
    if($url2!=$url){
      $realyip =getIP(); //得到真实ip 将信息存到表
      $sql2 ="select key_word,keyword_id from wdm_sem_keyword where key_hash= '{$track_id}' ";
      $query= &$db->execute($sql2);
      $key_id = $query->fields['keyword_id'];
      //判断ip表中相同关键字记录的ip地址
      //不相同添加数据
      $sqlname ="select * from wdm_sem_ipnum where keyword_id= '{$key_id}' and ip_time BETWEEN $startday and $endday and ip_name='{$realyip}'";
      $query_name= &$db->execute("$sqlname");
      $ip_name = $query_name->fields["ip_name"];
      if($ip_name){
        return null;
      }
      else{
        //ip表中不存在ip的记录
        $sql2= "insert into wdm_sem_ipnum (keyword_id,ip_num,ip_time,ip_name) values($key_id,1,$time,'{$realyip}')";
        $query= &$db->execute($sql2);
      }
    }
  }
}

//获得真实IP
function getIP() {
  static $realip;
  if (isset($_SERVER)){
    if (isset($_SERVER["HTTP_X_FORWARDED_FOR"])){
      $realip = $_SERVER["HTTP_X_FORWARDED_FOR"];
    } else if (isset($_SERVER["HTTP_CLIENT_IP"])) {
      $realip = $_SERVER["HTTP_CLIENT_IP"];
    } else {
      $realip = $_SERVER["REMOTE_ADDR"];
    }
  }
  else {
    if (getenv("HTTP_X_FORWARDED_FOR")){
      $realip = getenv("HTTP_X_FORWARDED_FOR");
    } else if (getenv("HTTP_CLIENT_IP")) {
      $realip = getenv("HTTP_CLIENT_IP");
    } else {
      $realip = getenv("REMOTE_ADDR");
    }
  }
  return $realip;
}

?>