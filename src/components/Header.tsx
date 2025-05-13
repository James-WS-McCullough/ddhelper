import { useState } from 'react';
import { Menu } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';

const menuItems = [
  { id: 'sounds', label: 'Sound & Images' },
  { id: 'initiative', label: 'Initiative Tracker' },
  { id: 'players', label: 'Player Config' },
  { id: 'monsters', label: 'Monster Designer' },
  { id: 'death', label: 'Death Throw Display' },
  { id: 'setup', label: 'Setup' }
];

export default function Header({ activeSection, onSectionChange }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-app-sidebar h-16 flex items-center justify-between px-6 border-b border-gray-700">
      <div className="flex items-center gap-3">
        <img src="/d20icon.svg" alt="D20" className="w-8 h-8" />
        <h1 className="text-xl font-semibold">DM Screen Pro</h1>
      </div>
      
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-4 py-2 rounded-md bg-app-card hover:bg-gray-700 transition-colors"
        >
          {menuItems.find(item => item.id === activeSection)?.label}
          <ChevronDownIcon />
        </button>
        
        {isOpen && (
          <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-app-card ring-1 ring-black ring-opacity-5">
            <div className="py-1" role="menu" aria-orientation="vertical">
              {menuItems.map(item => (
                <button
                  key={item.id}
                  className={`block w-full text-left px-4 py-2 text-sm ${
                    activeSection === item.id ? 'bg-gray-700' : 'hover:bg-gray-700'
                  }`}
                  onClick={() => {
                    onSectionChange(item.id);
                    setIsOpen(false);
                  }}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}