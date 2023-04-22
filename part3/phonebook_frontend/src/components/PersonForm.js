/* eslint-disable jsx-a11y/label-has-associated-control */
export default function PersonForm({
  newName,
  handleNameChange,
  newNumber,
  handleNumberChange,
  handlePersonSubmit,
}) {
  const style = {
    margin: "8px",
  };

  return (
    <form>
      <div style={style}>
        <label>
          name:{" "}
          <input type="text" value={newName} onChange={handleNameChange} />
        </label>
      </div>
      <div style={style}>
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
