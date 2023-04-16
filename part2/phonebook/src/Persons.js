export default function Persons({ persons, filter, handleDeleteClicked }) {
  return (
    <div>
      {persons
        .filter(person =>
          person.name.toLowerCase().includes(filter.toLowerCase()),
        )
        .map(person => (
          <div key={person.name}>
            <span>
              {person.name} {person.number}
            </span>
            <button
              type="button"
              onClick={() => {
                handleDeleteClicked(person.id);
              }}
            >
              Delete
            </button>
          </div>
        ))}
    </div>
  );
}
