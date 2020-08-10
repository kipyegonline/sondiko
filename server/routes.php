<?php
require("./sondiko.class.php");
$sondiko=new Sondiko("DB");


if(isset($_GET["addloans"]) && $_GET["addloans"]=="true"){
    $data=json_decode(file_get_contents("php://input"));
  
   $clientName=$data->clientName;
        $clientId=$data->clientId;
        $clientPhone=$data->clientPhone;
        $date=$data->date;
        $amount=$data->amount;
        $returnDate=$data->returnDate;
        $subCounty=$data->subCounty;
        $location=$data->location;
        $subLocation=$data->subLocation;
        $village=$data->village;
        $addedBy=$data->addedBy;
        $asset=$data->asset;
        $model=$data->model;
        $value=$data->value;
       $id= $sondiko->InsertClients($clientName,$clientId,$clientPhone,$date,$amount,$returnDate,$subCounty,$location,$subLocation,$village,$addedBy);
       
       if($id>0){
           //unpack the assets
           if(strlen($asset)>0){
               $assets=explode("*",$asset);
               $models=explode("*",$model);
               $val=explode("*",$value);
               
               //send to assets table
           }else{
               echo json_encode(["status"=>200,"statusText"=>"Details added successfully"]);
           }
           
       }else{
          echo json_encode(["status"=>201,"statusText"=>"Encountered an error adding information. Try again"]);
       }
   
}

if(isset($_GET["login"]) && $_GET["login"]=="true"){
 $data=json_decode(file_get_contents("php://input"));
   $useremail=$data->email;
   $userpassword=$data->password;
   if(empty($useremail) && empty($userpassword)){
json_encode(["status"=>201,"statusText"=>"PLease enter email/password to log in"]);
   }else{
 $sondiko->logIn($useremail,$userpassword);
   }
}
if(isset($_GET["signup"]) && $_GET["signup"]=="true"){
     $data=json_decode(file_get_contents("php://input"));
          $username=$data->username;
          $useremail=$data->useremail;
          $password=$data->password;
        
    if(!empty($username) && strlen($password)>5 && strlen($useremail)>6){
    $sondiko->addUsers($username, $useremail, $password);
          }else{
             echo  json_encode(["status"=>201,"statusText"=>"Some details are missing. Check and try again."]);
          }
           
}
