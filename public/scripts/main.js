// main.js
"use strict";

// Initializes MailForm.
function MailForm() {
  // Shortcuts to DOM Elements.
  this.nameInput = document.getElementById("name");
  this.emailInput = document.getElementById("email");
  this.messageInput = document.getElementById("message");
  this.snackbar = document.getElementById("snackbar");

  // メール送信ボタン
  this.sendButton = document.getElementById("send");
  this.sendButton.addEventListener("click", this.sendMessage.bind(this));

  // TODO.17-3
  // メール保存&送信ボタン
  // this.saveButton = document.getElementById("save");
  // this.saveButton.addEventListener("click", this.saveMessage.bind(this));

  // ボタン表示・非表示
  const buttonTogglingHandler = this.toggleButton.bind(this);
  this.nameInput.addEventListener("change", buttonTogglingHandler);
  this.nameInput.addEventListener("keyup", buttonTogglingHandler);
  this.emailInput.addEventListener("change", buttonTogglingHandler);
  this.emailInput.addEventListener("keyup", buttonTogglingHandler);
  this.messageInput.addEventListener("change", buttonTogglingHandler);
  this.messageInput.addEventListener("keyup", buttonTogglingHandler);
}

// メール送付
MailForm.prototype.sendMessage = async function (e) {
  //TODO.15-2
  // e.preventDefault();
  // const data = {
  //   name: this.nameInput.value,
  //   email: this.emailInput.value,
  //   message: this.messageInput.value,
  // };
  // try {
  //   await firebase.functions().httpsCallable("sendMail")(data);
  //   this.successSnackbar();
  //   this.resetForm();
  // } catch {
  //   this.errorSnackbar();
  // }
};

// メール保存&送付
MailForm.prototype.saveMessage = async function (e) {
  //TODO.17-4
  //   e.preventDefault();
  //   const ref = firebase.firestore().collection("mailForm");
  //   try {
  //     await ref.add({
  //       name: this.nameInput.value,
  //       email: this.emailInput.value,
  //       message: this.messageInput.value,
  //       timestamp: new Date()
  //     });
  //     this.successSnackbar();
  //     this.resetForm();
  //   } catch {
  //     this.errorSnackbar();
  //   }
};

MailForm.prototype.toggleButton = function () {
  if (this.nameInput.value && this.emailInput.value && this.messageInput.value) {
    this.sendButton.removeAttribute("disabled");
    // TODO.17-5
    // this.saveButton.removeAttribute("disabled");
  } else {
    this.sendButton.setAttribute("disabled", "true");
    // TODO.17-6
    // this.saveButton.setAttribute("disabled", "true");
  }
};

MailForm.prototype.resetForm = function () {
  this.nameInput.value = "";
  this.emailInput.value = "";
  this.messageInput.value = "";
  this.toggleButton();
};

MailForm.prototype.successSnackbar = function () {
  this.snackbar.style.backgroundColor = "#2196f3";
  this.snackbar.MaterialSnackbar.showSnackbar({ message: "送信に成功しました" });
};

MailForm.prototype.errorSnackbar = function () {
  this.snackbar.style.backgroundColor = "#f44336";
  this.snackbar.MaterialSnackbar.showSnackbar({ message: "送信に失敗しました" });
};

window.onload = function () {
  // Initializes MailForm.
  window.mailForm = new MailForm();
};
