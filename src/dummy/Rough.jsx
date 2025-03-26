const ObdManageVoiceClips = () => {
  // ...existing state variables...
  const [addVariable, setAddVariable] = useState([]); // State to manage dynamic variables

  // Function to add a new variable
  const addVariables = () => {
    setAddVariable((prev) => [...prev, { id: Date.now(), value: "" }]);
  };

  // Function to handle input change for a specific variable
  const handleVariableChange = (id, newValue) => {
    setAddVariable((prev) =>
      prev.map((variable) =>
        variable.id === id ? { ...variable, value: newValue } : variable
      )
    );
  };

  // Function to delete a specific variable
  const deleteVariable = (id) => {
    setAddVariable((prev) => prev.filter((variable) => variable.id !== id));
  };

  return (
    <div className="w-full">
      {/* ...existing code... */}
      <div className="flex flex-row mt-2 justify-center gap-2">
        <UniversalButton
          id="obdvoiceaddfilebtn"
          name="obdvoiceaddfilebtn"
          label="Add Variable"
          placeholder="Add Variable"
          onClick={addVariables}
        />
      </div>

      {/* Render dynamic variables */}
      <div className="mt-4">
        {addVariable.map((entry, index) => (
          <div className="flex gap-2 items-center mt-3" key={entry.id}>
            <label
              htmlFor={`variable-${entry.id}`}
              className="text-sm font-medium text-gray-700"
            >
              Variable {index + 1}:
            </label>
            <InputField
              id={`variable-${entry.id}`}
              placeholder={`Enter Variable ${index + 1}`}
              value={entry.value}
              onChange={(e) => handleVariableChange(entry.id, e.target.value)}
            />
            <button
              className="rounded-2xl p-1.5 hover:bg-gray-200 cursor-pointer"
              onClick={() => deleteVariable(entry.id)}
            >
              <MdOutlineDeleteForever
                className="text-red-500 cursor-pointer hover:text-red-600"
                size={20}
              />
            </button>
          </div>
        ))}
      </div>
      {/* ...existing code... */}
    </div>
  );
};

export default ObdManageVoiceClips;