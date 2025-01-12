<?php

// sending data into the database

$username = $_POST['username'];
$email = $_POST['email'];
$cell = $_POST['cell'];
$address = $_POST['address'];
$city = $_POST['city'];
$state = $_POST['state'];
$zip = $_POST['zip'];
$country = $_POST['country'];
$password = $_POST['password'];
$confirmpassword = $_POST['confirmpassword'];

//database connection

$connection = new mysqli('localhost', 'root', '', 'formdatabase');
if($connection->connect_error){
    die('Connection Failed : '.$connection->connect_error);
}

else{
    $stat = $connection->prepare("insert into registrationform(username, email	, cell, address, city, state, zip, country, passowrd, confirmpassword) values(?,?,?,?,?,?,?,?,?,?)");

    $stat->bind_param("ssisssisss", $username, $email, $cell, $address, $city, $state, $zip, $country, $password, $confirmpassword);
    $stat->execute();
    echo "Registration Successful";
    $stat->close();
}

?>