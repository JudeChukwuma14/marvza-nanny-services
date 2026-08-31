import PublicLayout from '../../components/layout/PublicLayout'
import SEOMeta from '../../components/ui/SEOMeta'

function LegalPageHero({ badge, title, updated }) {
  return (
    <div className="bg-bg py-14 sm:py-20 border-b border-border">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-xs font-semibold text-accent uppercase tracking-widest mb-3">{badge}</p>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-text mb-4">{title}</h1>
        <p className="text-sm text-text-muted">Last Updated: {updated}</p>
      </div>
    </div>
  )
}

function LegalContent({ children }) {
  return (
    <div className="py-14 sm:py-20 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-slate max-w-none prose-headings:font-serif prose-headings:font-semibold prose-headings:text-[#3B2923] prose-p:text-[#7C6659] prose-p:leading-relaxed prose-li:text-[#7C6659] prose-a:text-[#B88A62] hover:prose-a:text-[#9C7048] prose-strong:text-[#3B2923]">
        {children}
      </div>
    </div>
  )
}

export function PrivacyPolicyPage() {
  return (
    <PublicLayout>
      <SEOMeta title="Privacy Policy" description="How Marvza handles and protects your personal data." canonical="https://marvza.com/privacy-policy" />
      <LegalPageHero badge="Legal" title="Privacy Policy" updated="August 2026" />
      <LegalContent>
        <p>At Marvza ("we", "our", or "us"), we are committed to protecting and respecting your privacy. This Privacy Policy explains how we collect, use, and protect your personal information when you use our website or services.</p>
        <h2>1. Information we collect</h2>
        <p>We may collect and process the following data about you:</p>
        <ul>
          <li><strong>Families:</strong> Names, contact details, addresses, children's ages, specific childcare requirements, and billing information.</li>
          <li><strong>Nannies:</strong> Names, contact details, CVs, employment history, references, DBS certificates, ID documents, and right-to-work information.</li>
          <li><strong>Website Users:</strong> IP addresses, browser types, and interaction data via cookies (see our Cookie Policy).</li>
        </ul>
        <h2>2. How we use your information</h2>
        <ul>
          <li>To provide our nanny matching and placement services.</li>
          <li>To verify the identity and qualifications of nanny candidates.</li>
          <li>To manage your account, bookings, and payments.</li>
          <li>To communicate with you regarding your enquiries or applications.</li>
          <li>To comply with our legal and regulatory obligations.</li>
        </ul>
        <h2>3. Sharing your information</h2>
        <p>We will only share your personal data with third parties where necessary to provide our services. We do not sell your data to third parties for marketing purposes.</p>
        <h2>4. Data security and retention</h2>
        <p>We implement appropriate technical and organisational measures to protect your personal data against unauthorised access or loss. We retain your data only for as long as necessary to fulfil the purposes we collected it for.</p>
        <h2>5. Your rights</h2>
        <p>Under the UK GDPR, you have the right to access, correct, or erase your personal data, and to object to or restrict its processing.</p>
        <h2>6. Contact Us</h2>
        <p>If you have any questions, please contact us at: <strong>privacy@marvza.com</strong></p>
      </LegalContent>
    </PublicLayout>
  )
}

export function CookiePolicyPage() {
  return (
    <PublicLayout>
      <SEOMeta title="Cookie Policy" description="Information about how Marvza uses cookies on our website." canonical="https://marvza.com/cookie-policy" />
      <LegalPageHero badge="Legal" title="Cookie Policy" updated="August 2026" />
      <LegalContent>
        <p>This Cookie Policy explains how Marvza uses cookies and similar technologies when you visit our website.</p>
        <h2>1. What are cookies?</h2>
        <p>Cookies are small text files placed on your device when you browse websites. They are widely used to make websites work efficiently and provide information to site owners.</p>
        <h2>2. How we use cookies</h2>
        <ul>
          <li><strong>Essential Cookies:</strong> Required for the operation of our website, such as enabling form submissions securely.</li>
          <li><strong>Analytical/Performance Cookies:</strong> Allow us to count visitors and see how they move around our website to improve performance.</li>
          <li><strong>Functionality Cookies:</strong> Used to recognise you when you return to our website.</li>
        </ul>
        <h2>3. Managing cookies</h2>
        <p>Most web browsers allow you to control cookies through their settings. However, restricting cookies may reduce your experience of the site.</p>
        <h2>4. Third-party cookies</h2>
        <p>Third parties such as analytics providers may also use cookies on our site, over which we have no direct control.</p>
        <h2>5. Updates</h2>
        <p>We may update this Cookie Policy periodically. Please revisit this page to stay informed.</p>
      </LegalContent>
    </PublicLayout>
  )
}

