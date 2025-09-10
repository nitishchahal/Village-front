import React from 'react';
import { Link } from 'react-router-dom';
import { isLoggedIn } from '../utils/auth';

// React Icons imports
import { FaUsers, FaLeaf, FaCompass } from 'react-icons/fa';

const Home = () => {
  const loggedIn = isLoggedIn();

  const features = [
    {
      title: 'Community Connection',
      description: 'Connect with locals and other explorers. Share experiences, get tips, and build relationships.',
      icon: FaUsers,
    },
    {
      title: 'Nature Trails',
      description: 'Discover hidden gems and scenic paths. Our maps lead you to the most breathtaking natural spots.',
      icon: FaLeaf,
    },
    {
      title: 'Effortless Discovery',
      description: 'Find new villages and points of interest with our intuitive search and filtering tools.',
      icon: FaCompass,
    },
  ];

  return (
    <main>
      <section className="relative bg-white text-center py-24 sm:py-32 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full">
          <svg className="w-full h-full" viewBox="0 0 1440 320">
            <path fill="#e0f2fe" d="M0,160L48,176C96,192,192,224,288,208C384,192,480,128,576,117.3C672,107,768,150,864,165.3C960,181,1056,165,1152,149.3C1248,133,1344,117,1392,109.3L1440,101.3L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path>
          </svg>
        </div>
        
        <div className="container mx-auto relative z-10 px-4">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-blue-900 leading-tight mb-4 animate-fade-in-down">
            Explore the World, One Village at a Time
          </h1>
          <p className="text-lg sm:text-xl text-gray-700 mb-8 max-w-2xl mx-auto animate-fade-in-up">
            Discover charming local communities, breathtaking nature, and unique cultures with Village Explorer.
          </p>
          {!loggedIn && (
            <Link to="/register" className="modern-button text-lg px-6 py-3 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              Join the Community
            </Link>
          )}
        </div>
      </section>

      <section className="py-20 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-blue-800 mb-12">Why Village Explorer?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-2xl shadow-lg border-2 border-gray-200 transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
              >
                <div className="flex justify-center items-center mb-4">
                  <feature.icon className="w-12 h-12 text-blue-500" />
                </div>
                <h3 className="text-xl font-bold text-center text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-center">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-blue-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-blue-800 mb-12">What Our Community Says</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Testimonials 1,2,3 */}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
