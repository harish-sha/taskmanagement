// Updated: API Debug Tool with full feature set as requested
import { useState, useRef } from "react";
import { Checkbox } from "primereact/checkbox";
import { MdOutlineDeleteForever } from "react-icons/md";
import { Box } from "@mui/material";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { AiFillApi } from "react-icons/ai";
import RocketLaunchOutlinedIcon from "@mui/icons-material/RocketLaunchOutlined";
import { VscJson } from "react-icons/vsc";
import { FaHistory } from "react-icons/fa";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 1 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const ApiDebugTool = () => {
  const [method, setMethod] = useState("GET");
  const [endpoint, setEndpoint] = useState("");
  const [authToken, setAuthToken] = useState("");
  const [value, setValue] = useState(0);
  const [headers, setHeaders] = useState([{ key: "", value: "", type: "text", enabled: true }]);
  const [params, setParams] = useState([{ key: "", value: "", type: "text", enabled: true }]);
  const [body, setBody] = useState("");
  const [response, setResponse] = useState(null);
  const [status, setStatus] = useState(null);
  const [responseTime, setResponseTime] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  const abortControllerRef = useRef(null);

  const handleChange = (event, newValue) => setValue(newValue);

  const handleChangeField = (setState, index, field, value) => {
    setState(prev => {
      const updated = [...prev];
      updated[index][field] = value;
      return updated;
    });
  };

  const addField = (setState) => setState(prev => [...prev, { key: "", value: "", type: "text", enabled: true }]);
  const deleteField = (setState, index) => setState(prev => prev.filter((_, i) => i !== index));
  const toggleEnabled = (setState, index) => setState(prev => prev.map((f, i) => i === index ? { ...f, enabled: !f.enabled } : f));

  const buildUrlWithParams = () => {
    const url = new URL(endpoint);
    params.filter(p => p.enabled && p.key).forEach(p => url.searchParams.append(p.key, p.value));
    return url.toString();
  };

  const handleRequest = async () => {
    if (loading && abortControllerRef.current) {
      abortControllerRef.current.abort();
      setLoading(false);
      return;
    }

    setLoading(true);
    setStatus(null);
    setResponse(null);
    const controller = new AbortController();
    abortControllerRef.current = controller;

    try {
      const url = buildUrlWithParams();
      const config = { method, headers: {}, signal: controller.signal };
      const formData = new FormData();
      let isFormData = false;

      headers.filter(h => h.enabled && h.key).forEach(({ key, value, type }) => {
        if (type === "file" && value instanceof File) {
          formData.append(key, value);
          isFormData = true;
        } else {
          config.headers[key] = value;
        }
      });

      if (authToken) config.headers["Authorization"] = `Bearer ${authToken}`;

      if (method !== "GET" && method !== "HEAD") {
        config.body = isFormData ? formData : JSON.stringify(JSON.parse(body));
        if (!isFormData) config.headers["Content-Type"] = "application/json";
      }

      const start = performance.now();
      const res = await fetch(url, config);
      const duration = performance.now() - start;
      const data = await res.json();

      setStatus(`${res.status} ${res.statusText}`);
      setResponseTime(`${Math.round(duration)} ms`);
      setResponse(data);
      setHistory(prev => [{ method, endpoint: url, date: new Date().toLocaleString() }, ...prev.slice(0, 4)]);
    } catch (err) {
      setStatus("Request Failed");
      setResponse({ error: err.message });
    }

    setLoading(false);
  };

  const formatBody = () => {
    try {
      const formatted = JSON.stringify(JSON.parse(body), null, 2);
      setBody(formatted);
    } catch {
      alert("Invalid JSON");
    }
  };

  return (
    <div className="bg-gradient-to-tr from-sky-50 to-white border border-gray-200 shadow-md rounded-lg p-6 w-full">
      <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
        <AiFillApi /> API Debugger
      </h3>

      <div className="flex items-center gap-3 mb-4">
        <div className="flex w-full">
          <select
            value={method}
            onChange={(e) => setMethod(e.target.value)}
            className="border p-2 rounded-l-lg text-sm border-gray-400 focus:outline-none cursor-pointer"
          >
            {["GET", "POST", "PUT", "PATCH", "DELETE", "HEAD", "OPTIONS"].map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
          <input
            value={endpoint}
            onChange={(e) => setEndpoint(e.target.value)}
            placeholder="https://api.example.com/data"
            className="w-full border p-2 rounded-r-lg text-sm border-gray-400 focus:outline-none"
          />
        </div>
        <button
          onClick={handleRequest}
          className={`px-4 py-2 rounded-md shadow ${loading ? "bg-gray-400 text-white" : "bg-orange-200 text-black hover:bg-orange-400 hover:text-white"}`}
        >
          {loading ? "Cancel" : <><RocketLaunchOutlinedIcon fontSize="small" /> Send</>}
        </button>
      </div>

      <div className="flex items-center gap-3 mb-3">
        <label className="flex gap-1 w-35 items-center text-md font-medium">Bearer Token</label>
        <input
          value={authToken}
          onChange={(e) => setAuthToken(e.target.value)}
          placeholder="Authorization Token (optional)"
          className="w-full border p-2 rounded text-sm border-gray-400 focus:outline-none"
        />
      </div>

      <Box sx={{ width: "100%" }}>
        <Tabs value={value} onChange={handleChange} textColor="primary" indicatorColor="primary">
          <Tab label={<span className="flex gap-2 items-center">Params</span>} {...a11yProps(0)} />
          <Tab label={<span>Headers</span>} {...a11yProps(1)} />
        </Tabs>

        <CustomTabPanel value={value} index={0}>
          <FieldEditor fields={params} setFields={setParams} title="Params" />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <FieldEditor fields={headers} setFields={setHeaders} title="Headers" />
        </CustomTabPanel>
      </Box>

      <div className="flex items-center justify-between mt-2 mb-3">
        <label className="block text-sm font-medium">Request Body (JSON)</label>
        <button onClick={formatBody} className="text-xs text-purple-600 hover:bg-gray-300 px-2 py-1 rounded-md">Format JSON</button>
      </div>
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder={"{\n  \" key\": \"value\"\n}"}
        className="w-full border p-2 text-sm rounded mb-2 h-40 overflow-auto bg-orange-50 border-gray-400 focus:outline-none"
      />

      {history.length > 0 && (
        <div className="mb-4">
          <label className="flex items-center gap-2 text-sm font-medium mb-1">
            <FaHistory /> Request History:
          </label>
          <ul className="text-xs text-gray-600 space-y-1">
            {history.map((h, i) => (
              <li key={i}>• [{h.date}] {h.method} {h.endpoint}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="border border-gray-300 mb-2"></div>

      <div>
        <div className="flex items-center justify-between mb-2 pr-4">
          <div className="flex items-center">
            <h4 className="font-semibold text-gray-700">Response Body</h4>
            <label><VscJson /></label>
          </div>
          <div className="flex items-center gap-2">
            {status && <div className="font-semibold text-xs bg-green-300 rounded-xl text-green-700 px-2 py-1">{status}</div>}
            {responseTime && <div className="font-semibold text-xs text-gray-600 px-2 border-l-2">{responseTime}</div>}
          </div>
        </div>
        <pre className="bg-gray-900 text-green-200 p-4 rounded-md text-xs h-72 overflow-auto">
          {response ? JSON.stringify(response, null, 2) : "// Response will appear here"}
        </pre>
      </div>
    </div>
  );
};

const FieldEditor = ({ fields, setFields, title }) => (
  <div className="mb-4">
    <div className="flex items-center justify-between mb-3">
      <label className="block text-md font-medium">{title}</label>
      <button
        onClick={() => setFields(prev => [...prev, { key: "", value: "", type: "text", enabled: true }])}
        className="text-sm text-green-500 bg-gray-900 px-2 py-2 rounded-md"
      >
        + Add {title}
      </button>
    </div>
    {fields.map((f, i) => (
      <div key={i} className="flex gap-2 mb-2 items-center">
        <Checkbox inputId={`cb-${title}-${i}`} onChange={() => toggleEnabled(setFields, i)} checked={f.enabled} />
        <input
          placeholder="Key"
          className="border p-2 rounded text-sm border-gray-400 w-1/4"
          value={f.key}
          onChange={(e) => handleChangeField(setFields, i, "key", e.target.value)}
        />
        {f.type === "file" ? (
          <input
            type="file"
            className="border p-2 rounded text-sm w-1/4"
            onChange={(e) => handleChangeField(setFields, i, "value", e.target.files[0])}
          />
        ) : (
          <input
            placeholder="Value"
            className="border p-2 rounded text-sm border-gray-400 w-1/4"
            value={f.value}
            onChange={(e) => handleChangeField(setFields, i, "value", e.target.value)}
          />
        )}
        <select
          value={f.type}
          onChange={(e) => handleChangeField(setFields, i, "type", e.target.value)}
          className="border p-2 rounded text-sm w-20 border-gray-400"
        >
          <option value="text">Text</option>
          <option value="file">File</option>
        </select>
        <button onClick={() => deleteField(setFields, i)} className="rounded-2xl p-1.5 hover:bg-gray-200">
          <MdOutlineDeleteForever className="text-red-500 hover:text-red-600" size={20} />
        </button>
      </div>
    ))}
  </div>
);

export default ApiDebugTool;
