import React from "react";
import Heading from "../components/Heading.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSpotify,
  faApple,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
// import {} from "@fortawesome/pro-solid-svg-icons";

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
        <div>
          <h4 className="text-2xl text-slate-800 text-center lg:text-left mb-4">
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
            <p>
              Baltimore chop right fielder cracker jack take losses lineup
              slider. Win baltimore chop manager designated hitter left fielder
              leather rainout on deck. Pinch runner bat helmet left on base left
              fielder 4-6-3 error no decision second base. National pastime
              first base on-base percentage right field error backstop cracker
              jack cork. Sabremetrics first base interleague dead red bullpen
              pinch hitter screwball. Second base runs hey batter run batted in
              outfielder, ball no decision game swing.
            </p>
          </div>
        </div>
        {/* The Team */}
        <div>
          <h4 className="text-2xl text-slate-800 text-center lg:text-left mb-4">
            The Team
          </h4>
          <div className="flex flex-col gap-y-4">
            <div>
              <h5 className="text-lg text-slate-700">Brian Donovan</h5>
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
              <h5 className="text-lg text-slate-700">Josh Cobert</h5>
              <div className="flex flex-col gap-y-3 lg:gap-y-4">
                <p>
                  Josh pushes the buttons and pulls the levers behind the
                  scenes. From editing and producing podcast episodes, to
                  creating the catchy theme song, and even developing this
                  website, Josh makes sure The Eye Test makes its way to your
                  eyes and ears. A long time pal of Brian, he is happy to help
                  showcase Brian's passion for sports and elevate this platform.
                </p>
                <p>
                  Looking for that catchy theme song? It's available to stream
                  here or wherever you get your music.
                </p>
                {/* Music Links */}
                <div className="flex gap-x-2 justify-evenly text-slate-700 text-5xl">
                  <a
                    class="hover:text-slate-500 transition-all"
                    href={links.spotify}
                  >
                    <FontAwesomeIcon icon={faSpotify} className="" />
                  </a>
                  <a
                    class="hover:text-slate-300 transition-all"
                    href={links.apple}
                  >
                    <FontAwesomeIcon icon={faApple} className="" />
                  </a>
                  <a
                    class="hover:text-slate-300 transition-all"
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
    </div>
  );
}

export default About;
