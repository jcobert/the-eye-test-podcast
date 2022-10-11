import React from "react";
import Heading from "../components/Heading.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSpotify,
  faApple,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
// import {} from "@fortawesome/pro-solid-svg-icons";
import { StaticImage } from "gatsby-plugin-image";

function About() {
  const links = {
    spotify:
      "https://open.spotify.com/track/0gLGKcUMjGQQ8aimmgjtL8?si=c6ed19eddf234a51",
    apple:
      "https://music.apple.com/us/album/the-eye-test-theme-from-the-eye-test-podcast/1619215200?i=1619215201",
    youtube: "https://music.youtube.com/watch?v=R9kKrzz7imk",
  };

  return (
    <div className="mb-12 md:mb-16">
      <div>
        <Heading title="About" subtitle="Learn more about The Eye Test." />
      </div>
      {/* Main Content */}
      <div className="flex flex-col gap-y-8">
        {/* Background */}
        <div className="border rounded bg-slate-50 p-4 md:p-8 lg:px-12">
          <h4 className="text-2xl text-slate-800 text-center lg:text-left mb-6">
            Background
          </h4>
          <div className="text-left flex flex-col gap-y-3 lg:gap-y-4">
            <p>
              Practice range corner batting average arm take lineup assist.
              Sacrifice shift basehit slider world series pinch runner sacrifice
              batter's box pull. Inside designated hitter gap southpaw relay
              shutout relief pitcher. Gold glove corner dribbler arm fenway
              check swing starter. Relay pitchout squeeze dead red bases loaded,
              diamond pinch hit. Visitors unearned run disabled list ball play
              fielder's choice moneyball mitt sacrifice bunt.
            </p>
            <p>
              Forkball balk golden sombrero can of corn force pitchout pennant
              balk cellar. Leather run outfield leadoff dribbler team gap
              forkball. Stance gap first base choke up gold glove triple-A
              fenway out butcher boy. First base bases loaded hall of fame
              baseball blue foul line walk off. Fielder's choice hall of fame
              warning track baseball yankees left field scorecard rainout curve.
              Can of corn bunt small ball count mound, leather forkball
              southpaw.
            </p>
          </div>
        </div>
        {/* The Team */}
        <div className="border rounded bg-slate-50 p-4 md:p-8 lg:px-12">
          <h4 className="text-2xl text-slate-800 text-center lg:text-left mb-6">
            The Team
          </h4>
          <div className="flex flex-col gap-y-10">
            <div>
              <StaticImage
                className="w-16 rounded-full shadow float-left mr-6"
                src="../images/brian-donovan.png"
                alt="Brian Donovan bio photo"
                objectFit="contain"
                loading="eager"
                placeholder="tracedSVG"
                imgClassName="rounded-full border-2 border-slate-300"
              />
              <div className="flex flex-col mb-1">
                <h5 className="text-lg text-slate-800">Brian Donovan</h5>
                <p className="text-slate-500 -mt-2">Founder and Host</p>
              </div>
              <p>
                Bro ipsum dolor sit amet clean McTwist trail swag schwag jib
                pinner, ollie giblets huckfest gondy afterbang. Bail bowl snake
                bite pow. Bump pipe nose saddle 360. Noodle clean sketching
                white room smear Whistler taco dirtbag skid lid air fatty sucker
                hole. Couloir stoked dirt, misty carve first tracks corduroy
                sharkbite stunt rip. Method park cornice 360, bail fully air
                Snowboard spread eagle stoked ride around Ski.
              </p>
            </div>
            <div>
            <StaticImage
                className="w-16 rounded-full shadow float-left mr-6"
                src="../images/josh-cobert.jpg"
                alt="Josh Cobert bio photo"
                objectFit="contain"
                loading="eager"
                placeholder="tracedSVG"
                imgClassName="rounded-full border-2 border-slate-300"
              />
              <div className="flex flex-col mb-1">
                <h5 className="text-lg text-slate-800">Josh Cobert</h5>
                <p className="text-slate-500 -mt-2">
                  Producer, Technology Lead
                </p>
              </div>
              <p>
                Josh pushes the buttons and pulls the levers behind the scenes.
                From editing and producing podcast episodes, to creating the
                catchy theme song, and even developing this website, Josh makes
                sure The Eye Test makes its way to your eyes and ears. A long
                time pal of Brian, he is happy to help showcase Brian's passion
                for sports and elevate this platform.
              </p>
            </div>
          </div>
        </div>
        {/* Theme Song CTA */}
        <div className="w-full md:w-[32rem] lg:w-[34rem] mx-auto p-4 bg-slate-50 border rounded">
          <p className="text-center text-xl text-slate-900">
            Looking for that catchy theme song?
          </p>
          <p className="text-center text-slate-700">
            It's available to stream wherever you get your music.
          </p>
          <div className="flex flex-col flex-wrap lg:flex-row lg:w-full lg:mx-auto justify-center items-center gap-y-4 my-4 lg:my-6">
            {/* Album Artwork */}
            <StaticImage
              className="w-32 max-w-[9rem] flex-auto lg:ml-16 my-4 lg:my-0"
              src="../images/theme-song-art.jpg"
              alt="Theme song album artwork"
              objectFit="contain"
              loading="eager"
              placeholder="tracedSVG"
            />
            {/* Music Links */}
            <div className="flex flex-col flex-1 w-full md:w-fit">
              <p className="text-center text-xl text-theme-primary font-optician py-2">
                Listen now!
              </p>
              <div className="flex gap-x-2 justify-around sm:justify-evenly md:justify-center sm:gap-x-24 md:gap-x-12 mx-auto w-full text-slate-700 text-5xl sm:text-4xl bg-slate-100 border rounded py-2 md:w-fit md:px-6">
                <a
                  class="hover:text-theme-primary transition-all"
                  href={links.spotify}
                >
                  <FontAwesomeIcon icon={faSpotify} className="" />
                </a>
                <a
                  class="hover:text-theme-primary transition-all"
                  href={links.apple}
                >
                  <FontAwesomeIcon icon={faApple} className="" />
                </a>
                <a
                  class="hover:text-theme-primary transition-all"
                  href={links.youtube}
                >
                  <FontAwesomeIcon icon={faYoutube} className="" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
