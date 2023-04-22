/* eslint-disable jsx-a11y/label-has-associated-control */
export default function Filter({ filter, handleFilterChange }) {
  return (
    <div>
      <label>
        filter shown with <input value={filter} onChange={handleFilterChange} />
      </label>
    </div>
  );
}
