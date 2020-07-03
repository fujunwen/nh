<?php

/* 1、连接数据库 */
include_once "./connectDB.php";

$page = $_REQUEST["page"];  /* 0 1 2 3  */
$sort = $_REQUEST["sort"];

$limit = $page * 20;

if($sort == "default"){
  $sql = "SELECT * FROM goods Order BY goods_id LIMIT $limit,20";
}elseif($sort == "price_asc"){
  $sql = "SELECT * FROM goods Order BY price ASC LIMIT $limit ,20";
} elseif ($sort == "price_desc") {
  $sql = "SELECT * FROM goods Order BY price DESC LIMIT $limit,20";
}

$result = mysqli_query($db,$sql);
$data = mysqli_fetch_all($result,MYSQLI_ASSOC);

/* 3、把数据转换为JSON数据返回 */
echo json_encode($data,true);
?>