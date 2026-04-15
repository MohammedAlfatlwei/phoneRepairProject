// ================= FORM SUBMIT =================
document.getElementById("repairForm").addEventListener("submit", function (event) {

    event.preventDefault();

    const form = this;

    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;
    const device = document.getElementById("device").value;
    const service = document.getElementById("service").value;
    const location = document.getElementById("location").value;

    // 🔴 VALIDATION
    if (!validatePhone()) return;

    if (location === "") {
        alert("Please click 'Get My Location' first");
        return;
    }

    // ✅ WhatsApp message
    const message =
        "New Repair Request\n\n" +
        "Name: " + name + "\n" +
        "Phone: " + phone + "\n" +
        "Device: " + device + "\n" +
        "Service: " + service + "\n\n" +
        "Location:\n" + location;

    const encodedMessage = encodeURIComponent(message);

    const whatsappURL = "https://wa.me/9647838100473?text=" + encodedMessage;

    // ✅ Open WhatsApp
    window.open(whatsappURL, "_blank");

    // ✅ Submit to database AFTER WhatsApp (safe way)
    setTimeout(() => {
        form.submit();   // 🔥 fixed (no event.target confusion)
    }, 300);
});


// ================= CHATBOT =================
const chatButton = document.getElementById("chatButton");
const chatBox = document.getElementById("chatBox");
const closeChat = document.getElementById("closeChat");
const sendBtn = document.getElementById("sendBtn");
const userInput = document.getElementById("userInput");
const chatMessages = document.getElementById("chatMessages");

chatButton.onclick = () => {
    chatBox.style.display = "flex";
};

closeChat.onclick = () => {
    chatBox.style.display = "none";
};

function addMessage(text, sender) {
    const msg = document.createElement("div");
    msg.classList.add("message", sender);
    msg.innerText = text;
    chatMessages.appendChild(msg);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

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
        const response = await puter.ai.chat(
            "You are a mobile repair assistant. Help users choose repair types.\nUser: " + text
        );

        typingMsg.remove();
        addMessage(response, "bot");

    } catch (error) {
        console.error(error);
        typingMsg.innerText = "Error.";
    }
}

sendBtn.onclick = sendMessage;

userInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        sendMessage();
    }
});


// ================= PHONE VALIDATION =================
const phoneInput = document.getElementById("phone");
const phoneError = document.getElementById("phoneError");

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


// ================= GPS LOCATION =================
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

            locationBtn.innerText = "تم ارسال الموقع";

        },

        function () {
            alert("Location permission denied");
        }
    );
};