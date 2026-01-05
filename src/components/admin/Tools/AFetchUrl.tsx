'use client';

import React, { useState, useCallback } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import ABackButton from './ABackButton';

const methodColors: any = {
  GET: 'bg-emerald-600 hover:bg-emerald-500',
  POST: 'bg-blue-600 hover:bg-blue-500',
  PUT: 'bg-amber-600 hover:bg-amber-500',
  DELETE: 'bg-red-600 hover:bg-red-500',
  PATCH: 'bg-purple-600 hover:bg-purple-500',
  HEAD: 'bg-pink-600 hover:bg-pink-500',
};

const AFetchUrl = () => {
  const [state, setState] = useState({
    url: '',
    method: 'GET',
    headers: '',
    body: '',
    response: '',
    error: '',
    loading: false,
    responseHeaders: {},
    responseStatus: null,
    responseUrl: ''
  });

  const updateState = useCallback((newState: any) => {
    setState(prev => ({ ...prev, ...newState }));
  }, []);

  const copyToClipboard = useCallback((text: string) => {
    navigator.clipboard.writeText(text);
  }, []);

  const fetchData = useCallback(async () => {
    try {
      updateState({
        error: '',
        response: '',
        responseHeaders: {},
        responseStatus: null,
        responseUrl: '',
        loading: true
      });

      const parsedHeaders = state.headers ? JSON.parse(state.headers) : {};

      const res = await fetch('/api/admin/tools/fetch-url', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url: state.url,
          method: state.method,
          headers: parsedHeaders,
          body: state.body,
        }),
      });

      const data = await res.json();

      if (data.error) {
        updateState({ error: data.error, loading: false });
        return;
      }

      updateState({
        responseHeaders: data.headers || {},
        responseStatus: data.status,
        responseUrl: data.finalUrl || state.url,
        response: data.contentType?.includes('application/json')
          ? JSON.stringify(JSON.parse(data.body), null, 2)
          : data.body,
        loading: false
      });
    } catch (err: any) {
      updateState({ error: err.message, loading: false });
    }
  }, [state.url, state.method, state.headers, state.body, updateState]);

  const getStatusColor = useCallback((status: number | null) => {
    if (!status) return 'bg-neutral-600';
    if (status >= 200 && status < 300) return 'bg-emerald-600';
    if (status >= 300 && status < 400) return 'bg-blue-600';
    if (status >= 400 && status < 500) return 'bg-amber-600';
    return 'bg-red-600';
  }, []);

  const insertExample = useCallback((type: 'headers' | 'body') => {
    if (type === 'headers') {
      updateState({ headers: '{\n  "Content-Type": "application/json",\n  "Authorization": "Bearer token"\n}' });
    } else {
      updateState({ body: '{\n  "key": "value",\n  "array": [1, 2, 3]\n}' });
    }
  }, [updateState]);

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-6">
      <ABackButton />
      {/* Request Card */}
      <div className="bg-neutral-900 rounded-xl border border-neutral-800 overflow-hidden">
        <div className="p-5 border-b border-neutral-800">
          <h2 className="text-xl font-semibold text-white">API Request</h2>
        </div>
        
        <div className="p-5 space-y-5">
          {/* URL Input */}
          <div className="flex flex-col space-y-2">
            <label className="text-sm font-medium text-neutral-400">Request URL</label>
            <div className="flex flex-col md:flex-row gap-2 w-full">
              {/* Method Select */}
              <div className="relative md:w-40 w-full">
                <select
                  value={state.method}
                  onChange={(e) => updateState({ method: e.target.value })}
                  className={`appearance-none w-full px-4 py-3 pr-8 border-r border-neutral-700 bg-neutral-800 text-white focus:outline-none ${methodColors[state.method]} rounded-lg transition-colors`}
                >
                  {Object.keys(methodColors).map((m) => (
                    <option key={m} value={m} className="bg-neutral-800">
                      {m}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-white">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              {/* URL Input */}
              <input
                placeholder="https://api.example.com/v1/resource"
                value={state.url}
                onChange={(e) => updateState({ url: e.target.value })}
                className="flex-1 w-full px-4 py-3 bg-neutral-800 text-white border border-neutral-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
              />

              {/* Send Button */}
              <button
                onClick={fetchData}
                disabled={state.loading || !state.url}
                className={`w-full md:w-auto px-6 py-3 text-white cursor-pointer font-medium rounded-lg disabled:opacity-50 transition-all ${methodColors[state.method]} flex items-center justify-center`}
              >
                {state.loading ? (
                  <>
                    <svg className="animate-spin h-4 w-4 mr-2 text-white" fill="none" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5 0 0 5 0 12h4z" />
                    </svg>
                    Sending...
                  </>
                ) : (
                  "Send Request"
                )}
              </button>
            </div>
          </div>

          {/* Headers */}
          <div className="flex flex-col space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium text-neutral-400">Headers</label>
              <button 
                onClick={() => insertExample('headers')}
                className="text-xs px-2 py-1 bg-neutral-800 text-neutral-300 rounded hover:bg-neutral-700 transition-colors"
              >
                Insert Example
              </button>
            </div>
            <textarea
              placeholder='{\n  "Content-Type": "application/json",\n  "Authorization": "Bearer your_token_here"\n}'
              value={state.headers}
              onChange={(e) => updateState({ headers: e.target.value })}
              className="w-full px-4 py-3 rounded-lg bg-neutral-800 text-neutral-200 font-mono text-sm border border-neutral-700 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
              rows={5}
            />
          </div>

          {/* Body */}
          {(state.method !== 'GET' && state.method !== 'HEAD') && (
            <div className="flex flex-col space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium text-neutral-400">Request Body</label>
                {state.method === 'POST' && (
                  <button 
                    onClick={() => insertExample('body')}
                    className="text-xs px-2 py-1 bg-neutral-800 text-neutral-300 rounded hover:bg-neutral-700 transition-colors"
                  >
                    Insert Example
                  </button>
                )}
              </div>
              <textarea
                placeholder={state.method === 'POST' ? '{\n  "key": "value"\n}' : 'Enter request body content'}
                value={state.body}
                onChange={(e) => updateState({ body: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-neutral-800 text-neutral-200 font-mono text-sm border border-neutral-700 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
                rows={8}
              />
            </div>
          )}
        </div>
      </div>

      {/* Error Section */}
      {state.error && (
        <div className="bg-red-900/30 border border-red-800 rounded-xl p-5">
          <div className="flex items-center text-red-400">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <h3 className="font-medium">Request Failed</h3>
          </div>
          <p className="mt-2 text-red-300 text-sm">
            {state.error.includes('CORS')
              ? 'Cross-Origin Request Blocked: The server does not allow requests from this domain.'
              : state.error.includes('Failed to fetch')
              ? 'Network Error: Could not connect to the server. Check the URL and your internet connection.'
              : state.error}
          </p>
        </div>
      )}

      {/* Response Sections */}
      {(state.response || state.responseHeaders) && (
        <>
          {/* Headers Section */}
          {Object.keys(state.responseHeaders).length > 0 && (
            <div className="bg-neutral-900 rounded-xl border border-neutral-800 overflow-hidden">
              <div className="flex justify-between items-center p-4 bg-neutral-800 border-b border-neutral-700">
                <h3 className="text-sm font-medium text-neutral-300">Response Headers</h3>
                <button
                  onClick={() => copyToClipboard(JSON.stringify(state.responseHeaders, null, 2))}
                  className="text-xs px-3 py-1 bg-neutral-800 text-neutral-300 rounded hover:bg-neutral-700 flex items-center transition-colors"
                >
                  <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path>
                  </svg>
                  Copy
                </button>
              </div>
              <SyntaxHighlighter 
                language="json" 
                style={oneDark} 
                customStyle={{ 
                  margin: 0,
                  borderRadius: 0,
                  padding: '1rem',
                  background: '#1a1a1a',
                  fontSize: '0.875rem',
                  maxHeight: '300px',
                  overflow: 'auto'
                }}
              >
                {JSON.stringify(state.responseHeaders, null, 2)}
              </SyntaxHighlighter>
            </div>
          )}

          {/* Body Section */}
          {state.response && (
            <div className="bg-neutral-900 rounded-xl border border-neutral-800 overflow-hidden">
              <div className="flex justify-between items-center p-4 bg-neutral-800 border-b border-neutral-700">
                <div className="flex items-center space-x-2">
                  <h3 className="text-sm font-medium text-neutral-300">Response Body</h3>
                  <span className={`text-xs px-2 py-1 rounded ${getStatusColor(state.responseStatus)}`}>
                    {state.responseStatus}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="text-xs text-neutral-400 truncate max-w-xs">
                    {state.responseUrl}
                  </div>
                  <button
                    onClick={() => copyToClipboard(state.response)}
                    className="text-xs px-3 py-1 bg-neutral-800 text-neutral-300 rounded hover:bg-neutral-700 flex items-center transition-colors"
                  >
                    <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path>
                    </svg>
                    Copy
                  </button>
                </div>
              </div>
              <SyntaxHighlighter 
                language={state.response?.startsWith('{') ? 'json' : 'html'} 
                style={oneDark} 
                customStyle={{ 
                  margin: 0,
                  borderRadius: 0,
                  padding: '1rem',
                  background: '#1a1a1a',
                  maxHeight: '500px',
                  overflow: 'auto',
                  fontSize: '0.875rem'
                }}
              >
                {state.response}
              </SyntaxHighlighter>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AFetchUrl;