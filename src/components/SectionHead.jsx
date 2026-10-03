function SectionHead({ title, linkHref, linkLabel }) {
  return (
    <div className="section-head">
      <h2>{title}</h2>
      {linkHref && (
        <a href={linkHref} className="section-head__link">
          {linkLabel}
        </a>
      )}
    </div>
  );
}

export default SectionHead;
