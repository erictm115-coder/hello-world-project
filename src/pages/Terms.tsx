import { Link } from "react-router-dom";
import deepkeepLogo from "@/assets/deepkeep-logo.png";

const Terms = () => {
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
          <h1 className="text-4xl font-extrabold text-foreground">Terms & Conditions</h1>

          <div className="space-y-4 text-foreground">
            <section>
              <h2 className="text-2xl font-bold mb-3">1. Acceptance of Terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                By accessing and using deepkeep, you accept and agree to be bound by the terms and provision of this agreement.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-3">2. Use License</h2>
              <p className="text-muted-foreground leading-relaxed">
                Permission is granted to temporarily access the materials on deepkeep for personal, non-commercial transitory viewing only.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-3">3. User Account</h2>
              <p className="text-muted-foreground leading-relaxed">
                You are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities that occur under your account.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-3">4. Content</h2>
              <p className="text-muted-foreground leading-relaxed">
                All content provided on deepkeep is for informational and educational purposes only. We do not guarantee the accuracy, completeness, or usefulness of any information.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-3">5. Limitation of Liability</h2>
              <p className="text-muted-foreground leading-relaxed">
                In no event shall deepkeep or its suppliers be liable for any damages arising out of the use or inability to use the materials on our platform.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-3">6. Changes to Terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                We reserve the right to modify these terms at any time. Continued use of the service after changes constitutes acceptance of the new terms.
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

export default Terms;