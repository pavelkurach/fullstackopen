/* eslint-disable jsx-a11y/label-has-associated-control */
export default function PersonForm({
  newName,
  handleNameChange,
  newNumber,
  handleNumberChange,
  handlePersonSubmit,
}) {
  return (
    <form>
      <div>
        <label>
          name:{" "}
          <input type="text" value={newName} onChange={handleNameChange} />
        </label>
      </div>
      <div>
        <label>
          number:{" "}
          <input type="tel" value={newNumber} onChange={handleNumberChange} />
        </label>
      </div>
      <div>
        <button type="submit" onClick={handlePersonSubmit}>
          add
        </button>
      </div>
    </form>
  );
}
