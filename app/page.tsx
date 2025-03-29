"use client";

import { motion } from "framer-motion";
import { Logo } from "@/components/logo";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-white via-slate-50 to-blue-50">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 -left-10 w-40 h-40 bg-cyan-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-40 w-56 h-56 bg-indigo-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        <div className="absolute bottom-40 right-40 w-64 h-64 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-3000"></div>
        <div className="absolute top-1/3 left-1/3 w-48 h-48 bg-teal-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-1000"></div>
      </div>

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-grid-slate-100 bg-[size:20px_20px] opacity-20"></div>

      {/* Main content */}
      <div className="relative flex flex-col items-center pt-20 px-4">
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <Logo />
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8 text-4xl md:text-6xl font-bold bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600 text-transparent bg-clip-text"
          >
            CryptoWallet
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-4 text-gray-600 text-lg max-w-md mx-auto"
          >
            Secure. Simple. Sophisticated.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-12 gap-4 justify-center"
        >
          <Link
            href="/register"
            className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full text-white font-semibold hover:opacity-90 transition-opacity shadow-lg shadow-blue-200"
          >
            Join Us
          </Link>
          <Link
            href="/login"
            className="relative ml-8 px-8 py-3 border-2 border-cyan-500 text-cyan-500 rounded-full font-semibold transition-all duration-300 
             before:absolute before:inset-0 before:bg-gradient-to-r before:from-cyan-500 before:to-blue-500 
             before:opacity-0 hover:before:opacity-100 hover:text-white before:transition-opacity before:duration-300 before:rounded-full"
          >
            Login
          </Link>
        </motion.div>

        {/* Stats section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl w-full"
        >
          {[
            { number: "1.2M+", label: "Active Users" },
            { number: "$4.5B+", label: "Transaction Volume" },
            { number: "150+", label: "Supported Coins" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2 + index * 0.1 }}
              className="bg-white bg-opacity-80 backdrop-blur-sm rounded-xl shadow-lg border border-blue-100 p-6 text-center"
            >
              <h3 className="text-3xl font-bold bg-gradient-to-r from-cyan-500 to-blue-600 text-transparent bg-clip-text">
                {stat.number}
              </h3>
              <p className="text-gray-600 mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Features section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="mt-24 max-w-5xl w-full pb-20"
        >
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Why Choose{" "}
            <span className="bg-gradient-to-r from-cyan-500 to-blue-500 text-transparent bg-clip-text">
              CryptoWallet
            </span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Security First",
                description:
                  "State-of-the-art encryption and multi-factor authentication keep your assets safe.",
              },
              {
                title: "Low Fees",
                description:
                  "Enjoy minimal transaction fees and transparent pricing on all exchanges.",
              },
              {
                title: "Multi-Chain Support",
                description:
                  "Seamlessly manage assets across different blockchain networks in one place.",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5 + index * 0.1 }}
                className="bg-gradient-to-b from-white to-blue-50 rounded-2xl p-6 shadow-lg border border-blue-100 hover:shadow-xl hover:-translate-y-1 transition-all"
              >
                <div className="w-12 h-12 mb-4 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-center text-white">
                  {index + 1}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Add styles for animations */}
      <style jsx global>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-1000 {
          animation-delay: 1s;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-3000 {
          animation-delay: 3s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .bg-grid-slate-100 {
          background-image: linear-gradient(
              to right,
              rgb(241 245 249 / 0.1) 1px,
              transparent 1px
            ),
            linear-gradient(
              to bottom,
              rgb(241 245 249 / 0.1) 1px,
              transparent 1px
            );
        }
      `}</style>
    </div>
  );
}
