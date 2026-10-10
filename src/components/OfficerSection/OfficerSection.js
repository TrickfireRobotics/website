import "./OfficerSection.scss";
import { useState } from "react";
import { Officer } from "../Officer/Officer";
import { GradientLine } from "../GradientLine/GradientLine";
import { urlFor } from "../../assets/SanityClient";

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
 * @param {Object} [allOfficers[].image] - The officer's optional photo (Sanity image)
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

  const displayedOfficers = allOfficers.filter(
    (officer) => officer.type === activeTab,
  );

  return (
    <div className="officer-section">
      <h1 className="title">TrickFire is 100% Student-Led</h1>

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

      <div className="officer-grid" key={activeTab}>
        {displayedOfficers.map((officer) => (
          <Officer
            key={officer._id}
            image={
              officer.image
                ? urlFor(officer.image).auto("format").width(640).url()
                : null
            }
            name={officer.name}
            positions={officer.positions}
          />
        ))}
      </div>
    </div>
  );
};
