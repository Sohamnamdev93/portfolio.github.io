{/* <script src="https://smtpjs.com/v3/smtp.js"></script> */}
<script>
    function sendEmail(){
        Email.send({
            Host : "smtp.gmail.com",
            Username : "sohamnamdev93@gmail.com",
            Password : "Topper@93",
            To : 'sp562077@gmail.com',
            From : document.getElementById("email").value,
            Subject : "New contact form",
            Body : "And this is the body"
        }).then(
          message => alert("You have succesfully submited the form")
        );
    }
</script>