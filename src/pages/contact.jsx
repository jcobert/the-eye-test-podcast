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
      <div className="border rounded-md bg-slate-50 max-w-2xl mx-auto">
        <ContactForm />
      </div>
    </div>
  );
}

export default Contact;
