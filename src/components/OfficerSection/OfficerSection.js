import "./OfficerSection.scss";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Officer } from "../Officer/Officer";
import { GradientLine } from "../GradientLine/GradientLine";
import { urlFor } from "../../assets/SanityClient";

gsap.registerPlugin(ScrollTrigger);

/**
 * @component
 *
 * Renders the complete officer section, split into an Officers group of feature cards
 * and a Leadership group of compact cards.
 *
 * @param {Array<Object>} allOfficers - Array of officer objects from Sanity
 * @param {string} allOfficers[].name - The officer's name
 * @param {string[]} [props.allOfficers[].positions] - The officer's positions
 * @param {string} [props.allOfficers[].position] - Legacy single position
 * @param {string} [props.allOfficers[].section] - 'officers' or 'leadership'
 * @param {Object} [props.allOfficers[].image] - The officer's optional image object (Sanity image)
 * @returns {JSX.Element}
 *
 * @example
 * // Usage with officers data from Sanity
 * <OfficerSection allOfficers={officers} />
 */
export const OfficerSection = ({ allOfficers }) => {
  const rootRef = useRef(null);

  const sections = [
    {
      title: "Officers",
      variant: "feature",
      people: allOfficers.filter((person) =>
        person.section
          ? person.section === "officers"
          : person.type === "officer",
      ),
    },
    {
      title: "Leadership",
      variant: "compact",
      people: allOfficers.filter((person) =>
        person.section
          ? person.section === "leadership"
          : person.type !== "officer",
      ),
    },
  ];

  useEffect(() => {
    if (
      !rootRef.current ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const context = gsap.context((self) => {
      self.selector(".officer-grid").forEach((grid) => {
        gsap.fromTo(
          grid.children,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.06,
            scrollTrigger: {
              trigger: grid,
              start: "top 85%",
              once: true,
            },
          },
        );
      });
    }, rootRef);

    return () => context.revert();
  }, [allOfficers]);

  return (
    <div className="officer-section" ref={rootRef}>
      <header className="section-header">
        <h1 className="title">TrickFire is 100% Student-Led</h1>
        <GradientLine />
      </header>

      {sections.map(
        (section) =>
          section.people.length > 0 && (
            <section className="people-group" key={section.title}>
              <header className="group-header">
                <h2 className="group-title">{section.title}</h2>
                <span className="group-rule" aria-hidden="true" />
              </header>
              <ul className={`officer-grid officer-grid--${section.variant}`}>
                {section.people.map((officer) => (
                  <Officer
                    key={officer._id}
                    variant={section.variant}
                    image={
                      officer.image
                        ? urlFor(officer.image).auto("format").width(640).url()
                        : null
                    }
                    name={officer.name}
                    positions={
                      officer.positions?.length
                        ? officer.positions
                        : [officer.position].filter(Boolean)
                    }
                  />
                ))}
              </ul>
            </section>
          ),
      )}
    </div>
  );
};
