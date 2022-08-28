import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/pro-solid-svg-icons";
import {
  faTwitter,
  faSpotify,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { Link } from "gatsby";
import ApplePodcast from "../../static/images/apple-podcasts/mono-white.svg";

function Footer() {
  const currentYear = new Date().getFullYear();
  const links = {
    twitter: "https://twitter.com/DonoPodcast",
    instagram: "https://www.instagram.com/b_dono24",
    spotify: "https://open.spotify.com/show/0XYbDTCopdke2SPAWIxM0f",
    email: "mailto:brian@eyetestpodcast.com",
    apple:
      "https://podcasts.apple.com/us/podcast/the-eye-test-podcast/id1611984184?itsct=podcast_box&itscg=30200&ls=1",
  };

  return (
    <div className="w-full bg-slate-700">
      <div className="md:max-w-7xl md:w-11/12 mx-auto text-white py-8 md:py-4 flex flex-col md:flex-row gap-y-8 md:justify-between items-center">
        {/* Links */}
        <div class="text-3xl md:text-xl flex gap-x-16 md:gap-x-10">
          <a class="hover:text-slate-300 transition-all" href={links.twitter}>
            <FontAwesomeIcon icon={faTwitter} className="" />
          </a>
          <a class="hover:text-slate-300 transition-all" href={links.instagram}>
            <FontAwesomeIcon icon={faInstagram} className="" />
          </a>
          <a class="hover:text-slate-300 transition-all" href={links.spotify}>
            <FontAwesomeIcon icon={faSpotify} className="" />
          </a>
          <a class="hover:text-slate-300 transition-all" href={links.email}>
            <FontAwesomeIcon icon={faPaperPlane} className="" />
          </a>
        </div>
        <div className="border border-slate-400 hover:border-slate-200 rounded-md p-2 md:p-1 bg-slate-800 md:ml-8 hover:bg-slate-700 transition-all">
          <Link to={links.apple}>
            <ApplePodcast className="mx-auto md:w-28" />
          </Link>
        </div>
        <div className="flex-grow md:ml-6">
          <p className="font-optician text-slate-400 text-2xl md:text-lg">
            The Eye Test
          </p>
        </div>
        {/* Credit */}
        <div className="flex flex-col md:flex-row gap-y-8 gap-x-8 items-center">
          <div class="text-xs">
            <p id="copyright" class="">
              &#128736;{" " + currentYear} Josh Cobert
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
