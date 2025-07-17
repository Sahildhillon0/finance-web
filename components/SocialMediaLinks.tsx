import { motion } from "framer-motion";

const socialLinks = [
  {
    name: "Instagram",
    url: "https://instagram.com/YOUR_INSTAGRAM_USERNAME",
    color: "bg-gradient-to-br from-[#f58529] via-[#dd2a7b] to-[#8134af]",
    shadow: "shadow-[0_6px_32px_0_rgba(221,42,123,0.18)]",
    icon: (
      <svg className="w-10 h-10 transition-colors duration-300 group-hover:text-[#f58529]" fill="none" viewBox="0 0 24 24">
        <rect width="20" height="20" x="2" y="2" rx="6" fill="currentColor" className="text-[#dd2a7b]" />
        <circle cx="12" cy="12" r="5" stroke="white" strokeWidth="2" fill="none" />
        <circle cx="17" cy="7" r="1.5" fill="white" />
      </svg>
    ),
  },
  {
    name: "YouTube",
    url: "https://youtube.com/YOUR_YOUTUBE_CHANNEL",
    color: "bg-gradient-to-br from-[#ff0000] to-[#c4302b]",
    shadow: "shadow-[0_6px_32px_0_rgba(255,0,0,0.16)]",
    icon: (
      <svg className="w-10 h-10 transition-colors duration-300 group-hover:text-[#ff0000]" fill="none" viewBox="0 0 24 24">
        <rect width="20" height="20" x="2" y="2" rx="6" fill="currentColor" className="text-[#ff0000]" />
        <polygon points="10,8 16,12 10,16" fill="white" />
      </svg>
    ),
  },
  {
    name: "Facebook",
    url: "https://facebook.com/YOUR_FACEBOOK_PROFILE",
    color: "bg-gradient-to-br from-[#1877f3] to-[#0057b7]",
    shadow: "shadow-[0_6px_32px_0_rgba(24,119,243,0.16)]",
    icon: (
      <svg className="w-10 h-10 transition-colors duration-300 group-hover:text-[#1877f3]" fill="none" viewBox="0 0 24 24">
        <rect width="20" height="20" x="2" y="2" rx="6" fill="currentColor" className="text-[#1877f3]" />
        <path d="M15 8h-2a1 1 0 00-1 1v2h3l-.5 3h-2.5v7h-3v-7H8v-3h2V9a3 3 0 013-3h2v2z" fill="white" />
      </svg>
    ),
  },
];

export default function SocialMediaLinks() {
  return (
    <section className="py-16 bg-background flex flex-col items-center">
      <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">Connect With Us</h2>
      <p className="text-xl text-muted-foreground mb-10 max-w-2xl text-center">
        Follow us on social media for updates, offers, and more!
      </p>
      <div className="flex flex-col md:flex-row gap-8 justify-center items-center w-full max-w-4xl">
        {socialLinks.map((social, idx) => (
          <motion.a
            key={social.name}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`group flex flex-col items-center justify-center rounded-xl px-10 py-8 w-72 text-white focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 transition-all duration-300 ${social.color} ${social.shadow} hover:shadow-2xl hover:-translate-y-2`}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: idx * 0.15, ease: 'easeOut' }}
            whileHover={{ scale: 1.09, boxShadow: '0 12px 44px 0 rgba(24,119,243,0.25)', transition: { duration: 0.18 } }}
          >
            <div className="mb-4">{social.icon}</div>
            <div className="text-2xl font-semibold mb-2 font-['Oswald'] tracking-wide drop-shadow-lg">{social.name}</div>
            <div className="text-base opacity-90 font-sans text-center">
              {social.name === 'Instagram' && 'See our latest posts and stories.'}
              {social.name === 'YouTube' && 'Watch our videos and reviews.'}
              {social.name === 'Facebook' && 'Join our community and stay updated.'}
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
