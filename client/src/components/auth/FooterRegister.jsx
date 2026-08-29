import React from "react";

export default function FooterRegister() {
  return (
    <footer
      className="
      bg-gray-50
      border-t
      py-10
      px-6
      "
    >
      <div
        className="
      max-w-7xl
      mx-auto
      "
      >
        <div
          className="
      grid
      md:grid-cols-4
      gap-8
      mb-8
      "
        >
          {/* Brand */}

          <div className="md:col-span-2">
            <h2
              className="
      text-2xl
      font-bold
      text-purple-700
      mb-3
      "
            >
              EliteLancer
            </h2>

            <p
              className="
      text-gray-500
      max-w-md
      "
            >
              Connecting specialized professionals with high-tier opportunities
              in a secure, streamlined ecosystem.
            </p>
          </div>

          {/* Resources */}

          <div>
            <h3
              className="
      font-semibold
      mb-3
      "
            >
              Resources
            </h3>

            <ul
              className="
      space-y-2
      text-gray-500
      text-sm
      "
            >
              <li>Blog</li>

              <li>Guides</li>

              <li>Podcast</li>
            </ul>
          </div>

          {/* Company */}

          <div>
            <h3
              className="
      font-semibold
      mb-3
      "
            >
              Company
            </h3>

            <ul
              className="
      space-y-2
      text-gray-500
      text-sm
      "
            >
              <li>About</li>

              <li>Careers</li>

              <li>Contact</li>
            </ul>
          </div>
        </div>

        <div
          className="
      border-t
      pt-5
      flex
      flex-col
      md:flex-row
      justify-between
      items-center
      gap-4
      "
        >
          <p
            className="
      text-sm
      text-gray-500
      "
          >
            © 2024 EliteLancer Global. All rights reserved.
          </p>

          <div
            className="
      flex
      gap-5
      text-gray-500
      "
          >
            <span>🌐</span>

            <span>✉️</span>

            <span>@</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
