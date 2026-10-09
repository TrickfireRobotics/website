import './OfficerSection.scss'
import { Officer } from '../Officer/Officer';
import { urlFor } from '../../assets/SanityClient';

/**
 * @component
 * 
 * Renders the complete officer section.
 * 
 * @param {Array<Object>} allOfficers - Array of officer objects from Sanity
 * @param {string} allOfficers[].name - The officer's name
 * @param {string} props.allOfficers[].position - The officer's position/title
 * @param {Object} props.allOfficers[].image - The officer's image object (Sanity image)
 * @returns {JSX.Element}
 * 
 * @example
 * // Usage with officers data from Sanity
 * <OfficerSection allOfficers={officers} />
 */
export const OfficerSection = ({allOfficers}) => {
    const sections = [
        {
            title: 'Officers',
            people: allOfficers.filter((person) =>
                person.section ? person.section === 'officers' : person.type === 'officer'
            ),
        },
        {
            title: 'Leadership',
            people: allOfficers.filter((person) =>
                person.section ? person.section === 'leadership' : person.type !== 'officer'
            ),
        },
    ];

    return (
        <div className='officer-section'>
            <h1 className='title'>TrickFire is 100% Student-Led</h1>
            {sections.map((section) => section.people.length > 0 && (
                <section className='people-group' key={section.title}>
                    <h2 className='section-title'>{section.title}</h2>
                    <div className='officer-grid'>
                        {section.people.map((officer) => (
                            <Officer
                                key={officer._id}
                                image={urlFor(officer.image).auto('format').url()}
                                name={officer.name}
                                positions={officer.positions?.length
                                    ? officer.positions
                                    : [officer.position].filter(Boolean)}
                            />
                        ))}
                    </div>
                </section>
            ))}
        </div>
    );
};
