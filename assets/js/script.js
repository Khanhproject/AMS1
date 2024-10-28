$(document).ready(function () {
  $("#contactForm").validate({
    rules: {
      name: {
        required: true,
        minlength: 2,
      },
      email: {
        required: true,
        email: true,
      },
      phone: {
        required: true,
        digits: true,
        minlength: 10,
        maxlength: 10,
      },
      //   content: {
      //     required: true,
      //     minlength: 10,
      //   },
    },
    messages: {
      name: {
        required: "Please enter your name",
        minlength: "Name must be at least 2 characters long",
      },
      email: {
        required: "Please enter your email address",
        email: "Please enter a valid email address",
      },
      phone: {
        required: "Please enter your phone number",
        digits: "Phone number must contain only digits",
        minlength: "Phone number must be at least 10 digits",
        maxlength: "Phone number must not exceed 10 digits",
      },
      //   content: {
      //     required: "Please enter your message",
      //     minlength: "Message must be at least 10 characters long",
      //   },
    },
    submitHandler: function (form) {
      sendEmail(formData);
    },
  });
});

const formData = {
  name: "",
  email: "",
  content: "",
  phone: "",
};

function handleChange(event) {
  formData[event.target.name] = event.target.value;
}

document.addEventListener("DOMContentLoaded", function () {
  document
    .querySelectorAll("#contactForm input, #contactForm textarea")
    .forEach((input) => {
      input.addEventListener("input", handleChange);
    });
});

function sendEmail(data) {
  const serviceID = "service_olr51ps";
  const templateID = "template_pcr5tte";
  const userID = "MoxnxlO8P5EPF0Wdw";

  const url = `https://api.emailjs.com/api/v1.0/email/send`;

  const emailData = {
    service_id: serviceID,
    template_id: templateID,
    user_id: userID,
    template_params: {
      to_name: data.name,
      from_email: data.email,
      phone_number: data.phone,
      content: data.content,
    },
  };

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(emailData),
  })
    .then((response) => {
      if (response.ok) {
        toastr.success(
          "Thank you for submitting your contact.",
          "Send contact success!"
        );
        console.log("SUCCESS!");
        document.getElementById("contactForm").reset();
      } else {
        toastr.error("Failed to send contact, please try again.", "Error");
        console.log("FAILED...", response.statusText);
      }
    })
    .catch((error) => {
      toastr.error("Failed to send contact, please try again.", "Error");
      console.log("FAILED...", error);
    });
}
toastr.options = {
  closeButton: true,
  debug: false,
  newestOnTop: true,
  progressBar: true,
  positionClass: "toast-top-right",
  preventDuplicates: true,
  showDuration: "300",
  hideDuration: "1000",
  timeOut: "5000",
  extendedTimeOut: "1000",
  showEasing: "swing",
  hideEasing: "linear",
  showMethod: "fadeIn",
  hideMethod: "fadeOut",
};
