<?php 
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

include 'DbConnect.php';
$objDb = new DbConnect;
$conn = $objDb->connect();

$method = $_SERVER['REQUEST_METHOD'];
if($method == "POST"){

$header = json_decode( file_get_contents("php://input") );
            
            

            if (count((array)$header) == 2){
                $sql = "REPLACE INTO header(id, site_title, tagline, updated_at) VALUES(1, :site_title, :tagline, :updated_at)";  
                $stmt = $conn->prepare($sql);
                $updated_at = date("Y-m-d");
                $stmt->bindParam(':site_title',  $header->site_title);
                $stmt->bindParam(':tagline', $header->tagline);
                $stmt->bindParam(':updated_at', $updated_at);
            } elseif(isset($header->site_title)){
                $sql = "UPDATE header SET site_title=:site_title, updated_at=:updated_at";  
                $stmt = $conn->prepare($sql);
                $updated_at = date("Y-m-d");
                $stmt->bindParam(':site_title', $header->site_title);
                //$stmt->bindParam(':tagline', $header->tagline);
                $stmt->bindParam(':updated_at', $updated_at);
            } elseif(isset($header->tagline)){
                $sql = "UPDATE header SET tagline=:tagline, updated_at=:updated_at";  
                $stmt = $conn->prepare($sql);
                $updated_at = date("Y-m-d");
                //$stmt->bindParam(':site_title', $header->site_title);
                $stmt->bindParam(':tagline', $header->tagline);
                $stmt->bindParam(':updated_at', $updated_at);
            }
            if($stmt->execute()) {
                $response = ['status' => 1, 'message' => 'Record created successfully.'];
            } else {
                $response = ['status' => 0, 'message' => 'Failed to create record.'];
            }
            echo json_encode($response);
            echo "header";
        }