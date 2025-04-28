import { motion } from 'framer-motion';
import { ShieldCheckIcon } from '@heroicons/react/24/outline';

export const Compliance = () => {
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
            <h1 className="text-3xl font-bold text-white">Compliance</h1>
          </div>

          <div className="prose prose-invert max-w-none">
            <p className="text-white/80 mb-6">
              Last updated: {new Date().toLocaleDateString()}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">1. GDPR Compliance</h2>
              <p className="text-white/80">
                WarZone Quest is committed to ensuring the security and protection of the personal information that we process, 
                and to provide a compliant and consistent approach to data protection. We have created this GDPR compliance statement 
                to explain our approach to implementing our GDPR compliance program.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">2. CCPA Compliance</h2>
              <p className="text-white/80">
                The California Consumer Privacy Act (CCPA) provides California residents with specific rights regarding their personal information. 
                This section describes your CCPA rights and how to exercise them.
              </p>
              <ul className="list-disc pl-6 text-white/80">
                <li>Right to know about personal information collected</li>
                <li>Right to delete personal information</li>
                <li>Right to opt-out of the sale of personal information</li>
                <li>Right to non-discrimination for exercising CCPA rights</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">3. Data Protection</h2>
              <p className="text-white/80">
                We implement appropriate technical and organizational measures to ensure a level of security appropriate to the risk, 
                including:
              </p>
              <ul className="list-disc pl-6 text-white/80">
                <li>Encryption of data in transit and at rest</li>
                <li>Regular security assessments and testing</li>
                <li>Access controls and authentication</li>
                <li>Data backup and recovery procedures</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">4. Third-Party Compliance</h2>
              <p className="text-white/80">
                We ensure that all third-party service providers and partners comply with relevant data protection laws and regulations. 
                We conduct regular audits and assessments of our third-party relationships to maintain compliance.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">5. Contact Us</h2>
              <p className="text-white/80">
                If you have any questions about our compliance practices, please contact us at:
                <br />
                Email: compliance@warzonequest.com
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}; 