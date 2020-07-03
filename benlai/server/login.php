<?php

include_once "./connectDB.php";

$phone = $_REQUEST["phone"];
$password = $_REQUEST["password"];

/* 用户登录的时候逻辑： */
/* 先检查该用户是否存在，如果不存在那么应该返回错误提示:该用户名不存在 */
/* 如果用户存在，那么应该继续检查密码，如果密码不正确，应该返回错误提示：密码不正确 */
/* 如果密码正确，应该返回正确的提示：登录成功！！！ */

$sql = "SELECT * FROM `user` WHERE phone = '$phone'";
$result= mysqli_query($db,$sql);
$data = array("status"=>"","data"=>array("msg"=>""));
if(mysqli_num_rows($result) == 0)
{
  # (2-1) 如果不存在，那么就返回数据(登录失败，用户名不存在)
  $data["status"] = "error";
  $data["data"]["msg"] = "登录失败，用户名不存在";
}else{
  # (2-2) 如果用户名存在，接着检查密码
  $sql2 = "SELECT * FROM user WHERE phone='$phone'";
  $result = mysqli_query($db,$sql2);
  $res = mysqli_fetch_all($result, MYSQLI_ASSOC)[0];
  $pwd = $res["password"];
  if($password !=  $pwd)
  {
    # (2-2-1) 密码不正确，那么就返回数据(登录失败，密码错误)
    $data["status"] = "error";
    $data["data"]["msg"] = "登录失败，密码不正确！！！";
  }else
  {
    # (2-2-2) 密码正确，那么就返回数据(登录成功)
    $userId = $res["id"];
    $data["status"] = "success";
    $data["data"]["msg"] = "恭喜你，登录成功";
    $data["data"]["userId"] = $userId;
    $data["data"]["password"] = $password;
    $data["data"]["username"] = $phone;
  }
}

# 最后，需要把结果以JSON数据的方式返回
echo json_encode($data,true);

?>