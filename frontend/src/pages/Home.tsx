import { Link } from 'react-router-dom';
import { GraduationCap, Users, Building2, BookOpen } from 'lucide-react';

const stats = [
  { name: 'Universities', value: '500+', icon: Building2 },
  { name: 'Students', value: '50k+', icon: Users },
  { name: 'Courses', value: '1000+', icon: BookOpen },
  { name: 'Graduates', value: '100k+', icon: GraduationCap },
];

export function Home() {
  return (
    <div className="relative">
      {/* Hero Section */}
      <div className="relative bg-indigo-600">
        <div className="absolute inset-0">
          <img
            className="w-full h-full object-cover"
            src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
            alt="University campus"
          />
          <div className="absolute inset-0 bg-indigo-600 mix-blend-multiply" />
        </div>
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Welcome to UniManager
          </h1>
          <p className="mt-6 text-xl text-indigo-100 max-w-3xl">
            Discover and manage universities worldwide. Your one-stop solution for university
            information and administration.
          </p>
          <div className="mt-10 flex space-x-4">
            <Link
              to="/universities"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50"
            >
              Browse Universities
            </Link>
            <Link
              to="/admin/universities"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-600"
            >
              Admin Portal
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.name}
                  className="relative bg-white pt-5 px-4 pb-12 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden"
                >
                  <dt>
                    <div className="absolute bg-indigo-500 rounded-md p-3">
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <p className="ml-16 text-sm font-medium text-gray-500 truncate">
                      {stat.name}
                    </p>
                  </dt>
                  <dd className="ml-16 pb-6 flex items-baseline sm:pb-7">
                    <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                  </dd>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}