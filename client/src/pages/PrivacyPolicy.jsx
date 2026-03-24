import React from "react";

const PrivacyPolicy = () => {
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
            Privacy Policy
          </h2>
          <p className="text-sm text-gray-500 mb-6 text-center">
            Last Updated: {new Date().toLocaleDateString()}
          </p>

          <div className="prose prose-green max-w-none">
            <h3 className="text-lg font-medium text-gray-900 mt-4">
              1. Information We Collect
            </h3>
            <p className="text-gray-700 mt-2">
              To provide our contract farming services, we collect:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-700">
              <li>
                Account registration details (name, email, contact information)
              </li>
              <li>Farm/produce details for contract creation</li>
              <li>Transaction and payment information</li>
              <li>Communication records between farmers and buyers</li>
            </ul>

            <h3 className="text-lg font-medium text-gray-900 mt-6">
              2. How We Use Information
            </h3>
            <p className="text-gray-700 mt-2">Your information is used to:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-700">
              <li>Facilitate and secure contract agreements</li>
              <li>Provide personalized farming advisory services</li>
              <li>Process payments and send transaction alerts</li>
              <li>Improve our platform's features and services</li>
            </ul>

            <h3 className="text-lg font-medium text-gray-900 mt-6">
              3. Data Security
            </h3>
            <p className="text-gray-700 mt-2">
              FarmLink employs industry-standard security measures including:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-700">
              <li>AES-256 encryption for sensitive data</li>
              <li>Blockchain technology for contract security</li>
              <li>Regular security audits and updates</li>
            </ul>

            <h3 className="text-lg font-medium text-gray-900 mt-6">
              4. Third-Party Services
            </h3>
            <p className="text-gray-700 mt-2">
              We integrate with trusted partners like payment gateways
              (Razorpay/Paytm) and SMS services (Twilio) to deliver our
              services. These partners have their own privacy policies governing
              data use.
            </p>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-gray-600">
                Contact our Data Protection Officer at
                <a
                  href="mailto:privacy@farmlink.example"
                  className="text-green-600 hover:text-green-500 ml-1"
                >
                  privacy@farmlink.example
                </a>{" "}
                for privacy-related concerns.
              </p>
            </div>
          </div>

          <div className="mt-8 flex justify-between">
            <a
              href="/termsofservice"
              className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              View Terms of Service
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

export default PrivacyPolicy;
