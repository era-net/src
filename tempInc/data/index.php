<?php

if ($_SERVER["REQUEST_METHOD"] === "GET") {

  echo json_encode(file_get_contents("03102019002141.json"));
}