import React from "react";

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-green-600">FarmLink</h1>
          <p className="mt-2 text-lg text-green-500">
            Assured Contract Farming System
          </p>
        </div>

        <div className="bg-white shadow sm:rounded-lg p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Terms of Service
          </h2>
          <p className="text-sm text-gray-500 mb-6 text-center">
            Last Updated: {new Date().toLocaleDateString()}
          </p>

          <div className="prose prose-green max-w-none">
            <h3 className="text-lg font-medium text-gray-900 mt-4">
              1. Acceptance of Terms
            </h3>
            <p className="text-gray-700 mt-2">
              By accessing or using FarmLink ("the Service"), you agree to be
              bound by these Terms of Service. FarmLink is a digital platform
              designed to facilitate transparent contract farming between
              farmers and buyers.
            </p>

            <h3 className="text-lg font-medium text-gray-900 mt-6">
              2. Description of Service
            </h3>
            <p className="text-gray-700 mt-2">
              FarmLink provides a blockchain-based platform connecting farmers
              and buyers to create secure, tamper-proof contracts with features
              like automated reminders, payment tracking, and advisory services.
            </p>

            <h3 className="text-lg font-medium text-gray-900 mt-6">
              3. User Responsibilities
            </h3>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-700">
              <li>
                Provide accurate information about your farming produce or
                business requirements
              </li>
              <li>Maintain confidentiality of your account credentials</li>
              <li>
                Use the platform only for legitimate agricultural contracts
              </li>
              <li>
                Comply with all agreed contract terms and payment schedules
              </li>
            </ul>

            <h3 className="text-lg font-medium text-gray-900 mt-6">
              4. Contract Management
            </h3>
            <p className="text-gray-700 mt-2">
              FarmLink facilitates contract creation but is not responsible for
              contract execution. All disputes between parties must be resolved
              according to the terms specified in each contract.
            </p>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-gray-600">
                For questions regarding these Terms, contact us at
                <a
                  href="mailto:legal@farmlink.example"
                  className="text-green-600 hover:text-green-500 ml-1"
                >
                  legal@farmlink.example
                </a>
                .
              </p>
            </div>
          </div>

          <div className="mt-8 flex justify-between">
            <a
              href="/privacypolicy"
              className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              View Privacy Policy
            </a>
            <a
              href="/register"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700"
            >
              Back to Registration
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
