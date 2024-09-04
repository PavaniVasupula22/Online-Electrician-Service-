document.getElementById("paymentForm").addEventListener("submit", function(event) {
    event.preventDefault();

    // Normally, here you would send the payment data to the server for processing

    alert("Payment Successful! Thank you for your payment.");

    // Redirect to a confirmation page or back to the homepage
    window.location.href = "index.html";
});
