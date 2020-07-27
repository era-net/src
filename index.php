<?php

require_once "./assets/php/MAIN_MYSQL/MAIN_MYSQL.php";

$db = new MAIN_MYSQL([
  'server' => 'localhost',
  'database' => 'div_project',
  'table' => 'posts',
  'username' => 'erwin',
  'password' => 'erwin'
]);
?>