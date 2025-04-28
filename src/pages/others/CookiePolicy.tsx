import { motion } from 'framer-motion';
import { CakeIcon } from '@heroicons/react/24/outline';

export const CookiePolicy = () => {
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
              <CakeIcon className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white">Cookie Policy</h1>
          </div>

          <div className="prose prose-invert max-w-none">
            <p className="text-white/80 mb-6">
              Last updated: {new Date().toLocaleDateString()}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">1. What Are Cookies</h2>
              <p className="text-white/80">
                Cookies are small text files that are placed on your computer or mobile device when you visit a website. 
                They are widely used to make websites work more efficiently and provide a better user experience.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">2. How We Use Cookies</h2>
              <p className="text-white/80">
                We use cookies for the following purposes:
              </p>
              <ul className="list-disc pl-6 text-white/80">
                <li>Essential cookies: Required for the website to function properly</li>
                <li>Analytics cookies: Help us understand how visitors interact with our website</li>
                <li>Functionality cookies: Remember your preferences and settings</li>
                <li>Marketing cookies: Used to track visitors across websites</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">3. Types of Cookies We Use</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Essential Cookies</h3>
                  <p className="text-white/80">
                    These cookies are necessary for the website to function and cannot be switched off. They are usually only set in response to actions made by you.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Analytics Cookies</h3>
                  <p className="text-white/80">
                    These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Functionality Cookies</h3>
                  <p className="text-white/80">
                    These cookies allow the website to remember choices you make and provide enhanced, more personal features.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">4. Managing Cookies</h2>
              <p className="text-white/80">
                You can control and/or delete cookies as you wish. You can delete all cookies that are already on your computer and you can set most browsers to prevent them from being placed.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">5. Contact Us</h2>
              <p className="text-white/80">
                If you have any questions about our Cookie Policy, please contact us at:
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