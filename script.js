document.getElementById("repairForm").addEventListener("submit", function (event) {

    event.preventDefault();

    var name = document.getElementById("name").value;
    var phone = document.getElementById("phone").value;
    var device = document.getElementById("device").value;
    var service = document.getElementById("service").value;
    var location = document.getElementById("location").value;

    var message = "New Repair Request\n\n"
        + "Name: " + name + "\n"
        + "Phone: " + phone + "\n"
        + "Device: " + device + "\n"
        + "Service: " + service + "\n"
        + "Location: " + location;

    var encodedMessage = encodeURIComponent(message);

    var yourWhatsAppNumber = "9647838100473";

    var whatsappURL = "https://wa.me/" + yourWhatsAppNumber + "?text=" + encodedMessage;

    window.open(whatsappURL, "_blank");

});