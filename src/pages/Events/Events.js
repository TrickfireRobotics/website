import "./Events.scss";
import { GradientLine } from "../../components/GradientLine/GradientLine";
import { MaxWidthContainer } from "../../components/MaxWidthContainer/MaxWidthContainer";
import { Event } from "../../components/Event/Event";
import { PageSEO } from "../../components/PageSEO/PageSEO";
import { useState, useEffect } from "react";
import { client, urlFor } from "../../assets/SanityClient";
import { RepeatingTextBackground } from '../../components/RepeatingTextBackground/RepeatingTextBackground';

export const Events = () => {
  const seoData = {
    title: "Events",
    description:
      "Explore TrickFire Robotics' upcoming events and workshops. Learn more about our work and gain new skills in robotics and engineering.",
    keywords: "events, workshops, robotics, learning",
    url: "/events",
  };
  const [events, setEvents] = useState([]);

  useEffect(() => {
    client
      .fetch(`*[_type == "events"] | order(formattedDate asc)`)
      .then((data) => setEvents(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <PageSEO {...seoData} />
      <main className="events">
        <MaxWidthContainer>
          <section className="page-head">
            <h2 className="events-header">Events</h2>
            <GradientLine />
            <p className="page-head-text">
              TrickFire’s events and workshops are a great way to learn more
              about our work and gain new skills.
            </p>
          </section>
        </MaxWidthContainer>
        <section className="events-section">
          <MaxWidthContainer>
            <RepeatingTextBackground backgroundText="EVENTS">
              <div className="events-list">
                {events?.length !== 0 ? (
                  events.map((event) => {
                    return (
                      <Event
                        key={event?.title}
                        img={urlFor(event.img).auto("format").url()}
                        altText={event?.altText}
                        title={event?.title}
                        timeDescription={event?.timeDescription}
                        locationDescription={event?.locationDescription}
                        description={event?.description}
                        date={event?.date}
                        links={event?.links}
                      />
                    );
                  })
                ) : (
                  <div className="empty-state-container">
                    <h2 className="empty-state-text">
                      No upcoming events right now — check back soon!
                    </h2>
                  </div>
                )}
              </div>
            </RepeatingTextBackground>
          </MaxWidthContainer>
        </section>
      </main>
    </>
  );
};
