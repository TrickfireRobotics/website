import './RepeatingTextBackground.scss'

/**
 * @component
 *
 * Repeating Text Background component that renders the repeating text in the background of the section.
 *
 * @param {string} backgroundText - The text that will be repeated in the background of this section.
 * @returns {JSX.Element}
 */
export const RepeatingTextBackground = ({backgroundText, children}) => {
    // Repeat the given background text
    const repeatedText = Array.from({ length: 20 }, (_, i) => (
        <div
            key={i}
            className='repeat-text-item'
            style={{ top: `${i * 3.5}rem` }}
        >
            {`${backgroundText} `.repeat(30)}
        </div>
    ));

    // Return the full background
    return (
        <div className='repeating-text-background'>
            {repeatedText}
            {children}
        </div>
    );
};
