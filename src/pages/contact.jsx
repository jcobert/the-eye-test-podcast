import React from "react";
import Heading from "../components/Heading.jsx";
import ContactForm from "../components/ContactForm.jsx";
import { Mention } from "react-twitter-widgets";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/pro-solid-svg-icons";
import { faTwitter, faInstagram } from "@fortawesome/free-brands-svg-icons";

function Contact() {
  const links = {
    twitter:
      "https://twitter.com/intent/tweet?screen_name=DonoPodcast&ref_src=twsrc%5Etfw",
    instagram: "https://www.instagram.com/b_dono24",
    email: "mailto:brian@eyetestpodcast.com",
  };

  return (
    <div>
      <div>
        <Heading
          title={"Contact"}
          subtitle={"Have something to share? We'd love to hear from you."}
        />
      </div>
      <div className="flex flex-col gap-y-12 items-center mb-24">
        {/* Links */}
        <div className="flex flex-col md:flex-row gap-y-10 gap-x-12 lg:gap-x-12 items-center justify-center">
          {/* Twitter */}
          <div>
            <a class="hover:text-slate-300 transition-all" href={links.twitter}>
              <FontAwesomeIcon
                icon={faTwitter}
                className="text-5xl text-theme-primary hover:text-slate-500 transition-all"
              />
            </a>
          </div>
          {/* Email */}
          <div>
            <a href={links.email}>
              <FontAwesomeIcon
                icon={faEnvelope}
                className="text-5xl text-theme-primary hover:text-slate-500 transition-all"
              />
            </a>
          </div>
        </div>
        {/* Text */}
        <div className="text-center text-slate-600">
          <p>Or, drop us a line...</p>
        </div>
        {/* Form */}
        <div className="max-w-2xl w-full">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}

export default Contact;
