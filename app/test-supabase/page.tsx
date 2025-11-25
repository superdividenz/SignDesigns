'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';

export default function SupabaseTest() {
  const [connectionStatus, setConnectionStatus] = useState<'testing' | 'success' | 'error'>('testing');
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    const testConnection = async () => {
      try {
        // Test basic connection
        const { error } = await supabase.from('profiles').select('count').limit(1).single();

        // If we get a specific error about the table not existing, that's expected
        if (error && error.code === 'PGRST116') {
          setConnectionStatus('success');
          setErrorMessage('Connection successful! Database tables need to be created.');
        } else if (error) {
          setConnectionStatus('error');
          setErrorMessage(`Connection error: ${error.message}`);
        } else {
          setConnectionStatus('success');
        }
      } catch (error) {
        setConnectionStatus('error');
        setErrorMessage(`Connection failed: ${error}`);
      }
    };

    testConnection();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Supabase Connection Test</h1>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Connection Status</h2>

        {connectionStatus === 'testing' && (
          <div className="flex items-center">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500 mr-3"></div>
            <span>Testing connection...</span>
          </div>
        )}

        {connectionStatus === 'success' && (
          <div className="text-green-600 flex items-center">
            <span className="text-2xl mr-2">✅</span>
            <span>Supabase connection successful!</span>
          </div>
        )}

        {connectionStatus === 'error' && (
          <div className="text-red-600">
            <span className="text-2xl mr-2">❌</span>
            <span>{errorMessage}</span>
          </div>
        )}

        {connectionStatus === 'success' && errorMessage.includes('tables need to be created') && (
          <div className="mt-4 p-4 bg-yellow-100 border border-yellow-400 rounded">
            <h3 className="font-semibold text-yellow-800">Next Steps:</h3>
            <ol className="mt-2 text-yellow-700 list-decimal list-inside">
              <li>Go to your Supabase dashboard</li>
              <li>Open the SQL Editor</li>
              <li>Run the SQL from <code className="bg-yellow-200 px-1 rounded">supabase-setup.sql</code></li>
              <li>Refresh this page to verify tables are created</li>
            </ol>
          </div>
        )}
      </div>
    </div>
  );
}