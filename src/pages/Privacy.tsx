import { Link } from "react-router-dom";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-background p-6 md:p-10">
      <div className="w-full max-w-[800px] mx-auto space-y-8">
        {/* Logo */}
        <div className="flex items-center justify-center mb-8">
          <Link to="/growth-plan">
            <h1 className="text-2xl font-bold text-primary">Deepkeep</h1>
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
                We do not share your personal information with third parties except as described in this privacy policy or with your consent.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-3">4. Data Security</h2>
              <p className="text-muted-foreground leading-relaxed">
                We take reasonable measures to help protect your personal information from loss, theft, misuse, unauthorized access, disclosure, alteration, and destruction.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-3">5. Your Rights</h2>
              <p className="text-muted-foreground leading-relaxed">
                You have the right to access, update, or delete your personal information at any time. You may also opt out of receiving promotional communications from us.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-3">6. Contact Us</h2>
              <p className="text-muted-foreground leading-relaxed">
                If you have any questions about this Privacy Policy, please contact us through our support channels.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;