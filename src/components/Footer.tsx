import { Link } from 'react-router';
import { motion } from 'framer-motion';
import {
  ChatBubbleLeftIcon,
  EnvelopeIcon,
  CodeBracketIcon,
  TrophyIcon,
  UserGroupIcon,
  ChartBarIcon,
  RocketLaunchIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline';

interface FooterItem {
  name: string;
  to: string;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

interface FooterSection {
  title: string;
  items: FooterItem[];
}

export const Footer = () => {
  const footerSections: FooterSection[] = [
    {
      title: 'Gaming',
      items: [
        { name: 'Tournaments', icon: TrophyIcon, to: '/dashboard/tournaments' },
        { name: 'Leaderboards', icon: ChartBarIcon, to: '/dashboard/leaderboards' },
        { name: 'Teams', icon: UserGroupIcon, to: '/dashboard/teams' },
        { name: 'Events', icon: RocketLaunchIcon, to: '/dashboard/events' }
      ]
    },
    {
      title: 'Community',
      items: [
        { name: 'Discord', icon: ChatBubbleLeftIcon, to: '/coming-soon' },
        { name: 'Forums', icon: EnvelopeIcon, to: '/coming-soon' },
        { name: 'Blog', icon: CodeBracketIcon, to: '/coming-soon' },
        { name: 'Support', icon: ShieldCheckIcon, to: '/coming-soon' }
      ]
    },
    {
      title: 'Resources',
      items: [
        { name: 'Game Guides', to: '/coming-soon' },
        { name: 'Tournament Rules', to: '/coming-soon' },
        { name: 'API Docs', to: '/coming-soon' },
        { name: 'Status', to: '/coming-soon' }
      ]
    },
    {
      title: 'Legal',
      items: [
        { name: 'Privacy Policy', to: '/privacy' },
        { name: 'Terms of Service', to: '/terms' },
        { name: 'Cookie Policy', to: '/cookies' },
        { name: 'Compliance', to: '/compliance' }
      ]
    }
  ];

  return (
    <footer className="bg-black/90 text-gray-400 py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {footerSections.map((section, sectionIndex) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: sectionIndex * 0.1 }}
            >
              <h3 className="text-white font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.items.map((item, itemIndex) => (
                  <motion.li
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: sectionIndex * 0.1 + itemIndex * 0.05 }}
                  >
                    <Link 
                      to={item.to} 
                      className="flex items-center gap-2 hover:text-white transition-colors group"
                    >
                      {item.icon && (
                        <item.icon className="w-4 h-4 group-hover:text-blue-500 transition-colors" />
                      )}
                      <span>{item.name}</span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <motion.div 
            className="flex items-center gap-2 group"
            whileHover={{ scale: 1.05 }}
          >
            <img src="/logo.svg" alt="Logo" className="w-8 h-8" />
            <span className="text-white font-semibold group-hover:text-blue-500 transition-colors">
              WarZone Quest
            </span>
          </motion.div>
          
          <div className="flex items-center gap-6">
            {[
              { icon: ChatBubbleLeftIcon, href: 'https://discord.com', label: 'Discord' },
              { icon: EnvelopeIcon, href: 'https://x.com', label: 'X' },
              { icon: CodeBracketIcon, href: 'https://github.com/Warzone-Quest', label: 'GitHub' }
            ].map((social, index) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
                whileHover={{ scale: 1.2, y: -2 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                <social.icon className="w-6 h-6" />
              </motion.a>
            ))}
          </div>
          
          <p className="text-sm">© 2024 WarZone Quest. All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  );
}; 