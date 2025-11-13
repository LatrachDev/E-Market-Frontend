import { useEffect, useState } from "react";
import api from "../../config/api"

export default function Logs() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await api.get("/logs");
        // console.log(response);
        setLogs(response.data.logs);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, []);

  if (loading) return <p>Chargement des logs...</p>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-semibold mb-4">Logs système</h1>
      <div className="bg-white p-4 rounded-lg shadow max-h-[600px] overflow-y-auto">
        {logs.length === 0 ? (
          <p>Aucun log trouvé</p>
        ) : (
          logs.map((line, index) => (
            <pre key={index} className={`text-sm ${line.includes('error') ? 'text-red-600' : 'text-gray-800'}`}>
              {line}
            </pre>
          ))
        )}
      </div>
    </div>
  );
}
