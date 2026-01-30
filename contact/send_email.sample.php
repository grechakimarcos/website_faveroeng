<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// NOTE: You must download PHPMailer and place the 'src' folder in a 'PHPMailer' directory next to this script.
// Download from: https://github.com/PHPMailer/PHPMailer
require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = strip_tags(trim($_POST["name"]));
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $phone = strip_tags(trim($_POST["phone"]));
    $subject = strip_tags(trim($_POST["subject"]));
    $message = trim($_POST["message"]);

    if ( empty($name) || empty($message) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        // Handle error
        header("Location: index.html?status=error&msg=invalid_input");
        exit;
    }

    $mail = new PHPMailer(true);

    try {
        //Server settings
        $mail->isSMTP();                                            
        $mail->Host       = 'smtp.example.com';                     
        $mail->SMTPAuth   = true;                                   
        $mail->Username   = 'your_email@example.com';             
        $mail->Password   = 'your_password';                          
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;            
        $mail->Port       = 465;                                    

        //Recipients
        $mail->setFrom('your_email@example.com', 'Favero Engenharia Site');
        $mail->addAddress('your_email@example.com');     // Add your receiving address
        $mail->addReplyTo($email, $name);

        //Content
        $mail->isHTML(true);                                  
        $mail->Subject = "Novo contato do site: $subject";
        $mail->Body    = "
            <h2>Nova Mensagem do Site</h2>
            <p><strong>Nome:</strong> $name</p>
            <p><strong>E-mail:</strong> $email</p>
            <p><strong>Telefone:</strong> $phone</p>
            <p><strong>Assunto:</strong> $subject</p>
            <p><strong>Mensagem:</strong><br>$message</p>
        ";
        $mail->AltBody = "Nome: $name\nE-mail: $email\nTelefone: $phone\nAssunto: $subject\nMensagem:\n$message";

        $mail->send();
        header("Location: index.html?success=true");
    } catch (Exception $e) {
        // Log error if needed: echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
        header("Location: index.html?status=error");
    }
} else {
    // Not a POST request
    header("Location: index.html");
}
?>
