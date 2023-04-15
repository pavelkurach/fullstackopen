export default function Filter({ filter, handleFilterChange }) {
  return (
    <div>
      <label>
        filter shown with <input value={filter} onChange={handleFilterChange} />
      </label>
    </div>
  );
}
