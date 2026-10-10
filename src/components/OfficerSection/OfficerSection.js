import "./OfficerSection.scss";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Officer } from "../Officer/Officer";
import { GradientLine } from "../GradientLine/GradientLine";
import { urlFor } from "../../assets/SanityClient";

gsap.registerPlugin(ScrollTrigger);

const TABS = [
  { key: "officer", label: "OFFICERS" },
  { key: "discipline", label: "DISCIPLINE LEADS" },
  { key: "team", label: "TEAM LEADS" },
  { key: "mission", label: "MISSION DIRECTORS" },
];

/**
 * @component
 *
 * Renders the complete officer section with tabbed navigation and officer grid.
 *
 * This component displays officers organized by category (Officers, Discipline Leads,
 * Team Leads, Mission Directors). It includes desktop tab navigation and a mobile
 * dropdown selector.
 *
 * @param {Array<Object>} allOfficers - Array of officer objects from Sanity
 * @param {string} allOfficers[].name - The officer's name
 * @param {string[]} allOfficers[].positions - The officer's positions
 * @param {Object} [allOfficers[].image] - The officer's optional image object (Sanity image)
 * @param {('officer'|'discipline'|'team'|'mission')} allOfficers[].type - Category tab for filtering
 * @returns {JSX.Element}
 *
 * @example
 * // Usage with officers data from Sanity
 * <OfficerSection allOfficers={officers} />
 */
export const OfficerSection = ({ allOfficers }) => {
  const [activeTab, setActiveTab] = useState(TABS[0].key);
  const [isDropdownActive, setIsDropdownActive] = useState(false);
  const rootRef = useRef(null);

  const displayedOfficers = allOfficers.filter(
    (officer) => officer.type === activeTab,
  );

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
  }, [activeTab, allOfficers]);

  return (
    <div className="officer-section" ref={rootRef}>
      <header className="section-header">
        <h1 className="title">TrickFire is 100% Student-Led</h1>
        <GradientLine />
      </header>

      <div className="tabs">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            className={`tab ${activeTab === tab.key ? "active" : ""}`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="mobile-tabs">
        <button
          className="active-tab"
          onClick={() => setIsDropdownActive(!isDropdownActive)}
        >
          {TABS.find((tab) => tab.key === activeTab)?.label}
          <span className="arrow">{isDropdownActive ? "▲" : "▼"}</span>
        </button>
        <GradientLine className="gradient" />
        {isDropdownActive && (
          <div className="dropdown">
            {TABS.map((tab) => (
              <button
                key={tab.key}
                onClick={() => {
                  setActiveTab(tab.key);
                  setIsDropdownActive(false);
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        )}
      </div>

      <ul className="officer-grid officer-grid--feature" key={activeTab}>
        {displayedOfficers.map((officer) => (
          <Officer
            key={officer._id}
            variant="feature"
            image={
              officer.image
                ? urlFor(officer.image).auto("format").width(640).url()
                : null
            }
            name={officer.name}
            positions={officer.positions}
          />
        ))}
      </ul>
    </div>
  );
};
