"use client";

import {
  ShieldCheck,
  Wallet,
  Bitcoin,
  RefreshCw,
  QrCode,
  Users,
} from "lucide-react";

function FeatureCard({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="bg-gray-50 rounded-2xl shadow-md p-6 hover:shadow-xl transition duration-300 border border-gray-200">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

const AboutPage = () => {
  return (
    <main className="min-h-screen bg-white text-gray-800">
      <section className="px-6 py-20 max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold text-center mb-6 bg-gradient-to-r from-[#3F75E0] to-[#7FA7FF] text-transparent bg-clip-text">
          Welcome to UniWall
        </h1>
        <p className="text-center max-w-2xl mx-auto text-lg text-gray-600 mb-12">
          A unified blockchain wallet designed for the future—secure, simple,
          and inclusive. Manage your digital assets across Solana, Ethereum,
          Bitcoin, and Palo from one seamless platform.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard
            title="Multi-Chain Wallets"
            icon={<Wallet className="w-8 h-8 text-[#3F75E0]" />}
            description="Create and manage wallets for Solana, Ethereum, Bitcoin, and Palo all in one place."
          />
          <FeatureCard
            title="Real-Time Balances"
            icon={<RefreshCw className="w-8 h-8 text-[#3F75E0]" />}
            description="Always stay updated with real-time wallet balances."
          />
          <FeatureCard
            title="Send & Receive Easily"
            icon={<QrCode className="w-8 h-8 text-[#3F75E0]" />}
            description="Send or receive crypto instantly via public keys or QR code scanning."
          />
          <FeatureCard
            title="Built-in Swaps"
            icon={<Bitcoin className="w-8 h-8 text-[#3F75E0]" />}
            description="Swap your assets across supported chains without needing external exchanges."
          />
          <FeatureCard
            title="Secure Recovery"
            icon={<ShieldCheck className="w-8 h-8 text-[#3F75E0]" />}
            description="Access your account anytime with a 24-word secret recovery phrase."
          />
          <FeatureCard
            title="Inclusive Design"
            icon={<Users className="w-8 h-8 text-[#3F75E0]" />}
            description="Crafted for everyone—from blockchain beginners to crypto power users."
          />
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-3xl font-semibold text-[#3F75E0] mb-4">
            More Than Just a Wallet
          </h2>
          <p className="text-lg max-w-3xl mx-auto text-gray-600">
            UniWall is more than a crypto wallet—it&apos;s your bridge to the
            decentralized financial world. Built with the latest technologies
            including Next.js, Tailwind CSS, Node.js, and PostgreSQL, UniWall
            offers performance, security, and simplicity for everyone.
          </p>
        </div>
      </section>
    </main>
  );
};

export default AboutPage;
