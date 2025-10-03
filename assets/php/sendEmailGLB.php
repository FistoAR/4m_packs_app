<?php

require './vendor/autoload.php'; // Load PHPMailer

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Check if the GLB file is received
    if (isset($_FILES['glbFile']) && $_FILES['glbFile']['error'] == UPLOAD_ERR_OK) {
        // Get the temporary file path
        $tmpFilePath = $_FILES['glbFile']['tmp_name'];
        $fileName = basename($_FILES['glbFile']['name']);

        $name = isset($_POST['name']) ? $_POST['name'] : '';
        $mobile = isset($_POST['mobile']) ? $_POST['mobile'] : '';
        $email = isset($_POST['email']) ? $_POST['email'] : '';

        // Send email with the GLB file attachment
        sendEmailWithAttachment($tmpFilePath, $fileName, $name, $mobile, $email);
    } else {
        echo json_encode(['success' => false, 'message' => 'No file uploaded or there was an error uploading.']);
    }
}

function sendEmailWithAttachment($tmpFilePath, $fileName,  $name, $mobile, $email) {
    $mail = new PHPMailer(true);

    try {
        // SMTP settings
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';                               // Set the SMTP server to Gmail
        $mail->SMTPAuth = true;
        $mail->Username = 'popularwater@gmail.com'; // Your Gmail email address
        $mail->Password = 'vpdx rddx wcqk btez';  // Use app password if 2FA is enabled
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;           // Enable TLS encryption
        $mail->Port = 587;                                             // Port 587 for TLS

         // Recipients
         $mail->setFrom('popularwater@gmail.com', 'VTECH');
         $mail->addAddress('popularwater@gmail.com', 'VTECH');  // Add recipient
 
         // Attachments (use the temporary file directly)
         $mail->addAttachment($tmpFilePath, $fileName); // Attach the uploaded GLB file
 
         // Content
         $mail->isHTML(true);
         $mail->Subject = 'VTech Application: 3D Model';
         $mail->Body    = 'Please find the attached GLB file of the 3D model.<br><br>'
                            . 'Customer Name: ' . $name . '<br>'
                            . 'Mobile: ' . $mobile . '<br>'
                            . 'Email: ' . $email;;
         $mail->AltBody = 'Please find the attached GLB file of the 3D model.\n\n'
                            . 'Customer Name: ' . $name . '\n'
                            . 'Mobile: ' . $mobile . '\n'
                            . 'Email: ' . $email;
 
         // Send the email
         if ($mail->send()) {
             echo json_encode(['success' => true, 'message' => 'Email sent successfully.']);
         } else {
             echo json_encode(['success' => false, 'message' => 'Email could not be sent.']);
         }
     } catch (Exception $e) {
         echo json_encode(['success' => false, 'message' => 'Mailer Error: ' . $mail->ErrorInfo]);
     }
 }
 ?>