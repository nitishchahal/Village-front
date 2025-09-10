import React from "react";
import { Link } from "react-router-dom";
import { BsPeople, BsLightbulb, BsCodeSlash } from "react-icons/bs";

const About = ({ navigate }) => {
  const principles = [
    {
      title: "Fostering Community",
      description:
        "We believe in the power of connection. Our platform helps villagers share knowledge, resources, and support to build stronger communities.",
      icon: BsPeople,
    },
    {
      title: "Empowering Villagers",
      description:
        "By providing a platform for communication and collaboration, we empower residents to take an active role in their village’s development.",
      icon: BsLightbulb,
    },
    {
      title: "Leveraging Technology",
      description:
        "We use modern technology to create simple, accessible, and powerful tools that make community management and collaboration effortless.",
      icon: BsCodeSlash,
    },
  ];

  return (
    <div className="p-6 md:p-12 bg-gray-50">
      <div className="container mx-auto">
        {/* Header */}
        <header className="text-center py-12 md:py-16">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-blue-900 leading-tight mb-4 animate-fade-in-down">
            Our Mission at Village Explorer
          </h1>
          <p className="text-lg sm:text-xl text-gray-700 max-w-3xl mx-auto animate-fade-in-up">
            Village Explorer is more than just a platform; it's a movement to bring
            rural communities together and empower them through technology.
          </p>
        </header>

        {/* Principles */}
        <section className="bg-white rounded-3xl shadow-2xl p-6 md:p-12 mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-blue-800 text-center mb-8">
            What We Do
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {principles.map((principle, index) => (
              <div
                key={index}
                className="bg-gray-50 p-6 rounded-xl shadow-lg border border-gray-200 transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
              >
                <div className="flex justify-center items-center mb-4">
                  <principle.icon className="w-12 h-12 text-blue-500" />
                </div>
                <h3 className="text-xl font-bold text-center text-gray-900 mb-2">
                  {principle.title}
                </h3>
                <p className="text-gray-600 text-center">{principle.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Vision Section */}
        <section className="py-12 md:py-16 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-blue-800 mb-6">
            Our Vision
          </h2>
          <p className="text-lg sm:text-xl text-gray-700 max-w-4xl mx-auto mb-8">
            Our goal is to be the central hub for every village, simplifying communication,
            improving coordination, and fostering a sense of shared purpose. We are building
            the future of rural communities, one connection at a time.
          </p>
          <Link
            onClick={() => navigate("contact")}
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors duration-300"
          >
            Get in Touch
          </Link>
        </section>
      </div>
    </div>
  );
};

export default About;
