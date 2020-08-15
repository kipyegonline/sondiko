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
       
       $id= $sondiko->InsertClients($clientName,$clientId,$clientPhone,$date,$amount,$returnDate,$subCounty,$location,$subLocation,$village,$addedBy);
       
       if($id>0){
           
               echo json_encode(["status"=>200,
               "statusText"=>"Details added successfully",
                 "id"=>$id]);
           
           
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

if(isset($_GET["addassets"]) && $_GET["addassets"]="true"){
    $data=json_decode(file_get_contents("php://input"));
    $customerId=$data->clientServer;
    $assetModel=$data->model;
    $assetName=$data->asset;
    $assetValue=$data->value;

     if(isset($assetName) && $customerId > 1){
 $sondiko->addAssets($customerId,$assetModel,$assetName, $assetValue);
     }else{
         echo  json_encode(["status"=>201,
         "statusText"=>"Some details are missing. Check and try again."]);
          }
     }

   
if(isset($_GET["getLoanees"]) && $_GET["getLoanees"]=="true"){
 
   $sondiko->getLoanees();
}
if(isset($_GET["getusers"]) && $_GET["getusers"]=="true"){
    
   $sondiko->getUsers();
}


if(isset($_GET["datesearch"]) && $_GET["datesearch"] =="true"){
   $date=$_GET["date"];
   if(isset($date)){
     $sql="SELECT * FROM sondiko_clients WHERE return_date='$date'ORDER BY addedon, clientName";
      $sondiko->getPayload($sql);
   }
}

if(isset($_GET["handleselect"]) && $_GET["handleselect"] =="true"){
   $selected=$_GET["selected"];
   if(isset($selected)){
     $sql="SELECT * FROM sondiko_clients WHERE addedBy='$selected' ORDER BY addedon, clientName";
      $sondiko->getPayload($sql);
   }
}

if(isset($_GET["selectedsearch"]) && $_GET["selectedsearch"]=="true"){
   $selected=trim($_GET["selected"]);
  
   if(isset($selected)){
     $sql="SELECT * 
     FROM sondiko_clients 
     WHERE 
     clientName LIKE '%$selected%' OR
     clientPhone LIKE '%$selected%' OR
     clientId LIKE '%$selected%'  OR
     addedBy LIKE '%$selected%' OR
      subcounty LIKE '%$selected%' OR
      location LIKE '%$selected%'  OR
       village LIKE '%$selected%' 
      ORDER BY addedon, clientName";
      $sondiko->getPayload($sql);
   }
}

if(isset($_GET["fetchtoday"]) && $_GET["fetchtoday"] =="true"){

  $sql="SELECT * FROM sondiko_clients WHERE  return_date=curdate()";
      $sondiko->getPayload($sql);
   
}
if(isset($_GET["fetchthisweek"]) && $_GET["fetchthisweek"] =="true"){

  $sql=" SELECT * FROM sondiko_clients WHERE  extract(week from return_date)=extract(week from curdate()) order by return_date desc";
      $sondiko->getPayload($sql);
   
}