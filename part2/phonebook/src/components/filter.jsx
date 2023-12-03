/* eslint-disable react/prop-types */
export default function Filter({ filterName, onFilterName }) {
  return (
    <div>
      <p>filter shown with</p>
      <input value={filterName} onChange={onFilterName} />
    </div>
  );
}
