import React from "react";
import { useForm, ValidationError } from "@formspree/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/pro-regular-svg-icons";

function ContactForm() {
  const [state, handleSubmit] = useForm("xqkjqlqq");
  if (state.succeeded) {
    return <p>Thanks for reaching out!</p>;
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col items-center gap-y-6 px-4 py-6 sm:p-8 text-slate-700">
          {/* Name */}
          <div className="flex flex-col w-full">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              name="name"
              className="border rounded p-2"
            />
            <ValidationError prefix="Name" field="name" errors={state.errors} />
          </div>
          {/* Email */}
          <div className="flex flex-col w-full">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              className="border rounded p-2"
            />
            <ValidationError
              prefix="Email"
              field="email"
              errors={state.errors}
            />
          </div>
          {/* Message */}
          <div className="flex flex-col w-full">
            <label htmlFor="label">Message</label>
            <textarea
              id="message"
              name="message"
              className="border rounded p-2"
            />
            <ValidationError
              prefix="Message"
              field="message"
              errors={state.errors}
            />
          </div>
          {/* Submit */}
          <div className="w-8/12 md:w-6/12 mt-4">
            <button
              type="submit"
              disabled={state.submitting}
              className="w-full h-14 mx-auto border border-white rounded-md text-white text-xl bg-theme-primary"
            >
              <div className="flex gap-x-4 justify-center items-center">
                <p>Send</p>
                <FontAwesomeIcon icon={faPaperPlane} />
              </div>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ContactForm;
