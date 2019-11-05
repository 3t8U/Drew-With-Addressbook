// Business Logic for AddressBook


// WHere is this called to?  WHat does it do?  Seems to define variable as zero?
function AddressBook() {
  this.contacts = [],
  this.currentID = 0
}

//Prototype to Add A New Contact ID
AddressBook.prototype.addContact = function(contact) {
  contact.id = this.assignId();
  this.contacts.push(contact);
}

//iterates the counter for a new unique ID
AddressBook.prototype.assignId = function() {
  this.currentID += 1;
  return this.currentID;
}

//Finder prototype
AddressBook.prototype.findContact = function(id) {
  for (var i=0; i< this.contacts.length; i++) {
    if (this.contacts[i]) {
      if (this.contacts[i].id == id) {
        return this.contacts[i];
      }
    }
  };
  return false;
}

// delete's contact @ index
AddressBook.prototype.deleteContact = function(id) {
  for (var i=0; i< this.contacts.length; i++) {
    if (this.contacts[i]) {
      if (this.contacts[i].id == id){
        delete this.contacts[i];
        return true;
      }
    }
  };
  return false;
}

//business logic for contacts
function Contact(firstName, lastName, phoneNumber) {
  this.firstName = firstName,
  this.lastName = lastName,
  this.phoneNumber = phoneNumber
}

Contact.prototype.fullName = function() {
  return this.firstName + " " + this.lastName;
}

// User Interface Logic --------
var addressBook = new AddressBook();

function displayContactDetails(addressBookToDisplay) {
    var contactsList = $("ul#contacts");
    var htmlForContactInfo = "";
    addressBookToDisplay.contacts.forEach(function(contact) {
      htmlForContactInfo += "<li id=" + contact.id + ">" + contact.firstName + " " + contact.lastName + "</li>";
    });
    contactsList.html(htmlForContactInfo);
}

function showContact(contactId){
var contact = addressBook.findContact(contactId);
$("#show-contact").show();
$(".first-name").html(contact.firstName);
$(".last-name").html(contact.lastName);
$(".phone-number").html(contact.phoneNumber);
var buttons = $("#buttons");
buttons.empty();
buttons.append("<button class='deleteButton' id =" + contact.id + ">Delete</button>");
}

function attachContactListeners() {
  $("ul#contacts").on("click", "li", function() {
    showContact(this.id);
  });
$("#buttons").on("click", ".deleteButton", function() {
  addressBook.deleteContact(this.id);
  $("#show-contact").hide();
  displayContactDetails(addressBook);
});

};


$(document).ready(function() {
  attachContactListeners();
  $("form#new-contact").submit(function(event) {
    event.preventDefault();
    var inputtedFirstName = $("input#new-first-name").val();
    var inputtedLastName = $("input#new-last-name").val();
    var inputtedPhoneNumber = $("input#new-phone-number").val();
    var newContact = new Contact(inputtedFirstName, inputtedLastName, inputtedPhoneNumber);
    addressBook.addContact(newContact);
    displayContactDetails(addressBook);
  });
});
