import { motion } from 'framer-motion';
import { ShieldCheckIcon } from '@heroicons/react/24/outline';

export const PrivacyPolicy = () => {
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
              <ShieldCheckIcon className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white">Privacy Policy</h1>
          </div>

          <div className="prose prose-invert max-w-none">
            <p className="text-white/80 mb-6">
              Last updated: {new Date().toLocaleDateString()}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">1. Introduction</h2>
              <p className="text-white/80">
                Welcome to WarZone Quest. We respect your privacy and are committed to protecting your personal data. 
                This privacy policy will inform you about how we look after your personal data when you visit our website 
                and tell you about your privacy rights and how the law protects you.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">2. Information We Collect</h2>
              <p className="text-white/80">
                We may collect, use, store and transfer different kinds of personal data about you, including:
              </p>
              <ul className="list-disc pl-6 text-white/80">
                <li>Identity Data (name, username)</li>
                <li>Contact Data (email address)</li>
                <li>Technical Data (IP address, browser type)</li>
                <li>Usage Data (how you use our website)</li>
                <li>Marketing and Communications Data</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">3. How We Use Your Data</h2>
              <p className="text-white/80">
                We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
              </p>
              <ul className="list-disc pl-6 text-white/80">
                <li>To provide and maintain our service</li>
                <li>To notify you about changes to our service</li>
                <li>To provide customer support</li>
                <li>To gather analysis or valuable information</li>
                <li>To monitor the usage of our service</li>
                <li>To detect, prevent and address technical issues</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">4. Data Security</h2>
              <p className="text-white/80">
                We have put in place appropriate security measures to prevent your personal data from being accidentally lost, 
                used, or accessed in an unauthorized way, altered, or disclosed.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">5. Your Legal Rights</h2>
              <p className="text-white/80">
                Under certain circumstances, you have rights under data protection laws in relation to your personal data, 
                including the right to:
              </p>
              <ul className="list-disc pl-6 text-white/80">
                <li>Request access to your personal data</li>
                <li>Request correction of your personal data</li>
                <li>Request erasure of your personal data</li>
                <li>Object to processing of your personal data</li>
                <li>Request restriction of processing your personal data</li>
                <li>Request transfer of your personal data</li>
                <li>Right to withdraw consent</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">6. Contact Us</h2>
              <p className="text-white/80">
                If you have any questions about this Privacy Policy, please contact us at:
                <br />
                Email: privacy@warzonequest.com
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}; 