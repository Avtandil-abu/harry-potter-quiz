import { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';

const AdminPanel = () => {
    const [results, setResults] = useState([]);

    useEffect(() => {
        const fetchResults = async () => {
            const { data, error } = await supabase
                .from('quiz_results')
                .select('*')
                .order('created_at', { ascending: false });

            if (!error) setResults(data);
        };
        fetchResults();
    }, []);

    return (
        <div className="p-8 bg-slate-900 min-h-screen text-white">
            <h1 className="text-3xl font-bold mb-6 text-yellow-500">Quiz Administration</h1>
            <table className="w-full border-collapse border border-slate-700">
                <thead>
                    <tr className="bg-slate-800">
                        <th className="p-3 border border-slate-700">Name</th>
                        <th className="p-3 border border-slate-700">House</th>
                        <th className="p-3 border border-slate-700">Premium</th>
                        <th className="p-3 border border-slate-700">Date</th>
                    </tr>
                </thead>
                <tbody>
                    {results.map((res) => (
                        <tr key={res.id} className="hover:bg-slate-800/50">
                            <td className="p-3 border border-slate-700">{res.user_name}</td>
                            <td className="p-3 border border-slate-700 font-bold">{res.house_result}</td>
                            <td className="p-3 border border-slate-700">{res.is_premium ? "✅" : "❌"}</td>
                            <td className="p-3 border border-slate-700 text-xs">
                                {new Date(res.created_at).toLocaleString()}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminPanel;