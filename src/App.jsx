import { useState } from 'react';
import { ExternalLink, Copy, Check } from 'lucide-react';

function App() {
  const [userId, setUserId] = useState('');
  const [generatedUrl, setGeneratedUrl] = useState('');
  const [copied, setCopied] = useState(false);

  const generateUrl = () => {
    if (userId.trim()) {
      const cleanUserId = userId.trim();
      const url = `https://team.mercor.com/profile/${cleanUserId}`;
      setGeneratedUrl(url);
    }
  };

  const copyToClipboard = async () => {
    if (generatedUrl) {
      await navigator.clipboard.writeText(generatedUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };  

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      generateUrl();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <img src="https://mercor.com/_next/static/media/logo.4e773633.png" alt="Mercor Logo" className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Mercor Profile Access</h1>
          <p className="text-gray-600 text-sm">Enter a user ID to generate a profile link</p>
        </div>

        <div className="space-y-6">
          <div>
            <label htmlFor="userId" className="block text-sm font-medium text-gray-700 mb-2">
              User ID
            </label>
            <input
              id="userId"
              type="text"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="20a71215-ee91-45f7-b2d7-964e6d74678d"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 text-sm font-mono"
            />
            <p className="text-xs text-gray-500 mt-1">
              Enter the UUID without the ?source parameter
            </p>
          </div>

          <button
            onClick={generateUrl}
            disabled={!userId.trim()}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
          >
            Generate Profile Link
            <ExternalLink className="w-4 h-4" />
          </button>

          {generatedUrl && (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg border">
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-gray-700">Generated URL:</label>
                <button
                  onClick={copyToClipboard}
                  className="text-blue-600 hover:text-blue-700 transition-colors duration-200"
                  title="Copy to clipboard"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
              <div className="bg-white p-3 rounded border text-xs font-mono text-gray-800 break-all">
                {generatedUrl}
              </div>
              <div className="mt-3 flex gap-2">
                <a
                  href={generatedUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded-md transition-all duration-200 flex items-center justify-center gap-2"
                >
                  Open Profile
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          )}
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-500 text-center">
            This tool generates links to Mercor team profiles for reviews and feedback.
          </p>
        </div>
      </div>
    </div>
  );
}

export default App
