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

    var whatsappURL = "https://wa.me/" + yourWhatsAppNumber + "?text=" + encodedMessage + "\nLocation:\n" + locationInput.value;

    window.open(whatsappURL, "_blank");

});

// Elements
const chatButton = document.getElementById("chatButton");
const chatBox = document.getElementById("chatBox");
const closeChat = document.getElementById("closeChat");
const sendBtn = document.getElementById("sendBtn");
const userInput = document.getElementById("userInput");
const chatMessages = document.getElementById("chatMessages");

// Open / Close
chatButton.onclick = () => {
    chatBox.style.display = "flex";
};

closeChat.onclick = () => {
    chatBox.style.display = "none";
};

// Add message bubble
function addMessage(text, sender) {
    const msg = document.createElement("div");
    msg.classList.add("message", sender);
    msg.innerText = text;
    chatMessages.appendChild(msg);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Send message
async function sendMessage() {

    const text = userInput.value.trim();
    if (text === "") return;

    addMessage(text, "user");
    userInput.value = "";

    const typingMsg = document.createElement("div");
    typingMsg.classList.add("message", "bot");
    typingMsg.innerText = "Typing...";
    chatMessages.appendChild(typingMsg);

    try {
        const response = await puter.ai.chat(text);

        typingMsg.remove();
        addMessage(response, "bot");

    } catch (error) {
        console.error(error);
        typingMsg.innerText = "Error.";
    }
}

// Button click
sendBtn.onclick = sendMessage;

// Enter key
userInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        sendMessage();
    }
});



//  phone number validation and formatting
const phoneInput = document.getElementById("phone");
const phoneError = document.getElementById("phoneError");

// Allow only numbers
phoneInput.addEventListener("input", function () {
    this.value = this.value.replace(/[^0-9]/g, '');

    if (this.value.length > 11) {
        this.value = this.value.slice(0, 11);
    }
});


function validatePhone() {
    const phone = phoneInput.value;
    const regex = /^07[0-9]{9}$/;

    if (!regex.test(phone)) {
        phoneError.innerText = "Phone must start with 07 and be 11 digits.";
        return false;
    }

    phoneError.innerText = "";
    return true;
}


// Get location
const locationBtn = document.getElementById("getLocationBtn");
const locationInput = document.getElementById("location");

locationBtn.onclick = function () {

    if (!navigator.geolocation) {
        alert("Geolocation not supported");
        return;
    }

    navigator.geolocation.getCurrentPosition(

        function (position) {

            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            const mapsLink = "https://maps.google.com/?q=" + lat + "," + lon;

            locationInput.value = mapsLink;
        },

        function (error) {
            alert("Location permission denied");
        }

    );
};

