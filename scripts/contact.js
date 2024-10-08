$(document).ready(function() {
    $("#contactForm").on("submit", function(e) {
        e.preventDefault(); // Prevent default form submission

        const formData = $(this).serialize(); // Serialize form data
        console.log("Form data:", formData); // Log form data

        $.ajax({
            type: "POST",
            url: "send_email.php", // URL to your send_email.php file
            data: formData,
            dataType: "json",
            success: function(response) {
                console.log("Response:", response); // Log the response
                if (response.status === 'success') {
                    $("#form-message-warning").hide();
                    $("#form-message-success").text(response.message).show();
                    $("#contactForm")[0].reset(); // Reset form fields
                } else {
                    $("#form-message-success").hide();
                    $("#form-message-warning").text(response.message).show();
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.error("Error:", textStatus, errorThrown); // Log any error
                $("#form-message-warning").text("An error occurred. Please try again.").show();
            }
        });
    });
});
