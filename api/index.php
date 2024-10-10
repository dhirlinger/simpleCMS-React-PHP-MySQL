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

                // Handle image upload
                if (empty($_FILES)){
                    exit("\r\n $_FILES is empty - is file_uploads enabled in php.ini?");
                } 

                // handle errors
                if ($_FILES["image"]["error"] !== UPLOAD_ERR_OK) {

                    switch ($_FILES["image"]["error"]) {
                        case UPLOAD_ERR_PARTIAL:
                            exit('File only partially uploaded');
                            break;
                        case UPLOAD_ERR_NO_FILE:
                            exit('No file was uploaded');
                            break;
                        case UPLOAD_ERR_EXTENSION:
                            exit('File upload stopped by a PHP extension');
                            break;
                        case UPLOAD_ERR_FORM_SIZE:
                            exit('File exceeds MAX_FILE_SIZE in the HTML form');
                            break;
                        case UPLOAD_ERR_INI_SIZE:
                            exit('File exceeds upload_max_filesize in php.ini');
                        break;
                        case UPLOAD_ERR_NO_TMP_DIR:
                            exit('Temporary folder not found');
                            break;
                        case UPLOAD_ERR_CANT_WRITE:
                            exit('Failed to write file');
                            break;
                        default:
                            exit('Unknown upload error');
                            break;
                    } //error switch 
                }// if !UPLOAD_ERR_OK

                // Reject uploaded file larger than 1MB
                if ($_FILES["image"]["size"] > 1048576) {
                    exit('File too large (max 1MB)');
                }

                // Use fileinfo to get the mime type
                $finfo = new finfo(FILEINFO_MIME_TYPE);
                $mime_type = $finfo->file($_FILES["image"]["tmp_name"]);

                $mime_types = ["image/gif", "image/png", "image/jpeg"];
                
                if ( ! in_array($mime_type, $mime_types)) {
                    exit("Invalid file type");
                }    

                // Replace any characters not \w- in the original filename
                $pathinfo = pathinfo($_FILES["image"]["name"]);

                $base = $pathinfo["filename"];

                $base = preg_replace("/[^\w-]/", "_", $base);

                $filename = $base . "." . $pathinfo["extension"];

                $destination = __DIR__ . "/uploads/" . $filename;


                if (! move_uploaded_file($_FILES["image"]["tmp_name"], $destination)) {
                    exit("Can't move uploaded file");
                } else {
                    $header += ["image" => $destination];
                }
                echo $header["image"];
                echo "shit";
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