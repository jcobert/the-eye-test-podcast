import React from "react";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="w-full bg-slate-700">
      <div className="md:max-w-7xl md:w-11/12 mx-auto text-white py-8 md:py-4 flex flex-col md:flex-row gap-y-8 md:justify-between items-center">
        {/* Links */}
        <div class="text-3xl md:text-xl flex gap-x-16 md:gap-x-12">
          <a
            class="hover:text-blue-300 transition-all"
            href=""
          >
            {/* <i class=""></i> */}
          </a>
          <a
            class="hover:text-blue-300 transition-all"
            href=""
          >
            {/* <i class=""></i> */}
          </a>
          <a
            class="hover:text-blue-300 transition-all"
            href=""
          >
            {/* <i class=""></i> */}
          </a>
        </div>
        <div className="flex flex-col md:flex-row gap-y-8 gap-x-8 items-center">
          {/* Credit */}
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
