import { Link } from "react-router-dom";
import deepkeepLogo from "@/assets/deepkeep-logo.png";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-background p-6 md:p-10">
      <div className="w-full max-w-[800px] mx-auto space-y-8">
        {/* Logo */}
        <div className="flex items-center justify-center mb-8">
          <Link to="/growth-plan">
            <img src={deepkeepLogo} alt="deepkeep" className="h-12 w-auto" />
          </Link>
        </div>

        {/* Content */}
        <div className="space-y-6">
          <h1 className="text-4xl font-extrabold text-foreground">Privacy Policy</h1>

          <div className="space-y-4 text-foreground">
            <section>
              <h2 className="text-2xl font-bold mb-3">1. Information We Collect</h2>
              <p className="text-muted-foreground leading-relaxed">
                We collect information you provide directly to us, including your name, email address, and usage data when you create an account or use our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-3">2. How We Use Your Information</h2>
              <p className="text-muted-foreground leading-relaxed">
                We use the information we collect to provide, maintain, and improve our services, to communicate with you, and to personalize your learning experience.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-3">3. Information Sharing</h2>
              <p className="text-muted-foreground leading-relaxed">
                We do not sell, trade, or rent your personal information to third parties. We may share your information with service providers who assist us in operating our platform.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-3">4. Data Security</h2>
              <p className="text-muted-foreground leading-relaxed">
                We implement appropriate security measures to protect your personal information. However, no method of transmission over the Internet is 100% secure.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-3">5. Cookies</h2>
              <p className="text-muted-foreground leading-relaxed">
                We use cookies and similar tracking technologies to track activity on our service and hold certain information to improve and analyze our service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-3">6. Your Rights</h2>
              <p className="text-muted-foreground leading-relaxed">
                You have the right to access, update, or delete your personal information at any time. Contact us to exercise these rights.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-3">7. Changes to This Policy</h2>
              <p className="text-muted-foreground leading-relaxed">
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-3">8. Contact Us</h2>
              <p className="text-muted-foreground leading-relaxed">
                If you have any questions about this Privacy Policy, please contact us at privacy@deepkeep.com
              </p>
            </section>
          </div>
        </div>

        {/* Back Link */}
        <div className="text-center pt-8">
          <Link to="/growth-plan" className="text-primary hover:underline font-semibold">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Privacy;