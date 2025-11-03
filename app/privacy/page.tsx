import { Section, H2 } from "@/components/marketing/Section";
import Link from "next/link";

export default function PrivacyPage() {
  return (
    <main className="pb-20">
      <header className="pt-16 pb-8 text-center max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold">Privacy Policy</h1>
        <p className="mt-4 text-gray-400 text-sm">Last updated: {new Date().toLocaleDateString()}</p>
      </header>

      <div className="max-w-4xl mx-auto px-4">
        <Section className="prose prose-invert prose-sm max-w-none">
          <H2>Introduction</H2>
          <p>
            Welcome to Dropzone. We respect your privacy and are committed to protecting your personal data.
            This privacy policy explains how we collect, use, and share information when you use our service.
          </p>

          <H2>Information We Collect</H2>
          <p>We collect the following types of information:</p>
          <ul>
            <li><strong>Epic Games Username:</strong> When you search for your stats, we fetch public data from third-party providers.</li>
            <li><strong>Usage Data:</strong> We collect analytics data about how you interact with our site (pages visited, time spent, etc.).</li>
            <li><strong>Cookies:</strong> We use cookies for advertising and analytics purposes.</li>
            <li><strong>Email (Optional):</strong> If you subscribe to updates, we collect your email address.</li>
          </ul>

          <H2>How We Use Your Information</H2>
          <p>We use your information to:</p>
          <ul>
            <li>Display your Fortnite statistics and match history</li>
            <li>Improve our service and user experience</li>
            <li>Send you updates if you've subscribed (you can unsubscribe anytime)</li>
            <li>Serve relevant advertisements through Google AdSense</li>
          </ul>

          <H2>Third-Party Services</H2>
          <p>We use the following third-party services:</p>
          <ul>
            <li><strong>Google AdSense:</strong> For displaying advertisements. AdSense may use cookies to show ads based on your interests. Learn more at <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener" className="text-[#00FF88] hover:underline">Google's Ad Policy</a>.</li>
            <li><strong>Analytics:</strong> We may use analytics tools to understand user behavior and improve our service.</li>
            <li><strong>Fortnite Stats Providers:</strong> We fetch public match data from authorized third-party APIs.</li>
          </ul>

          <H2>Cookies and Tracking</H2>
          <p>
            We use cookies to enhance your experience and serve personalized ads. You can manage your cookie preferences through our consent banner.
            You can also disable cookies in your browser settings, but this may affect site functionality.
          </p>

          <H2>Your Rights</H2>
          <p>You have the right to:</p>
          <ul>
            <li>Access your personal data</li>
            <li>Request deletion of your data</li>
            <li>Opt out of marketing communications</li>
            <li>Withdraw consent for cookies at any time</li>
          </ul>

          <H2>Data Security</H2>
          <p>
            We implement reasonable security measures to protect your data. However, no method of transmission over the internet
            is 100% secure, and we cannot guarantee absolute security.
          </p>

          <H2>Children's Privacy</H2>
          <p>
            Our service is not directed to individuals under 13. We do not knowingly collect personal information from children.
          </p>

          <H2>Changes to This Policy</H2>
          <p>
            We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page
            and updating the "Last updated" date.
          </p>

          <H2>Contact Us</H2>
          <p>
            If you have questions about this privacy policy, please contact us at{" "}
            <Link href="/contact" className="text-[#00FF88] hover:underline">our contact page</Link>.
          </p>
        </Section>
      </div>
    </main>
  );
}
