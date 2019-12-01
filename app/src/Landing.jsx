import React from "react";
import Plx from "react-plx";
import { makeStyles, Typography } from "@material-ui/core";

import { isMobile } from "./util";
import ScrollDown from "./ScrollDown";
import RSVP from "./RSVP";

const useStyles = makeStyles(theme => ({
  rsvp: {
    marginTop: "-60vh"
  },
  section: {
    padding: "50px",
    paddingBottom: "60vh"
  },
  sectionTypography: {
    fontWeight: 300,
    lineHeight: 1.25
  },
  noMargin: {
    margin: 0
  },
  spaceBelow: {
    margin: 0,
    marginBottom: "1em"
  },
  smaller: {
    fontWeight: "lighter",
    fontSize: "2.5rem"
  }
}));

const headingConfig = [
  {
    start: "self",
    duration: "30vh",
    properties: [
      {
        startValue: 0,
        endValue: 1,
        property: "opacity"
      },
      {
        startValue: 0,
        endValue: -50,
        unit: "vh",
        property: "translateY"
      }
    ]
  },
  {
    start: "self",
    startOffset: "30vh",
    duration: "50vh",
    properties: [
      {
        startValue: -50,
        endValue: -10,
        unit: "vh",
        property: "translateY"
      }
    ]
  },
  {
    start: "self",
    startOffset: "80vh",
    duration: "20vh",
    properties: [
      {
        startValue: 1,
        endValue: 0,
        property: "opacity"
      }
    ]
  }
];

const scrollDownConfig = start => [
  {
    start: `.${start}`,
    duration: "10vh",
    properties: [
      {
        startValue: 1,
        endValue: 0,
        property: "opacity"
      }
    ]
  }
];

const Heading = ({ children, config = headingConfig, heading = 2 }) => {
  const classes = useStyles();
  return (
    <Plx
      className="StickyText"
      parallaxData={config}
      className={classes.section}
      disabled={isMobile()}
    >
      <Typography
        variant={`h${isMobile() ? Math.max(heading, 4) : heading}`}
        component="div"
        className={classes.sectionTypography}
      >
        {children}
      </Typography>
    </Plx>
  );
};

function Landing({ person, setPerson }) {
  const classes = useStyles();
  return (
    <div>
      <Plx
        animateWhenNotInViewport
        parallaxData={scrollDownConfig(classes.rsvp)}
      >
        <ScrollDown />
      </Plx>
      <Heading heading={2} config={headingConfig.slice(2)}>
        <p className={classes.spaceBelow}>Hi, {person.firstName}!</p>
        <p className={classes.noMargin}>
          I'm trying something new here so bear with me...
        </p>
      </Heading>
      <Heading heading={3}>
        <p className={classes.spaceBelow}>
          Every year, after Christmas gatherings and New Year's festivities,
          January rolls around, and I start planning a big bash for my birthday.
        </p>
        <p className={classes.noMargin}>
          Some years I do dinners, some rooftop parties, and some more
          structured activities like escape rooms.
        </p>
      </Heading>
      <Heading heading={3}>
        <p className={classes.spaceBelow}>
          But as the years go on and my broader circle of friends gets wider and
          more diluted, something feels a bit lacking.
        </p>
        <p className={classes.noMargin}>
          It just doesn't feel that special anymore.
        </p>
      </Heading>
      <Heading heading={3}>
        <p className={classes.spaceBelow}>
          As fun as it is to gather friends,{" "}
          <span className={classes.smaller}>friends of friends</span>, and{" "}
          <i className={classes.smaller}>friends of friends of friends</i>{" "}
          together for a big ordeal,
        </p>
        <p className={classes.spaceBelow}>
          I miss the days when a birthday was an excuse to grab the few people
          you cherish the most, who bring you the most joy, love, and happiness
        </p>
        <p className={classes.noMargin}>
          ...and force them to spend a bunch of hours with you!
        </p>
      </Heading>
      <Heading heading={3}>
        <p className={classes.spaceBelow}>
          I want to get back to that, and I'm making up for lost time, so I'm
          asking for an entire weekend!
        </p>
        <p className={classes.spaceBelow}>
          This year, for my <b>25th</b> (!!) birthday, I'm reaching out to a
          handful of my closest friends and asking them to join me in Hawaii for
          a weekend of food and fun.
        </p>
        <p className={classes.noMargin}>
          The dates are Jan. 31st to Feb. 2nd. As one of the people in my life
          whose friendship I truly treasure, I sincerely hope you'll be able to
          make it out.
        </p>
      </Heading>
      <Heading heading={3}>
        <p className={classes.spaceBelow}>
          I understand this is a huge thing to ask of you, both in terms of time
          and cost.
        </p>
        <p className={classes.noMargin}>
          Hopefully, the prospect of spending a weekend on a beach, surrounded
          by incredible people and beautiful weather, is enough to convince you
          to take a leap here. The trip simply won't be the same without you.
        </p>
      </Heading>
      <Heading heading={3}>
        <p className={classes.spaceBelow}>
          Of course, I know that everyone is unbelievably overwhelmed and
          overcommitted these days, and between work, friends, family, and
          simply staying sane, there might not be an opportunity to take a trip
          like this.
        </p>
        <p className={classes.noMargin}>
          If that's the case, I completely understand, and I hope you'll be able
          to join whatever crazy scheme I cook up next year.
        </p>
      </Heading>
      <Heading heading={3}>
        <p className={classes.spaceBelow}>
          If you can make it, I'm ecstatic! 🎉
        </p>
        <p className={classes.spaceBelow}>Overjoyed! 😍 Elated! 🤗</p>
        <p className={classes.noMargin}>
          Please book your flights, and RSVP using the form at the bottom of
          this page no later than Jan. 1st.
        </p>
      </Heading>

      <Heading heading={3}>
        <p className={classes.spaceBelow}>
          You should plan on flying into Honolulu on either Jan 31st or Feb 1st.
        </p>

        <p className={classes.spaceBelow}>
          I'm flying in on the 31st (AS 743), and leaving on the 3rd (AS 710).
        </p>

        <p className={classes.spaceBelow}>
          I'll handle accomodation, so you just need to get yourself to the
          island!
        </p>

        <p className={classes.spaceBelow}>
          Southwest and Alaska both have some great itineraries for that weekend
          out of SF & Seattle.
        </p>
      </Heading>

      <Heading heading={2}>
        <p className={classes.spaceBelow}>
          Let me know if you have any questions,
        </p>

        <p className={classes.spaceBelow}>
          and thanks for indulging in my insanity!
        </p>
      </Heading>
      <br />
      <br />
      <div className={classes.rsvp}>
        <RSVP person={person} setPerson={setPerson} />
      </div>
    </div>
  );
}

export default Landing;
