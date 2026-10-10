import "./Officer.scss";

/**
 * @component
 *
 * This component renders each individual box containing officer information, including name and picture.
 *
 * @param {string} props.name - The name that will be displayed over the officer's photo.
 * @param {string[]} props.positions - The positions that the officer holds within the club.
 * @param {string} [props.image] - The optional photo. Initials are shown when absent.
 * @returns {JSX.Element}
 */
export const Officer = ({ image, name, positions }) => {
  const initials = name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("");

  return (
    <div className="officer-box">
      {image ? (
        <img className="image" src={image} alt={name} loading="lazy" />
      ) : (
        <span className="initials" aria-hidden="true">
          {initials}
        </span>
      )}
      <div className="overlay">
        <p className="officer-name">{name}</p>
        {positions.map((position) => (
          <p className="officer-position" key={position}>
            {position.trim()}
          </p>
        ))}
      </div>
    </div>
  );
};
