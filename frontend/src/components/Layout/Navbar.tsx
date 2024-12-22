import { Link } from 'react-router-dom';
import { Menu } from '@headlessui/react';
import { School, User } from 'lucide-react';
import { useAuth } from '../../context/useAuth';  

export function Navbar() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex items-center">
              <School className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">UniManager</span>
            </Link>
          </div>

          <div className="hidden sm:ml-6 sm:flex sm:items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-indigo-600">
              Home
            </Link>
            <Link to="/universities" className="text-gray-700 hover:text-indigo-600">
              Universities
            </Link>
            {isAuthenticated && (
              <Link to="/admin/universities" className="text-gray-700 hover:text-indigo-600">
                Admin
              </Link>
            )}
          </div>

          <div className="flex items-center">
            <Menu as="div" className="relative ml-3">
              <Menu.Button className="flex rounded-full text-sm focus:outline-none">
                <User className="h-8 w-8 text-gray-600" />
              </Menu.Button>
              <Menu.Items className="absolute right-0 top-[calc(100%+0.5rem)] w-48 rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 z-50">
                {isAuthenticated ? (
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={logout}
                        className={`${
                          active ? 'bg-gray-100' : ''
                        } block px-4 py-2 text-sm text-gray-700 w-full text-left`}
                      >
                        Sign out
                      </button>
                    )}
                  </Menu.Item>
                ) : (
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        to="/login"
                        className={`${
                          active ? 'bg-gray-100' : ''
                        } block px-4 py-2 text-sm text-gray-700`}
                      >
                        Sign in
                      </Link>
                    )}
                  </Menu.Item>
                )}
              </Menu.Items>
            </Menu>
          </div>
        </div>
      </div>
    </nav>
  );
}