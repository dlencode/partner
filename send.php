<?php

$name   = strip_tags($_POST['name']);
$phone  = strip_tags($_POST['phone']);

$category = strip_tags($_POST['category']);
$service  = strip_tags($_POST['service']);

$headers = "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html; charset=UTF-8\r\n";

if ($service == '-') {
  $message = '<html><body>';
  $message .= "<h1>" . $name . "</h1>";
  $message .= "Номер телефона: <b>" . $phone . "</b><br>";
  $message .= "Категория: <b>" . $category . "</b><br>";
  $message .= '</body></html>';
} else {
  $message = '<html><body>';
  $message .= "<h1>" . $name . "</h1>";
  $message .= "Номер телефона: <b>" . $phone . "</b><br>";
  $message .= "Категория: <b>" . $category . "</b><br>";
  $message .= "Услуга: <b>" . $service . "</b></br>";
  $message .= '</body></html>';
}

mail('dlencode@gmail.com', 'Partner', $message, $headers);
mail('bizpartner26@gmail.com', 'Partner', $message, $headers);

?>
