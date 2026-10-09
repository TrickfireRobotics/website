import "./Officer.scss";

/**
 * @component
 *
 * Renders a single person card with their portrait, name and positions.
 *
 * @param {string} props.name - The person's name.
 * @param {string[]} props.positions - The positions that the person holds within the club.
 * @param {string} [props.image] - The optional portrait. Initials are shown when absent.
 * @param {('feature'|'compact')} [props.variant='feature'] - Card density. Officers use
 * 'feature' for a large portrait, leadership uses 'compact' for a dense roster.
 * @returns {JSX.Element}
 */
export const Officer = ({ image, name, positions, variant = "feature" }) => {
  const initials = name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("");

  return (
    <li className={`officer-card officer-card--${variant}`}>
      <div className="portrait">
        {image ? (
          <img src={image} alt={name} loading="lazy" />
        ) : (
          <span className="initials" aria-hidden="true">
            {initials}
          </span>
        )}
      </div>
      <div className="info">
        <p className="name">{name}</p>
        <ul className="positions">
          {positions.map((position) => (
            <li key={position}>{position.trim()}</li>
          ))}
        </ul>
      </div>
    </li>
  );
};
