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
                By accessing and using deepkeep, you accept and agree to be bound by the terms and provision of this agreement. By completing a purchase, you confirm that you have read, understood, and agree to these terms.
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
              <h2 className="text-2xl font-bold mb-3">4. Subscription and Access</h2>
              <p className="text-muted-foreground leading-relaxed">
                By purchasing a subscription, you are purchasing access to the deepkeep web application and its features. Your subscription grants you a non-exclusive, non-transferable, revocable license to access and use the platform for the duration of your paid subscription period. Access may be suspended or terminated if payment fails or if these terms are violated.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-3">5. Digital Product Acknowledgment</h2>
              <p className="text-muted-foreground leading-relaxed">
                You acknowledge that deepkeep is a digital service and that access is granted immediately upon successful payment. By completing your purchase, you expressly consent to immediate access and acknowledge that this constitutes delivery of the service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-3">6. Refund Policy</h2>
              <p className="text-muted-foreground leading-relaxed">
                Due to the immediate access nature of our digital service, all sales are final. No refunds will be issued once access to the platform has been granted. If you experience technical issues preventing access, contact support@deepkeep.app within 7 days of purchase for assistance.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-3">7. Chargebacks and Disputes</h2>
              <p className="text-muted-foreground leading-relaxed">
                You agree to contact us at support@deepkeep.app to resolve any billing issues before initiating a chargeback or dispute with your bank or payment provider. Initiating a chargeback without first attempting to resolve the issue with us constitutes a breach of these terms. In the event of a chargeback:
              </p>
              <ul className="list-disc list-inside text-muted-foreground leading-relaxed mt-2 ml-4 space-y-1">
                <li>Your account will be immediately suspended</li>
                <li>Access to the platform will be revoked</li>
                <li>We reserve the right to pursue recovery of the disputed amount plus any fees incurred</li>
                <li>We may report fraudulent chargebacks to relevant authorities and credit agencies</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-3">8. Billing and Auto-Renewal</h2>
              <p className="text-muted-foreground leading-relaxed">
                Subscriptions automatically renew at the end of each billing cycle unless cancelled before the renewal date. You authorize us to charge your payment method on file for all recurring fees. You may cancel your subscription at any time through your account settings, and cancellation will take effect at the end of your current billing period.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-3">9. Content</h2>
              <p className="text-muted-foreground leading-relaxed">
                All content provided on deepkeep is for informational and educational purposes only. Book summaries and key ideas are our own interpretations and do not replace reading the original works. We do not guarantee the accuracy, completeness, or usefulness of any information.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-3">10. Limitation of Liability</h2>
              <p className="text-muted-foreground leading-relaxed">
                In no event shall deepkeep or its suppliers be liable for any damages arising out of the use or inability to use the materials on our platform. Your sole remedy for dissatisfaction with the service is to cancel your subscription.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-3">11. Governing Law and Disputes</h2>
              <p className="text-muted-foreground leading-relaxed">
                These terms shall be governed by the laws of Ireland. Any disputes arising from these terms or your use of the service shall be resolved through binding arbitration rather than in court, except where prohibited by law.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-3">12. Changes to Terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                We reserve the right to modify these terms at any time. Continued use of the service after changes constitutes acceptance of the new terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-3">13. Contact</h2>
              <p className="text-muted-foreground leading-relaxed">
                For billing inquiries or disputes: support@deepkeep.app
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