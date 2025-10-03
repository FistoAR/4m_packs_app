    <?php

    require './vendor/autoload.php'; // Load PHPMailer

    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;

    if ($_SERVER['REQUEST_METHOD'] == 'POST') {
        // Check if the PDF file is received
        if (isset($_FILES['pdfFile']) && $_FILES['pdfFile']['error'] == UPLOAD_ERR_OK) {
            // Get the temporary file path
            $tmpFilePath = $_FILES['pdfFile']['tmp_name'];
            $fileName = basename($_FILES['pdfFile']['name']);

       

            // Send email with the PDF attachment directly from the temporary file
            $name = isset($_POST['name']) ? $_POST['name'] : '';
            $mobile = isset($_POST['mobile']) ? $_POST['mobile'] : '';
            $email = isset($_POST['email']) ? $_POST['email'] : '';

            // Send email with the PDF, image, and user details
            sendEmailWithAttachments($tmpFilePath, $fileName, $name, $mobile, $email);
        } else {
            echo json_encode(['success' => false, 'message' => 'No file uploaded or there was an error uploading.']);
        }
    }

    function sendEmailWithAttachments($pdfTmpFilePath, $pdfFileName, $name, $mobile, $email) {
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
            $mail->addAttachment($pdfTmpFilePath, $pdfFileName);

       

            // Content
            $mail->isHTML(true);
            $mail->Subject = 'VTech Application: PDF Output ';
            $mail->Body    = 'Please find the attached PDF document and label image.<br><br>'
                            . 'Customer Name: ' . $name . '<br>'
                            . 'Mobile: ' . $mobile . '<br>'
                            . 'Email: ' . $email;
            $mail->AltBody = 'Please find the attached PDF document and label image.\n\n'
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