export function TermsPage() {
  return (
    <PublicLayout>
      <SEOMeta title="Terms & Conditions" description="Terms and conditions for using Marvza's nanny placement services." canonical="https://marvza.com/terms" />
      <LegalPageHero badge="Legal" title="Terms & Conditions" updated="August 2026" />
      <LegalContent>
        <p>Please read these Terms and Conditions carefully before using the Marvza website or our nanny placement services. By accessing or using our services, you agree to be bound by these Terms.</p>
        <h2>1. Introduction</h2>
        <p>Marvza acts as an introduction agency connecting families ("Clients") with childcare professionals ("Nannies"). We do not directly employ the Nannies unless explicitly stated for specific services.</p>
        <h2>2. Agency Fees</h2>
        <p>No fee is payable upon registration. An agency placement fee becomes payable only when a Client formally engages a Candidate introduced by Marvza. Our fees are detailed in our Fee Schedule provided upon registration.</p>
        <h2>3. Client Responsibilities & Family Terms</h2>
        <p>When employing a Nanny permanently, the Client becomes the employer and is entirely responsible for:</p>
        <ul>
          <li>Providing a suitable contract of employment.</li>
          <li>Registering as an employer with HMRC and managing PAYE and National Insurance contributions.</li>
          <li>Complying with UK employment laws.</li>
          <li>Obtaining suitable Employer's Liability Insurance.</li>
        </ul>
        <p><em>[PLACEHOLDER: Please insert your detailed family/client terms here regarding safe working environments, providing meals if applicable, and adherence to agreed schedules.]</em></p>
        <h2>4. Cancellations (Temporary, Evening & Emergency Care)</h2>
        <p><em>[PLACEHOLDER: Please insert your cancellation policy here. For example: "Cancellations made within 24 hours of the booking start time will incur a charge of X% of the agency fee and nanny’s scheduled wages."]</em></p>
        <h2>5. Replacements and Refunds</h2>
        <p>If a permanent placement terminates within the first 8 weeks (the "Guarantee Period"), Marvza will endeavour to find one suitable replacement at no additional fee, provided the original fee was paid and the termination was not due to unreasonable demands by the Client.</p>
        <h2>5. Confidentiality</h2>
        <p>All Candidate information is strictly confidential and must not be passed to third parties. Unauthorised introductions to third parties will incur the full agency fee.</p>
        <h2>6. Candidate Terms</h2>
        <p><em>[PLACEHOLDER: Please insert candidate-specific terms here. Explain registration requirements, accuracy of CV/details, right-to-work documents, DBS requirements, safeguarding expectations, confidentiality, and what happens if they accept a placement.]</em></p>
        <h2>7. Liability</h2>
        <p>While Marvza thoroughly vets all Candidates, the final decision to employ rests with the Client. Marvza cannot be held liable for any loss resulting from the introduction or employment of a Candidate.</p>
      </LegalContent>
    </PublicLayout>
  )
}

export function SafeguardingPolicyPage() {
  return (
    <PublicLayout>
      <SEOMeta title="Safeguarding Policy" description="Marvza's commitment to child safety and our safeguarding procedures." canonical="https://marvza.com/safeguarding" />
      <LegalPageHero badge="Legal & Safety" title="Safeguarding Policy" updated="August 2026" />
      <LegalContent>
        <p>At Marvza, the safety and well-being of the children in our care is our highest priority.</p>
        <h2>1. Our Commitment</h2>
        <p>We believe every child has the right to be protected from harm. We enforce strict safeguarding standards across our agency and all childcare professionals we introduce.</p>
        <h2>2. Reporting Concerns</h2>
        <p>If you have any safeguarding concerns regarding a childcare professional introduced by Marvza, please contact our dedicated safeguarding officer immediately at <strong>safeguarding@marvza.com</strong> or call <strong>+44 7944 219712</strong>.</p>
        <p><em>[PLACEHOLDER: Insert full safeguarding policy, including candidate standards, regular checks, and escalation procedures here.]</em></p>
      </LegalContent>
    </PublicLayout>
  )
}

export function ComplaintsProcedurePage() {
  return (
    <PublicLayout>
      <SEOMeta title="Complaints Procedure" description="How to raise a complaint or concern with Marvza." canonical="https://marvza.com/complaints" />
      <LegalPageHero badge="Legal" title="Complaints Procedure" updated="August 2026" />
      <LegalContent>
        <p>We strive to provide an exceptional service to both families and childcare professionals. If you are dissatisfied with any aspect of our service, we want to hear from you so we can put it right.</p>
        <h2>1. How to raise a complaint</h2>
        <p>Please send details of your complaint to <strong>hello@marvza.com</strong>. We will acknowledge receipt of your complaint within 24 hours.</p>
        <h2>2. Our Process</h2>
        <p><em>[PLACEHOLDER: Insert details of your formal investigation process, timelines for resolution, and escalation paths here.]</em></p>
      </LegalContent>
    </PublicLayout>
  )
}
