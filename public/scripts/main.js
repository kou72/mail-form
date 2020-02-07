// main.js
"use strict";

// Initializes MailForm.
function MailForm() {
  // Shortcuts to DOM Elements.
  this.messageForm = document.getElementById("message-form");
  this.messageInput = document.getElementById("message");
  this.submitButton = document.getElementById("submit");
  // this.snackbar = document.querySelector("#snackbar");
  this.snackbar = document.getElementById("snackbar");

  // Saves message on form submit.
  this.messageForm.addEventListener("submit", this.sendMessage.bind(this));
}

MailForm.prototype.sendMessage = async e => {
  e.preventDefault();
  // const sendResult = firebase.functions().httpsCallable("sendMail");
  // const result = await firebase.functions().httpsCallable("hello")();
  const result = await firebase.functions().httpsCallable("echo")({ text: "test" });
  this.snackbar.MaterialSnackbar.showSnackbar({ message: result.data, timeout: 3000 });
};

window.onload = function() {
  // Initializes MailForm.
  window.easyChat = new MailForm();
};
