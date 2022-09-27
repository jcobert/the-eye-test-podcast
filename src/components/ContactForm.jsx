import React from "react";
import { useForm, ValidationError } from "@formspree/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaperPlane,
  faCircleCheck,
} from "@fortawesome/pro-regular-svg-icons";

function ContactForm() {
  const [state, handleSubmit] = useForm("xqkjqlqq");

  if (state.succeeded) {
    return (
      <div className="flex flex-col lg:flex-row items-center justify-center gap-y-4 gap-x-4 text-center text-lg text-slate-700 border rounded-md bg-slate-50 py-14">
        <FontAwesomeIcon icon={faCircleCheck} className="text-theme-primary text-xl" />
        <p>Thanks for reaching out!</p>
      </div>
    );
  }

  return (
    <div className="border rounded-md bg-slate-50">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col items-center gap-y-6 px-4 py-6 sm:p-8 text-slate-700">
          {/* Name */}
          <div className="flex flex-col w-full">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              name="name"
              required
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
              required
              className="border rounded p-2 h-28"
            />
            <ValidationError
              prefix="Message"
              field="message"
              errors={state.errors}
            />
          </div>
          {/* Submit */}
          <div className="w-8/12 md:w-6/12 mt-4 mb-2">
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
