import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Officer.scss";

gsap.registerPlugin(ScrollTrigger);

/**
 * @component
 *
 * This component renders each individual box containing officer information, including name and picture.
 *
 * @param {string} props.name - The name that will be displayed over the officer's photo.
 * @param {string[]} props.positions - The positions that the person holds within the club.
 * @param {string} props.photo - the photo that will be displayed in the main box.
 * @returns {JSX.Element}
 */
export const Officer = ({ image, name, positions }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        {
          opacity: 0,
          y: -10,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 60%",
            once: true,
          },
        },
      );
    }
  }, [image]);

  return (
    <div ref={cardRef} className="officer-box">
      <img className="image" src={image} alt={name} />
      <div className="overlay">
        <p className="officer-name">{name}</p>
        {positions.map((position) => (
          <p className="officer-position" key={position}>{position}</p>
        ))}
      </div>
    </div>
  );
};
