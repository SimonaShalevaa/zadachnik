import { SUBJECT_TAG_CLASS, subjectLabel } from "../data/subjects";

function SubjectTag({ subject }) {
  const extra = SUBJECT_TAG_CLASS[subject];
  return <span className={extra ? `tag ${extra}` : "tag"}>{subjectLabel(subject)}</span>;
}

export default SubjectTag;
