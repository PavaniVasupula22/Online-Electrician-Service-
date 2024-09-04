document.getElementById("bookingForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const date = document.getElementById("date").value;
    const time = document.getElementById("time").value;
    const message = document.getElementById("message").value;

    // You can add code here to send the form data to your backend
    alert(`Booking Confirmed!\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nDate: ${date}\nTime Slot: ${time}\nProblem Description: ${message}`);
    
    // Reset the form
    document.getElementById("bookingForm").reset();
});
