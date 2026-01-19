import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  AlertTriangle,
  Home,
  User,
  Stethoscope,
  Calendar,
  Receipt,
  ArrowLeft,
} from "lucide-react";

const NotFound = ({ setHideNavbarFooter }) => {
  useEffect(() => {
    setHideNavbarFooter(true);
  }, []);
  const [animate, setAnimate] = useState(false);
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    setAnimate(true);

    // Floating medical icons animation
    const icons = [
      { icon: Stethoscope, top: 20, left: 10 },
      { icon: Calendar, top: 60, right: 15 },
      { icon: Receipt, top: 80, left: 80 },
      { icon: User, top: 30, right: 30 },
    ];

    setParticles(icons);
  }, []);

  return (
    <div className="min-h-screen bg-linear-to-br from-(--color-primary)/10 via-white to-(--color-primary-light)/10 overflow-hidden relative">
      {/* Animated Background Particles */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-(--color-primary)/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-linear-to-r from-(--color-primary)/10 to-transparent rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-(--color-primary)/3 rounded-full blur-xl animate-ping" />
      </div>

      {/* Floating Icons */}
      {particles.map((particle, i) => (
        <div
          key={i}
          className="fixed opacity-20 animate-float transition-opacity duration-300 cursor-default select-none"
          style={{
            top: `${particle.top}vh`,
            [particle.left ? "left" : "right"]:
              `${particle.right || particle.left}vw`,
            animationDelay: `${i * 200}ms`,
            animationDuration: `${4 + i}s`,
            "--scroll-rotate": "0deg",
          }}
        >
          <particle.icon className="size-24 lg:size-32 text-(--color-primary) drop-shadow-lg" />
        </div>
      ))}

      <div className="relative z-10 pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main 404 */}
          <div
            className={`mb-12 transform transition-all duration-1000 ${animate ? "translate-y-0 opacity-100 scale-100" : "translate-y-20 opacity-0 scale-95"}`}
          >
            <div className="inline-flex items-center justify-center w-32 h-32 mx-auto mb-8 bg-linear-to-br from-red-400 to-red-500 rounded-3xl shadow-2xl ring-8 ring-red-100/50 drop-shadow-2xl">
              <AlertTriangle className="size-20 text-white drop-shadow-lg animate-pulse" />
            </div>
            <h1 className="text-8xl lg:text-9xl font-black bg-linear-to-r from-(--color-primary) via-red-500 to-(--color-primary-dark) bg-clip-text text-transparent mb-6 tracking-tight drop-shadow-lg">
              404
            </h1>
            <p className="text-2xl lg:text-3xl font-bold text-(--color-text) mb-4">
              Oops! Page Not Found
            </p>
            <p className="text-xl text-(--color-text-muted) max-w-2xl mx-auto leading-relaxed mb-12">
              The page you are looking for might have been removed, had its name
              changed, or is temporarily unavailable. Don't worry, let's get you
              back on track.
            </p>
          </div>

          {/* Bottom CTA */}
          <div
            className={`transform transition-all duration-1000 delay-500 ${animate ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
          >
            <Link
              to="/"
              className="inline-flex items-center gap-3 bg-linear-to-r from-(--color-primary) to-(--color-primary-dark) text-(--color-light-primary-bg) font-bold px-12 py-5 rounded-3xl text-xl shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-500 mx-auto"
            >
              <ArrowLeft className="rotate-180 size-7" />
              Back to Home
            </Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(var(--scroll-rotate));
          }
          50% {
            transform: translateY(-20px) rotate(var(--scroll-rotate));
          }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default NotFound;
