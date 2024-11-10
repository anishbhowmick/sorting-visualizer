import React from 'react';
import { Github } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-8 py-6 px-4 border-t border-gray-200">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="text-gray-600 text-sm">
          © {new Date().getFullYear()} Anish Bhowmick. All rights reserved.
        </p>
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/anishbhowmick"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            <Github className="w-5 h-5" />
          </a>
        </div>
      </div>
    </footer>
  );
};