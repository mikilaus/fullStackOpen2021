import React from "react";

function PersonForm({
  handleNameChange,
  handleNumberChange,
  addName,
  nameValue,
  numberValue,
}) {
  return (
    <form>
      <div>
        name: <input onChange={handleNameChange} value={nameValue} />
      </div>
      <div>
        number: <input onChange={handleNumberChange} value={numberValue} />
      </div>
      <div>
        <button type="submit" onClick={addName}>
          add
        </button>
      </div>
    </form>
  );
}

export default PersonForm;
