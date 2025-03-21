// File: components/APITracker/ApiDebugTool.jsx
import { useState } from "react";
// import JSONPretty from "react-json-pretty";
// import "react-json-pretty/themes/monikai.css";

const ApiDebugTool = () => {
  const [method, setMethod] = useState("GET");
  const [endpoint, setEndpoint] = useState("");
  const [authToken, setAuthToken] = useState("");
  const [headers, setHeaders] = useState([
    { key: "", value: "", type: "text" },
  ]);
  const [body, setBody] = useState("");
  const [response, setResponse] = useState(null);
  const [history, setHistory] = useState([]);

  const methods = ["GET", "POST", "PUT", "PATCH", "DELETE", "HEAD", "OPTIONS"];

  const handleHeaderChange = (index, field, value) => {
    const updated = [...headers];
    updated[index][field] = value;
    setHeaders(updated);
  };

  const addHeaderField = () =>
    setHeaders([...headers, { key: "", value: "", type: "text" }]);

  const handleRequest = async () => {
    try {
      let config = { method, headers: {} };
      let formData = new FormData();
      let isFormData = false;

      headers.forEach(({ key, value, type }) => {
        if (key) {
          if (type === "file" && value instanceof File) {
            formData.append(key, value);
            isFormData = true;
          } else {
            config.headers[key] = value;
          }
        }
      });

      if (authToken) config.headers["Authorization"] = `Bearer ${authToken}`;
      if (method !== "GET" && method !== "HEAD") {
        if (isFormData) {
          config.body = formData;
        } else {
          config.headers["Content-Type"] = "application/json";
          config.body = JSON.stringify(JSON.parse(body));
        }
      }

      const res = await fetch(endpoint, config);
      const data = await res.json();
      setResponse(data);
      setHistory([
        { method, endpoint, date: new Date().toLocaleString() },
        ...history.slice(0, 4),
      ]);
    } catch (err) {
      setResponse({ error: err.message });
    }
  };

  const formatBody = () => {
    try {
      const formatted = JSON.stringify(JSON.parse(body), null, 2);
      setBody(formatted);
    } catch (e) {
      alert("Invalid JSON");
    }
  };

  return (
    <div className="bg-gradient-to-tr from-sky-50 to-white border border-gray-200 shadow-md rounded-lg p-6 w-full">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">
        🔌 API Debugger
      </h3>

      <div className="flex gap-2 mb-4">
        <select
          value={method}
          onChange={(e) => setMethod(e.target.value)}
          className="border p-2 rounded text-sm"
        >
          {methods.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
        <input
          value={endpoint}
          onChange={(e) => setEndpoint(e.target.value)}
          placeholder="https://api.example.com/data"
          className="flex-grow border p-2 rounded text-sm"
        />
        <button
          onClick={handleRequest}
          className="bg-blue-600 text-white px-6 py-2 rounded shadow hover:bg-blue-700"
        >
          🚀 Send
        </button>
      </div>

      <input
        value={authToken}
        onChange={(e) => setAuthToken(e.target.value)}
        placeholder="Authorization Token (optional)"
        className="w-full mb-3 border p-2 rounded text-sm"
      />

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">
          🔑 Custom Headers
        </label>
        {headers.map((h, i) => (
          <div key={i} className="flex gap-2 mb-2">
            <input
              placeholder="Key"
              className="w-1/3 border p-2 rounded text-sm"
              value={h.key}
              onChange={(e) => handleHeaderChange(i, "key", e.target.value)}
            />
            {h.type === "file" ? (
              <input
                type="file"
                className="w-2/3 border p-2 rounded text-sm"
                onChange={(e) =>
                  handleHeaderChange(i, "value", e.target.files[0])
                }
              />
            ) : (
              <input
                placeholder="Value"
                className="w-2/3 border p-2 rounded text-sm"
                value={h.value}
                onChange={(e) => handleHeaderChange(i, "value", e.target.value)}
              />
            )}
            <select
              value={h.type}
              onChange={(e) => handleHeaderChange(i, "type", e.target.value)}
              className="border p-2 rounded text-sm"
            >
              <option value="text">Text</option>
              <option value="file">File</option>
            </select>
          </div>
        ))}
        <button
          onClick={addHeaderField}
          className="text-sm text-blue-600 hover:underline"
        >
          + Add Header
        </button>
      </div>

      {/* {(method !== 'GET' && method !== 'HEAD') && ( */}
      <>
        <div className="flex items-center justify-between">
          <label className="block text-sm font-medium mb-1">
            📦 Request Body (JSON)
          </label>
          <button
            onClick={formatBody}
            className="text-xs text-purple-600 hover:underline mb-4"
          >
            Format JSON
          </button>
        </div>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          // placeholder="{\n  \"key\": \"value\"\n}"
          className="w-full border p-2 text-sm rounded mb-2 h-40"
        />
      </>
      {/* )} */}

      {history.length > 1 && (
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            🕒 Request History
          </label>
          <ul className="text-xs text-gray-600 space-y-1">
            {history.map((h, i) => (
              <li key={i}>
                • [{h.date}] {h.method} {h.endpoint}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div>
        <h4 className="text-sm font-semibold mb-1 text-gray-700">
          📬 Response
        </h4>
        {/* <div className="bg-gray-900 text-green-200 p-4 rounded-md text-xs max-h-72 overflow-auto">
          {response ? (
            <JSONPretty data={response} />
          ) : (
            "// Response will appear here"
          )}
        </div> */}
        <pre className="bg-gray-900 text-green-200 p-4 rounded-md text-xs max-h-72 overflow-auto">
          {response
            ? JSON.stringify(response, null, 2)
            : "// Response will appear here"}
        </pre>
      </div>
    </div>
  );
};

export default ApiDebugTool;
