<?php

require './vendor/autoload.php'; // Load PHPMailer

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Check if the image file is received
    if (isset($_POST['labelImage'])) {
        // Decode the base64 image data
        $labelImageData = $_POST['labelImage'];
        $labelImageData = str_replace('data:image/png;base64,', '', $labelImageData);  // Clean up the base64 string
        $labelImageData = base64_decode($labelImageData);  // Decode base64 data

        // Save the image to a temporary file
        $labelImagePath = 'temp_label_image.png';
        file_put_contents($labelImagePath, $labelImageData);

        // Get user details from POST (optional)
        $name = isset($_POST['name']) ? $_POST['name'] : '';
        $mobile = isset($_POST['mobile']) ? $_POST['mobile'] : '';
        $email = isset($_POST['email']) ? $_POST['email'] : '';

        // Send email with the image and user details
        sendEmailWithImage($labelImagePath, $name, $mobile, $email);
    } else {
        echo json_encode(['success' => false, 'message' => 'No image data received or there was an error uploading.']);
    }
}

function sendEmailWithImage($labelImagePath, $name, $mobile, $email) {
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
 

        // Attach the image if available
        if ($labelImagePath) {
            $mail->addAttachment($labelImagePath, 'label_image.png');  // Attach the label image
        }

        // Content
        $mail->isHTML(true);
        $mail->Subject = 'VTech Application: Label Image';
        $mail->Body    = 'Please find the attached label image.<br><br>'
                        . 'Customer Name: ' . $name . '<br>'
                        . 'Mobile: ' . $mobile . '<br>'
                        . 'Email: ' . $email;
        $mail->AltBody = 'Please find the attached label image.\n\n'
                         . 'Customer Name: ' . $name . '\n'
                         . 'Mobile: ' . $mobile . '\n'
                         . 'Email: ' . $email;

        // Send the email
        if ($mail->send()) {
            echo json_encode(['success' => true, 'message' => 'Image sent successfully.']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Email could not be sent.']);
        }
    } catch (Exception $e) {
        echo json_encode(['success' => false, 'message' => 'Mailer Error: ' . $mail->ErrorInfo]);
    }
}

?>
