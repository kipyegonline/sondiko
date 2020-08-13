<?php

class Sondiko{

   public static  $connection;
   
    public function __construct($name){
      $this->name=$name;
       try{
  self::$connection=new PDO("mysql:host=localhost;dbname=sondiko","vince","//matata11");
  
    }
    catch(PDOException $e){
        echo $e->getMessage();
        die("Server unavaialble");
    }
    
    }

public function InsertClients($clientName,$clientId,$clientPhone,$date,$amount,$returnDate,$subCounty,$location,$subLocation,$village,$addedBy){
$query="SELECT COUNT(*) from sondiko_clients where clientId=$clientId";
    $exists=$this->itemExists($query);    
$sql="INSERT INTO sondiko_clients (
clientName,clientId,clientPhone,date_borrowed,amount_borrowed,return_date,subcounty,location,sublocation,village,addedon,addedBy)
VALUES(
    :clientname,
    :id,
    :phone, 
    str_to_date(:bdate,'%Y-%m-%d'),
    :amount,
    str_to_date(:rdate,'%Y-%m-%d'),
    :subcounty,
    :location,
    :sublocation,
    :village,
    NOW(),
    :addedBy)";

    try{
    $stmt=self::$connection->prepare($sql);
    if($stmt){
    $stmt->execute([
    ":clientname"=>$clientName,
    ":id"=>$clientId,
    ":phone"=>$clientPhone, 
    ":bdate"=>$date,
    ":amount"=>$amount,
    ":rdate"=>$returnDate,
    ":subcounty"=>$subCounty,
    ":location"=>$location,
    ":sublocation"=>$subLocation,
    ":village"=>$village,
    ":addedBy" =>$addedBy
    ]);
   
    $id=self::$connection->lastInsertId();
  
    return $id;

    }
    }
    catch(PDOException $e){
        echo $e->getMessage();
    }
}
public function getLoanees(){
    $query="SELECT * FROM sondiko_clients ORDER BY addedon desc, clientName asc";

    try{
        $stmt=self::$connection->query($query);
        if($stmt){
            $data=$stmt->fetchAll(PDO::FETCH_ASSOC);
            header("statusText: Great");
            echo json_encode($data);
        }
    }
    catch(PDOException $e){
        echo $e->getMessage();
    }
}
public function getUsers(){
    $sql="SELECT id, username as user from sondiko_users ORDER BY user";
     try{
        $stmt=self::$connection->query($sql);
        if($stmt){
            $data=$stmt->fetchAll(PDO::FETCH_ASSOC);
            if(sizeof($data)>0) {
                echo json_encode($data);
            }
        }
    }
    catch(PDOException $e){
        echo $e->getMessage();
    }
}

public function getPayload($sql){
    
     try{
        $stmt=self::$connection->query($sql);
        if($stmt){
            $data=$stmt->fetchAll(PDO::FETCH_ASSOC);
            if(sizeof($data)>0) {
                echo json_encode($data);
            }else{
                echo json_encode([]);
            }
        }
    }
    catch(PDOException $e){
        echo $e->getMessage();
    }

}
public function addUsers($username, $useremail, $userpassword){
 $query="SELECT COUNT(*) from sondiko_users where useremail='$useremail'";
    $exists=$this->itemExists($query);

    if($exists){
        echo json_encode(["status"=>201,"statusText"=>"This email/phone is already registered on this system. Please login"]);
        return false;
    }else{
       $hashpass=$this->hashPassword($userpassword);
    try{

    $query="INSERT INTO sondiko_users (username,userpassword,useremail,activated) VALUES(:username,:userpassword, :useremail,false)";
    $stmt=self::$connection->prepare($query);
    $stmt->execute([
        ":username"=>$username,
        ":userpassword"=>$hashpass,
        ":useremail"=>$useremail
        ]);
$id=self::$connection->lastInsertId();
if($id>0){
     echo json_encode([
         "status"=>200,
     "statusText"=>"Account created successfully. It will be activated in 3 hours" 
   ]);
}else{
     echo json_encode(["status"=>201,"statusText"=>"Encountered a problem signing up. Try again later"]);
}
 }
  catch(PDOException $e){
        echo $e->getMessage();
    }
    }

}
public function logIn($useremail,$password){
  
     $query="SELECT COUNT(*) from sondiko_users where useremail='$useremail'";
    $exists=$this->itemExists($query);
    if(!$exists){
       
        echo json_encode(["status"=>201,"statusText"=>"Email address or phone doesn't exist on our system .Please check details and try again.."]);
        return false;

    }else{
        //confirm password
        $pexists= $this->verifyPassword($password,$useremail);
        if($pexists){
           $query="SELECT id,username from sondiko_users where useremail='$useremail' LIMIT 1";
           $stmt=self::$connection->query($query);
           $data=$stmt->fetch(PDO::FETCH_ASSOC);
           $data["status"]=200;
            
             header("Content-type:application/json");
           echo json_encode($data);
         

        }else{
            echo json_encode(["status"=>201,"statusText"=>"Invalid  email/passsword combination."]);
        return false;
        }
        
    }

}

public function addAssets($customerId,$assetModel,$assetName, $assetValue){
    $query= "INSERT INTO sondiko_assets (customer_id,assetModel,assetName,assetValue,createdon) 
VALUES(:id,:model, :assetName, :assetValue, NOW())";
try{
    $stmt=self::$connection->prepare($query);
    $stmt->execute([
        ":id"=>$customerId,
        ":model"=>$assetModel,
         ":assetName"=>$assetName,
         ":assetValue"=>$assetValue
    ]);
$id=self::$connection->lastInsertId();
if($id>0){
    echo  json_encode(["status"=>200,
    "statusText"=>"Assets $customerId recorded successfully."]);
          }else{
              echo  json_encode(["status"=>201,
              "statusText"=>"error adding details. Check and try again."]);
          }
          } 
  catch(PDOException $e){
        echo $e->getMessage();
    }

}
private function hashPassword($password){
    return password_hash($password,PASSWORD_DEFAULT, ["cost"=>15]);
}
private function itemExists($query){
  
    
      $stmt=self::$connection->query($query);
      
      if($stmt){
        
        $row=$stmt->fetchColumn();
        if($row>0){
           
           return true;
        }else{
           
            return false;
        }
        
    }

}
private function verifyPassword($password,$email){
    $query="SELECT userpassword from sondiko_users where useremail='$email' LIMIT 1";

    $stmt=self::$connection->query($query);

    if($stmt){        
    $data=$stmt->fetch(PDO::FETCH_ASSOC);
           
             $hashedPassword=$data["userpassword"];
            if(password_verify($password,$hashedPassword)){
                return true;
            }
                    
            return false;
        }
        
    }



}

?>