<?php 
    error_reporting(E_ALL);
    ini_set('display_errors', 'On'); // or set 1
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");
    
    include 'DbConnect.php';
    $objDb = new DbConnect;
    $conn = $objDb->connect();
    
    $method = $_SERVER['REQUEST_METHOD'];
    switch($method) {
        case "GET": 
            $sql = "SELECT * FROM header";
            $stmt = $conn->prepare($sql);
            $stmt->execute();
            $header = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($header);
            break;

        case "POST": 
            
            if (isset($_POST) && !empty($_POST)) {
                $header = array();
                $destination;

                if(isset($_POST["site_title"]) && !empty($_POST["site_title"])){
                    $header += ["site_title" => $_POST["site_title"]];
                }

                if(isset($_POST["tagline"]) && !empty($_POST["tagline"])){
                    $header += ["tagline" => $_POST["tagline"]];
                }
                
                $sql = "UPDATE header SET ";
                foreach ($header as $x => $y){
                    if($y){
                        $placeHoder = ":" . $x;
                        $sql .= $x . "=" .$placeHoder . ",";
                    }
                }

                $sql .= " updated_at=:updated_at";
                $stmt = $conn->prepare($sql);
                $updated_at = date("Y-m-d");

                foreach ($header as $x => $y){
                    if($y){
                        $placeHoder = ":" . $x;
                        $stmt->bindParam($placeHoder, $header[$x]);
                    }
                }
            
                $stmt->bindParam(':updated_at', $updated_at);



                if($stmt->execute()) {
                    $response = ['status' => 1, 'message' => 'Record created successfully.'];
                } else {
                    $response = ['status' => 0, 'message' => 'Failed to create record.'];
                }
                echo json_encode($response);
                
            } //if POST

        break; 

    } //method switch