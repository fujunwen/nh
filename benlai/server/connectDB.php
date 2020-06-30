<?php
$db = mysqli_connect("localhost", "root", "root", "bl");

if (!$db) {
  die('连接错误: ' . mysqli_error($db));
}
?>