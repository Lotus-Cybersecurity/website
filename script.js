// Lotus Cybersecurity Website Script

// ===== Smooth Scroll Navigation =====

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
anchor.addEventListener("click", function (e) {

e.preventDefault();

document.querySelector(this.getAttribute("href")).scrollIntoView({
behavior: "smooth"
});

});
});



// ===== Contact Form (placeholder behavior) =====

const form = document.querySelector("form");

if(form){

form.addEventListener("submit", function(e){

e.preventDefault();

alert("Thank you. Lotus Cybersecurity will contact you soon.");

form.reset();

});

}



// ===== Future Blossom AI Hook =====
// This is where Blossom chat functionality can later be connected.

function blossomMessage(message){

console.log("Blossom AI:", message);

}



// ===== Console Signature =====

console.log("Lotus Cybersecurity 🌸");
console.log("Assess • Fortify • Monitor");
