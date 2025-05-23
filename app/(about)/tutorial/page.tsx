"use client";

import Image from "next/image";

const steps = [
  {
    title: "Step 1: Open the website and click on Signup button",
    image: "/images/step1.png",
    phrase:
      "Your journey into Web3 begins with a single click. Let’s get you started!",
  },
  {
    title: "Step 2: Enter the username and password",
    image: "/images/step2.png",
    phrase:
      "Secure your gateway—choose a username and password you’ll remember.",
  },
  {
    title: "Step 3: Copy the recovery code and save it somewhere",
    image: "/images/step3.png",
    phrase:
      "This is your lifeline—store your 24-word secret phrase in a safe place.",
  },
  {
    title: "Step 4: Select cryptos for the wallet",
    image: "/images/step4.png",
    phrase: "Choose your cryptos—Solana, Ethereum, Bitcoin, and Palo.",
  },
  {
    title: "Step 5: Selected crypto keys will be shown",
    image: "/images/step5.png",
    phrase:
      "Here are your crypto wallet keys—your digital vaults are now ready.",
  },
  {
    title: "Step 6: Welcome to dashboard — send, receive, swap & buy crypto",
    image: "/images/step6.png",
    phrase:
      "You’ve arrived. Welcome to your control center—trade, manage, and explore.",
  },
];

export default function TutorialPage() {
  return (
    <main className="min-h-screen bg-white text-gray-800 py-16 px-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12 text-[#3F75E0]">
          How to Create a Wallet in UniWall
        </h1>

        <div className="space-y-12">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-gray-50 border border-gray-200 rounded-xl shadow-sm p-6 md:flex md:items-center md:space-x-8 transition duration-300 hover:shadow-lg"
            >
              <div className="md:w-1/2 mb-4 md:mb-0">
                <Image
                  src={step.image}
                  alt={step.title}
                  width={500}
                  height={300}
                  className="rounded-lg object-cover"
                />
              </div>
              <div className="md:w-1/2">
                <h2 className="text-2xl font-semibold text-[#3F75E0] mb-2">
                  {step.title}
                </h2>
                <p className="text-gray-600 text-base">{step.phrase}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
