import React from "react";
import Heading from "../components/Heading.jsx";
import ContactForm from "../components/ContactForm.jsx";

function Contact() {
  return (
    <div>
      <div>
        <Heading
          title={"Contact"}
          subtitle={"Have something to share? Drop us a line."}
        />
      </div>
      <div>
        <ContactForm />
      </div>
    </div>
  );
}

export default Contact;
