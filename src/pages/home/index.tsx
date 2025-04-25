import { motion, useScroll, useTransform } from 'framer-motion';
import {
  ArrowRightIcon,
  CheckCircleIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

export default function Home() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white overflow-hidden">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 px-4 overflow-hidden">
        <motion.div 
          className="absolute inset-0 bg-[url('/grid.svg')] opacity-20"
          style={{ y, opacity }}
        />
        <div className="container mx-auto text-center relative">
          <motion.div
            className="inline-block mb-4 px-4 py-2 rounded-full bg-blue-500/10 text-blue-400 text-sm font-medium"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
          >
            <SparklesIcon className="inline-block w-4 h-4 mr-2" />
            The Ultimate Tournament Platform
          </motion.div>
          
          <motion.h1 
            className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-400"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            Level Up Your <br />
            <span className="text-blue-500">Tournament Game</span>
          </motion.h1>
          
          <motion.p 
            className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto"
            {...fadeIn}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            Create, manage, and dominate tournaments with our cutting-edge platform. 
            Built for gamers, by gamers.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5, ease: "easeOut" }}
          >
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-blue-500/30 flex items-center justify-center gap-2"
            >
              Start Your Journey
              <ArrowRightIcon className="w-5 h-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gray-800/50 backdrop-blur-sm rounded-lg hover:bg-gray-700/50 transition-all border border-gray-700"
            >
              Watch Demo
            </motion.button>
          </motion.div>
        </div>
      </section>
      
      {/* Stats Section */}
      <section className="py-12 px-4 bg-gray-900/30">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: '10K+', label: 'Active Players' },
              { number: '500+', label: 'Tournaments' },
              { number: '98%', label: 'Success Rate' },
              { number: '24/7', label: 'Support' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ 
                  delay: index * 0.1, 
                  duration: 0.5,
                  ease: "easeOut"
                }}
                viewport={{ margin: "-100px", once: false }}
              >
                <div className="text-4xl font-bold text-blue-500 mb-2">{stat.number}</div>
                <div className="text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Features Grid */}
      <section className="py-24 px-4 bg-gray-900/50">
        <div className="container mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            viewport={{ margin: "-100px", once: false }}
          >
            <h2 className="text-4xl font-bold mb-4">Power Up Your Tournaments</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Everything you need to create, manage, and dominate your gaming tournaments.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="p-6 rounded-xl bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 hover:border-blue-500/50 transition-all group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ 
                  delay: index * 0.2, 
                  duration: 0.5,
                  ease: "easeOut"
                }}
                viewport={{ margin: "-100px", once: false }}
              >
                <div className="w-12 h-12 text-blue-500 mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* How It Works */}
      <section className="py-24 px-4">
        <div className="container mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            viewport={{ margin: "-100px", once: false }}
          >
            <h2 className="text-4xl font-bold mb-4">Level Up Your Game</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Get started in minutes and launch your first tournament today.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                className="text-center relative"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ 
                  delay: index * 0.2, 
                  duration: 0.5,
                  ease: "easeOut"
                }}
                viewport={{ margin: "-100px", once: false }}
              >
                <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center mx-auto mb-4 relative z-10">
                  <span className="text-2xl font-bold text-blue-500">{index + 1}</span>
                </div>
                <div className="absolute top-8 left-1/2 w-full h-0.5 bg-blue-500/20 -translate-x-1/2 hidden lg:block" />
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-gray-400">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Pricing Section */}
      <section className="py-24 px-4 bg-gray-900/50">
        <div className="container mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            viewport={{ margin: "-100px", once: false }}
          >
            <h2 className="text-4xl font-bold mb-4">Choose Your Power Level</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Select the perfect plan for your tournament needs.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={plan.name}
                className={`p-8 rounded-xl bg-gray-800/50 backdrop-blur-sm border ${
                  plan.name === 'Pro' 
                    ? 'border-blue-500/50 shadow-lg shadow-blue-500/20' 
                    : 'border-gray-700/50'
                }`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ 
                  delay: index * 0.2, 
                  duration: 0.5,
                  ease: "easeOut"
                }}
                viewport={{ margin: "-100px", once: false }}
              >
                <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold">${plan.price}</span>
                  {plan.price > 0 && <span className="text-gray-400">/month</span>}
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <CheckCircleIcon className="w-5 h-5 text-blue-500" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-full py-3 rounded-lg transition-all ${
                    plan.name === 'Pro' 
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-blue-500/30' 
                      : 'bg-gray-700 hover:bg-gray-600'
                  }`}
                >
                  Get Started
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-24 px-4 relative overflow-hidden">
        <motion.div 
          className="absolute inset-0 bg-[url('/grid.svg')] opacity-20"
          style={{ y, opacity }}
        />
        <div className="container mx-auto text-center relative">
          <motion.div
            className="max-w-3xl mx-auto"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            viewport={{ margin: "-100px", once: false }}
          >
            <h2 className="text-4xl font-bold mb-6">Ready to Level Up?</h2>
            <p className="text-xl text-gray-400 mb-8">
              Join thousands of tournament organizers who trust our platform.
            </p>
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-blue-500/30 inline-flex items-center gap-2"
            >
              Create Your First Tournament
              <ArrowRightIcon className="w-5 h-5" />
            </motion.button>
          </motion.div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}

const features = [
  {
    title: 'Tournament Creation',
    description: 'Create and customize tournaments with flexible bracket systems and match formats.',
    icon: () => (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
      </svg>
    )
  },
  {
    title: 'Real-time Monitoring',
    description: 'Track matches, scores, and standings in real-time with live updates.',
    icon: () => (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5" />
      </svg>
    )
  },
  {
    title: 'Team Management',
    description: 'Manage teams, players, and roles with comprehensive admin controls.',
    icon: () => (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
      </svg>
    )
  }
];

const steps = [
  {
    title: 'Create Account',
    description: 'Sign up and set up your organization profile in minutes.'
  },
  {
    title: 'Configure Tournament',
    description: 'Choose format, rules, and customize settings to your needs.'
  },
  {
    title: 'Invite Teams',
    description: 'Send invitations and manage team registrations easily.'
  },
  {
    title: 'Start Playing',
    description: 'Launch your tournament and watch it unfold in real-time.'
  }
];

const pricingPlans = [
  {
    name: 'Free',
    price: 0,
    features: [
      'Up to 8 teams',
      'Basic tournament formats',
      'Email support',
      'Community features'
    ]
  },
  {
    name: 'Pro',
    price: 29,
    features: [
      'Up to 32 teams',
      'Advanced formats',
      'Priority support',
      'Custom branding',
      'Analytics dashboard'
    ]
  },
  {
    name: 'Enterprise',
    price: 99,
    features: [
      'Unlimited teams',
      'All features included',
      'Dedicated support',
      'API access',
      'Custom integrations'
    ]
  }
];
