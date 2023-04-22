export default function Persons({ persons, filter, handleDeleteClicked }) {
  const personStyle = {
    margin: "8px",
  };

  const buttonStyle = {
    marginLeft: "16px",
  };

  return (
    <div>
      {persons
        ?.filter(person =>
          person.name.toLowerCase().includes(filter.toLowerCase()),
        )
        .map(person => (
          <div key={person.name} style={personStyle}>
            <span>
              {person.name} {person.number}
            </span>
            <button
              type="button"
              onClick={() => {
                handleDeleteClicked(person.id);
              }}
              style={buttonStyle}
            >
              Delete
            </button>
          </div>
        ))}
    </div>
  );
}
