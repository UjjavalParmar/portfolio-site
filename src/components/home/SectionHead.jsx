/**
 * Eyebrow + heading + optional intro. Every section opens this way; the
 * bracket characters are part of the eyebrow, not decoration added here.
 */
export default function SectionHead({
  eyebrow,
  title,
  intro,
  size = 'md',
  titleWidth,
  introWidth,
  gap = 40,
}) {
  return (
    <>
      <p className="eyebrow" style={{ marginBottom: '18px' }}>
        [ {eyebrow} ]
      </p>
      <h2
        className={size === 'sm' ? 'h2 h2--sm' : 'h2'}
        style={{
          margin: `0 0 ${intro ? '12px' : `${gap}px`}`,
          maxWidth: titleWidth,
        }}
      >
        {title}
      </h2>
      {intro && (
        <p
          className="body-intro"
          style={{ margin: `0 0 ${gap}px`, maxWidth: introWidth }}
        >
          {intro}
        </p>
      )}
    </>
  )
}
