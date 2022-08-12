import React from "react";

function Heading(props) {
  return (
    <div>
      <div className="flex flex-col gap-y-6 sm:gap-y-6 md:gap-y-8 mb-10">
        <div className="flex flex-col gap-y-4 sm:gap-y-6 md:gap-y-8">
          <h1 className="font-optician text-theme-primary text-[2.5rem] sm:text-5xl md:text-6xl lg:text-7xl text-center lg:text-left">
            {props.title}
          </h1>
          <p className="text-xl w-11/12 mx-auto md:w-10/12 lg:w-10/12 lg:mx-0">
            {props.paragraph}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Heading;
