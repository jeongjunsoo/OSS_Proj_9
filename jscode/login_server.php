<?php

include('db.php');

if(isset($_POST['user_id']) && isset($_POST['pass1']))
{

   // sql injection protection
   $user_id = mysqli_real_escape_string($db,$_POST['user_id']);
   $pass1 = mysqli_real_escape_string($db,$_POST['pass1']);

    // 에러 체크
    if(empty($user_id))
    {
        header("location: index.php?error=아이디가 비어있어요");
        exit();
    }
    else if(empty($pass1))
    {
        header("location: index.php?error=비밀번호가 비어있어요");
        exit();
    }
    else //DB 로그인
    {
       $sql = "select * from member where mb_id = '$user_id'";
       $result = mysqli_query($db,$sql);

       if(mysqli_num_rows($result) == 1)
       {
          $row = mysqli_fetch_assoc($result);
          $hash = $row['password'];

          if(password_verify($pass1,$hash))
          {
            // App.js 로 가야하는데 모르겠다 <- ......몰라
            header("Location: https://www.naver.com");
            exit();
          }
          else
          {
            header("location: index.php?error=로그인이 실패하였습니다.");
            exit();
          }

       }
       else
       {
        header("location: index.php?error=아이디를 잘못 입력하셨습니다.");
        exit();
       }
    }
}
else
{
    // 에러 출력
    header("location: index.php?success=알 수 없는 오류가 발생함.");
    exit();
}



?>