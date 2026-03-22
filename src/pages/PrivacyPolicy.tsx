import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-6 py-12 sm:py-20">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-foreground mb-2">
          Privacy Policy
        </h1>
        <p className="text-sm text-muted-foreground mb-10">
          Last updated: {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
        </p>

        <div className="prose prose-sm sm:prose-base max-w-none text-foreground/90 space-y-8">
          <section>
            <h2 className="text-xl font-serif font-bold text-foreground">1. Introduction</h2>
            <p>
              SolidSurfaceBaths.com ("we," "our," or "us") respects your privacy and is committed to protecting the personal information you share with us. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or submit a lead form.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-serif font-bold text-foreground">2. Information We Collect</h2>
            <p>We may collect the following types of information:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>Personal Information:</strong> Name, phone number, email address, and zip code that you voluntarily provide when submitting our estimate request form.</li>
              <li><strong>Project Information:</strong> Details about your remodeling timeline, preferences, and concerns.</li>
              <li><strong>Location Data:</strong> We may use your IP address or zip code to determine your approximate geographic location in order to match you with a local contractor.</li>
              <li><strong>Usage Data:</strong> Information about how you interact with our website, including pages visited, time spent, and referring URLs.</li>
              <li><strong>Marketing Data:</strong> UTM parameters and campaign information from advertising platforms (e.g., Facebook, Google) used to measure the effectiveness of our marketing efforts.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-serif font-bold text-foreground">3. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Match you with a certified, licensed local contractor in your area</li>
              <li>Provide you with a free, no-obligation estimate for solid surface shower installation</li>
              <li>Communicate with you about your project inquiry</li>
              <li>Improve our website and services</li>
              <li>Measure and optimize our advertising campaigns</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-serif font-bold text-foreground">4. How We Share Your Information</h2>
            <p>We may share your information with:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>Contractor Partners:</strong> We share your contact and project information with a vetted, licensed contractor in your service area so they can contact you to schedule an estimate.</li>
              <li><strong>Service Providers:</strong> Third-party companies that help us operate our website, process data, or deliver services (e.g., hosting providers, analytics tools).</li>
              <li><strong>Advertising Partners:</strong> We may share anonymized or aggregated data with advertising platforms to measure campaign performance.</li>
            </ul>
            <p>We do not sell your personal information to third parties.</p>
          </section>

          <section>
            <h2 className="text-xl font-serif font-bold text-foreground">5. Cookies and Tracking Technologies</h2>
            <p>
              We may use cookies, pixel tags, and similar technologies to collect usage data, personalize your experience, and measure the effectiveness of our advertising. This may include the Meta (Facebook) Pixel, Google Analytics, and similar tools.
            </p>
            <p>
              You can control cookies through your browser settings. Disabling cookies may affect some website functionality.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-serif font-bold text-foreground">6. Data Security</h2>
            <p>
              We implement reasonable administrative, technical, and physical safeguards to protect your personal information. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-serif font-bold text-foreground">7. Your Rights</h2>
            <p>Depending on your location, you may have the right to:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Access the personal information we hold about you</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion of your personal information</li>
              <li>Opt out of marketing communications</li>
              <li>Opt out of the sale or sharing of your personal information</li>
            </ul>
            <p>
              To exercise any of these rights, please contact us at the information provided below.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-serif font-bold text-foreground">8. Telephone Consumer Protection Act (TCPA) Consent</h2>
            <p>
              By submitting the lead form on our website, you consent to being contacted by Solid Surface Baths and/or our contractor partners at the phone number you provided, including via automated calls, pre-recorded messages, and/or text messages, even if your number is listed on a Do Not Call registry. Consent is not a condition of purchase. You may revoke consent at any time by contacting us.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-serif font-bold text-foreground">9. Third-Party Links</h2>
            <p>
              Our website may contain links to third-party websites. We are not responsible for the privacy practices of those websites. We encourage you to review their privacy policies before providing any personal information.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-serif font-bold text-foreground">10. Children's Privacy</h2>
            <p>
              Our website is not intended for individuals under the age of 18. We do not knowingly collect personal information from children.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-serif font-bold text-foreground">11. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated "Last updated" date. We encourage you to review this policy periodically.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-serif font-bold text-foreground">12. Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please contact us:</p>
            <ul className="list-none space-y-1">
              <li><strong>Email:</strong> info@solidsurfacebaths.com</li>
              <li><strong>Address:</strong> 1500 N Grant Street, Suite R, Denver, Colorado</li>
              <li><strong>Phone:</strong> 1-720-807-3626</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
