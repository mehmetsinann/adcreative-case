export const HighlightedText = ({
  text,
  searchTerm,
  style,
}: {
  text: string;
  searchTerm: string;
  style?: string;
}) => {
  const lowerCaseText = text.toLowerCase();
  const lowerCaseSearchTerm = searchTerm.toLowerCase();
  const searchTermIndex = lowerCaseText.indexOf(lowerCaseSearchTerm);

  if (searchTermIndex === -1) {
    return <p className={style}>{text}</p>;
  }

  const beforeTerm = text.substring(0, searchTermIndex);
  const term = text.substring(
    searchTermIndex,
    searchTermIndex + searchTerm.length
  );
  const afterTerm = text.substring(searchTermIndex + searchTerm.length);

  return (
    <p className={style}>
      {beforeTerm}
      <span className="font-extrabold">{term}</span>
      {afterTerm}
    </p>
  );
};
