import { motion } from 'framer-motion';
import { DocumentTextIcon } from '@heroicons/react/24/outline';

export const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white/5 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/10"
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="bg-gradient-to-br from-[#0f3460] to-[#16213e] p-3 rounded-xl">
              <DocumentTextIcon className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white">Terms of Service</h1>
          </div>

          <div className="prose prose-invert max-w-none">
            <p className="text-white/80 mb-6">
              Last updated: {new Date().toLocaleDateString()}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">1. Acceptance of Terms</h2>
              <p className="text-white/80">
                By accessing and using WarZone Quest, you accept and agree to be bound by the terms and provision of this agreement.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">2. User Accounts</h2>
              <p className="text-white/80">
                To access certain features of the Service, you may be required to create an account. You are responsible for:
              </p>
              <ul className="list-disc pl-6 text-white/80">
                <li>Maintaining the confidentiality of your account information</li>
                <li>All activities that occur under your account</li>
                <li>Immediately notifying us of any unauthorized use of your account</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">3. User Conduct</h2>
              <p className="text-white/80">
                You agree not to:
              </p>
              <ul className="list-disc pl-6 text-white/80">
                <li>Violate any laws or regulations</li>
                <li>Infringe upon the rights of others</li>
                <li>Interfere with or disrupt the Service</li>
                <li>Attempt to gain unauthorized access to the Service</li>
                <li>Engage in any fraudulent or illegal activities</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">4. Intellectual Property</h2>
              <p className="text-white/80">
                The Service and its original content, features, and functionality are owned by WarZone Quest and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">5. Termination</h2>
              <p className="text-white/80">
                We may terminate or suspend your account and bar access to the Service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of the Terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">6. Contact Us</h2>
              <p className="text-white/80">
                If you have any questions about these Terms, please contact us at:
                <br />
                Email: legal@warzonequest.com
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}; 