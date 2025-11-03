import { Section, H2, Sub } from "@/components/marketing/Section";
import Link from "next/link";

export default function ContactPage() {
  return (
    <main className="pb-20">
      <header className="pt-16 pb-8 text-center max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold">Contact Us</h1>
        <p className="mt-4 text-gray-300">
          Have questions, feedback, or need support? We're here to help.
        </p>
      </header>

      <div className="max-w-4xl mx-auto px-4">
        <Section>
          <H2>Get in Touch</H2>
          <Sub className="mt-2">Choose the best way to reach us based on your needs.</Sub>

          <div className="mt-8 grid md:grid-cols-2 gap-6">
            <div className="border border-white/10 rounded-xl p-6 bg-white/5">
              <h3 className="text-xl font-bold mb-2">General Inquiries</h3>
              <p className="text-gray-400 mb-4">
                Questions about Dropzone, partnerships, or general feedback.
              </p>
              <a
                href="mailto:hello@dropzone.gg"
                className="text-[#00FF88] hover:underline font-medium"
              >
                hello@dropzone.gg
              </a>
            </div>

            <div className="border border-white/10 rounded-xl p-6 bg-white/5">
              <h3 className="text-xl font-bold mb-2">Technical Support</h3>
              <p className="text-gray-400 mb-4">
                Issues with your stats, bugs, or technical problems.
              </p>
              <a
                href="mailto:support@dropzone.gg"
                className="text-[#00FF88] hover:underline font-medium"
              >
                support@dropzone.gg
              </a>
            </div>

            <div className="border border-white/10 rounded-xl p-6 bg-white/5">
              <h3 className="text-xl font-bold mb-2">Privacy & Legal</h3>
              <p className="text-gray-400 mb-4">
                Questions about your data, privacy, or legal matters.
              </p>
              <a
                href="mailto:privacy@dropzone.gg"
                className="text-[#00FF88] hover:underline font-medium"
              >
                privacy@dropzone.gg
              </a>
            </div>

            <div className="border border-white/10 rounded-xl p-6 bg-white/5">
              <h3 className="text-xl font-bold mb-2">Content & Creators</h3>
              <p className="text-gray-400 mb-4">
                Interested in featuring your content or collaborating.
              </p>
              <a
                href="mailto:creators@dropzone.gg"
                className="text-[#00FF88] hover:underline font-medium"
              >
                creators@dropzone.gg
              </a>
            </div>
          </div>
        </Section>

        <Section>
          <H2>Frequently Asked Questions</H2>
          <Sub className="mt-2">
            Before reaching out, check our{" "}
            <Link href="/#faq" className="text-[#00FF88] hover:underline">
              FAQ section
            </Link>{" "}
            for quick answers to common questions.
          </Sub>
        </Section>

        <Section>
          <H2>Response Time</H2>
          <p className="text-gray-300">
            We aim to respond to all inquiries within 24-48 hours during business days. For urgent technical issues,
            please include "URGENT" in your email subject line.
          </p>
        </Section>

        <Section className="text-center">
          <p className="text-gray-400 text-sm">
            By contacting us, you agree to our{" "}
            <Link href="/privacy" className="text-[#00FF88] hover:underline">
              Privacy Policy
            </Link>{" "}
            and{" "}
            <Link href="/terms" className="text-[#00FF88] hover:underline">
              Terms of Service
            </Link>
            .
          </p>
        </Section>
      </div>
    </main>
  );
}
