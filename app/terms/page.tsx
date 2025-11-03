import { Section, H2 } from "@/components/marketing/Section";
import Link from "next/link";

export default function TermsPage() {
  return (
    <main className="pb-20">
      <header className="pt-16 pb-8 text-center max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold">Terms of Service</h1>
        <p className="mt-4 text-gray-400 text-sm">Last updated: {new Date().toLocaleDateString()}</p>
      </header>

      <div className="max-w-4xl mx-auto px-4">
        <Section className="prose prose-invert prose-sm max-w-none">
          <H2>Agreement to Terms</H2>
          <p>
            By accessing or using Dropzone, you agree to be bound by these Terms of Service and all applicable laws and regulations.
            If you do not agree with any of these terms, you are prohibited from using this site.
          </p>

          <H2>Use License</H2>
          <p>
            Permission is granted to temporarily access the materials on Dropzone for personal, non-commercial use only.
            This is the grant of a license, not a transfer of title, and under this license you may not:
          </p>
          <ul>
            <li>Modify or copy the materials</li>
            <li>Use the materials for any commercial purpose or for any public display</li>
            <li>Attempt to reverse engineer any software contained on Dropzone</li>
            <li>Remove any copyright or other proprietary notations from the materials</li>
            <li>Transfer the materials to another person or mirror the materials on any other server</li>
          </ul>

          <H2>Service Description</H2>
          <p>
            Dropzone provides Fortnite statistics tracking by fetching publicly available match data from authorized third-party APIs.
            We do not guarantee the accuracy, completeness, or timeliness of any statistics displayed.
          </p>

          <H2>User Conduct</H2>
          <p>You agree not to:</p>
          <ul>
            <li>Use the service for any unlawful purpose</li>
            <li>Violate any local, state, national, or international law</li>
            <li>Interfere with or disrupt the service or servers</li>
            <li>Attempt to gain unauthorized access to any portion of the site</li>
            <li>Scrape, crawl, or use automated tools to access the service without permission</li>
          </ul>

          <H2>Disclaimer</H2>
          <p>
            The materials on Dropzone are provided on an "as is" basis. Dropzone makes no warranties, expressed or implied,
            and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions
            of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
          </p>
          <p>
            Dropzone is not affiliated with, endorsed by, or sponsored by Epic Games. Fortnite and all related marks are trademarks
            or registered trademarks of Epic Games, Inc.
          </p>

          <H2>Limitations</H2>
          <p>
            In no event shall Dropzone or its suppliers be liable for any damages (including, without limitation, damages for loss of data
            or profit, or due to business interruption) arising out of the use or inability to use the materials on Dropzone,
            even if Dropzone or an authorized representative has been notified orally or in writing of the possibility of such damage.
          </p>

          <H2>Accuracy of Materials</H2>
          <p>
            The statistics displayed on Dropzone are sourced from third-party APIs and may contain technical, typographical, or photographic errors.
            Dropzone does not warrant that any of the materials are accurate, complete, or current. Dropzone may make changes to the materials
            at any time without notice.
          </p>

          <H2>Links</H2>
          <p>
            Dropzone has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site.
            The inclusion of any link does not imply endorsement by Dropzone. Use of any such linked website is at the user's own risk.
          </p>

          <H2>Advertising</H2>
          <p>
            Dropzone uses Google AdSense to display advertisements. These ads are served by Google and may be personalized based on your
            browsing activity. For more information, see our{" "}
            <Link href="/privacy" className="text-[#00FF88] hover:underline">Privacy Policy</Link>.
          </p>

          <H2>Modifications</H2>
          <p>
            Dropzone may revise these terms of service at any time without notice. By using this website you are agreeing to be bound
            by the then current version of these Terms of Service.
          </p>

          <H2>Termination</H2>
          <p>
            We may terminate or suspend your access to our service immediately, without prior notice or liability, for any reason whatsoever,
            including without limitation if you breach the Terms.
          </p>

          <H2>Governing Law</H2>
          <p>
            These terms and conditions are governed by and construed in accordance with applicable laws and you irrevocably submit
            to the exclusive jurisdiction of the courts in that location.
          </p>

          <H2>Contact Us</H2>
          <p>
            If you have any questions about these Terms, please contact us at{" "}
            <Link href="/contact" className="text-[#00FF88] hover:underline">our contact page</Link>.
          </p>
        </Section>
      </div>
    </main>
  );
}
