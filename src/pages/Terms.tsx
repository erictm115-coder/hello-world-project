import { Link } from "react-router-dom";

const Terms = () => {
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
              <h2 className="text-2xl font-bold mb-3">4. Privacy Policy</h2>
              <p className="text-muted-foreground leading-relaxed">
                Your use of deepkeep is also governed by our Privacy Policy. Please review our Privacy Policy, which also governs the Site and informs users of our data collection practices.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-3">5. Modifications</h2>
              <p className="text-muted-foreground leading-relaxed">
                deepkeep may revise these terms of service at any time without notice. By using this platform, you are agreeing to be bound by the then current version of these terms of service.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;