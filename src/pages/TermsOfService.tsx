import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const TermsOfService = () => {
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
          Terms of Service
        </h1>
        <p className="text-sm text-muted-foreground mb-10">
          Last updated: {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
        </p>

        <div className="prose prose-sm sm:prose-base max-w-none text-foreground/90 space-y-8">
          <section>
            <h2 className="text-xl font-serif font-bold text-foreground">1. Introduction</h2>
            <p>
              Welcome to SolidSurfaceBaths.com ("we," "our," or "us"). These Terms of Service ("Terms") govern your use of our website and services, including our SMS/text messaging program. By using our website or opting in to receive text messages from us, you agree to these Terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-serif font-bold text-foreground">2. Services</h2>
            <p>
              SolidSurfaceBaths.com connects homeowners interested in solid surface shower remodeling with vetted, licensed local contractors. By submitting our estimate request form, you authorize us to share your information with a contractor partner in your service area for the purpose of scheduling a free, no-obligation estimate.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-serif font-bold text-foreground">3. Mobile Terms of Service (SMS Program)</h2>
            <p>
              The following Mobile Terms of Service apply to our SMS/text messaging program operated by SolidSurfaceBaths.com ("Solid Surface Baths").
            </p>

            <h3 className="text-lg font-serif font-bold text-foreground mt-6">Program Description</h3>
            <p>
              When you opt in to the Solid Surface Baths SMS program by submitting our estimate request form, you will receive text messages related to your inquiry. These messages may include appointment confirmations, scheduling reminders, follow-up communications about your free estimate, project updates, and occasional promotional offers related to solid surface shower remodeling services.
            </p>

            <h3 className="text-lg font-serif font-bold text-foreground mt-6">How to Opt Out</h3>
            <p className="font-bold">
              You can cancel the SMS service at any time. Just text "STOP" to the short code or phone number from which you received the message. After you send the SMS message "STOP" to us, we will send you an SMS message to confirm that you have been unsubscribed. After this, you will no longer receive SMS messages from us. If you want to join again, just sign up as you did the first time and we will start sending SMS messages to you again.
            </p>

            <h3 className="text-lg font-serif font-bold text-foreground mt-6">Help and Support</h3>
            <p>
              If you are experiencing issues with the messaging program you can reply with the keyword <strong>HELP</strong> for more assistance, or you can get help directly at <strong>info@solidsurfacebaths.com</strong> or by calling <strong>(917) 813-0137</strong>.
            </p>

            <h3 className="text-lg font-serif font-bold text-foreground mt-6">Carrier Disclaimer</h3>
            <p>
              Carriers are not liable for delayed or undelivered messages.
            </p>

            <h3 className="text-lg font-serif font-bold text-foreground mt-6">Message Frequency and Rates</h3>
            <p>
              As always, message and data rates may apply for any messages sent to you from us and to us from you. You will receive recurring messages related to your inquiry, with message frequency varying based on your interaction with our service (typically 2–8 messages per inquiry). If you have any questions about your text plan or data plan, it is best to contact your wireless provider.
            </p>

            <h3 className="text-lg font-serif font-bold text-foreground mt-6">Privacy</h3>
            <p>
              If you have any questions regarding privacy, please read our <Link to="/privacy" className="underline hover:text-foreground">Privacy Policy</Link>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-serif font-bold text-foreground">4. Eligibility</h2>
            <p>
              You must be at least 18 years of age and the legal homeowner (or authorized representative of the homeowner) of the property where the project will take place to use our services and submit a request for an estimate.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-serif font-bold text-foreground">5. Lead Submissions and Contractor Matching</h2>
            <p>
              By submitting a lead form, you acknowledge and agree that:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>The information you provide is accurate and complete.</li>
              <li>We will share your information with one or more vetted contractor partners in your service area.</li>
              <li>You consent to be contacted by SolidSurfaceBaths.com and/or our contractor partners by phone, text message, or email at the contact information you provided.</li>
              <li>We do not guarantee any specific outcome, price, timeline, or contractor availability.</li>
              <li>Any contract for actual remodeling services is solely between you and the contractor partner; we are not a party to that contract.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-serif font-bold text-foreground">6. TCPA Consent</h2>
            <p>
              By submitting the lead form on our website, you consent to being contacted by Solid Surface Baths and/or our contractor partners at the phone number you provided, including via automated calls, pre-recorded messages, and/or text messages, even if your number is listed on a Do Not Call registry. Consent is not a condition of purchase. You may revoke consent at any time by replying STOP to any text message or by contacting us.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-serif font-bold text-foreground">7. No Warranties</h2>
            <p>
              Our website and services are provided on an "as is" and "as available" basis without warranties of any kind, either express or implied. We do not warrant that the website will be uninterrupted, error-free, or free of harmful components, nor do we warrant the accuracy, reliability, or quality of any information, contractor, or service obtained through the website.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-serif font-bold text-foreground">8. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, SolidSurfaceBaths.com shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to damages arising from your use of (or inability to use) the website, your interactions with contractor partners, or any project-related disputes.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-serif font-bold text-foreground">9. Intellectual Property</h2>
            <p>
              All content on this website, including text, graphics, logos, images, and software, is the property of SolidSurfaceBaths.com or its licensors and is protected by copyright, trademark, and other intellectual property laws. You may not copy, reproduce, distribute, or create derivative works without our express written permission.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-serif font-bold text-foreground">10. Prohibited Conduct</h2>
            <p>You agree not to:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Submit false, misleading, or fraudulent information.</li>
              <li>Use the website for any unlawful or unauthorized purpose.</li>
              <li>Interfere with or disrupt the operation of the website.</li>
              <li>Attempt to gain unauthorized access to any part of the website or its systems.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-serif font-bold text-foreground">11. Changes to These Terms</h2>
            <p>
              We may update these Terms of Service from time to time. Any changes will be posted on this page with an updated "Last updated" date. Your continued use of the website after changes are posted constitutes your acceptance of the revised Terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-serif font-bold text-foreground">12. Governing Law</h2>
            <p>
              These Terms are governed by and construed in accordance with the laws of the State of Colorado, without regard to its conflict of law principles. Any disputes arising under these Terms shall be resolved exclusively in the state or federal courts located in Colorado.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-serif font-bold text-foreground">13. Contact Us</h2>
            <p>If you have any questions about these Terms of Service, please contact us:</p>
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

export default TermsOfService;
