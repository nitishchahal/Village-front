import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white p-6 mt-10 text-center">
      <p>© {new Date().getFullYear()} Village Enquiry. All rights reserved.</p>
    </footer>
  );
}
