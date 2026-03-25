import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";

const sections = [
  "intro",
  "legal",
  "eligibility",
  "contract",
  "responsibilities",
  "buyer",
  "payments",
  "dispute",
  "privacy",
  "risk",
  "termination",
  "updates",
  "contact",
];

const Section = ({ id, title, children }) => (
  <section id={id} className="scroll-mt-24 mb-10">
    <h2 className="text-xl md:text-2xl font-semibold text-green-700 mb-3">
      {title}
    </h2>
    <div className="text-gray-600 leading-relaxed space-y-2 text-[15px]">
      {children}
    </div>
  </section>
);

const NavItem = ({ label, href, active }) => (
  <a
    href={href}
    className={`block text-sm py-1 transition ${
      {
        true: "text-green-700 font-semibold",
        false: "text-gray-500 hover:text-green-700",
      }[active]
    }`}
  >
    {label}
  </a>
);

const FarmerPolicy = () => {
  const [activeSection, setActiveSection] = useState("intro");

  useEffect(() => {
    const handleScroll = () => {
      let current = "intro";
      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop - 120;
          if (window.scrollY >= top) {
            current = id;
          }
        }
      });
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="flex min-h-screen bg-[#f6f9f7]">
      <Sidebar />

      <div className="flex-1 px-6 py-8 md:px-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Content */}
          <div className="lg:col-span-3 bg-white rounded-3xl shadow-lg p-8 md:p-10">
            <div className="mb-10">
              <h1 className="text-3xl md:text-4xl font-bold text-green-800 mb-2">
                Farmer Policy & Regulations
              </h1>
              <p className="text-gray-400 text-sm">
                Transparent • Secure • Legally Aligned
              </p>
            </div>

            <Section id="intro" title="1. Introduction">
              <p>FarmLink enables secure and transparent contract farming.</p>
            </Section>

            <Section id="legal" title="2. Legal Framework">
              <ul className="list-disc ml-6">
                <li>Indian Contract Act</li>
                <li>IT Act</li>
              </ul>
            </Section>

            <Section id="eligibility" title="3. Farmer Eligibility">
              <ul className="list-disc ml-6">
                <li>18+ age</li>
                <li>Valid ID</li>
              </ul>
            </Section>

            <Section id="contract" title="4. Contract Creation">
              <p>Binding after acceptance.</p>
            </Section>

            <Section id="responsibilities" title="5. Responsibilities">
              <p>Follow contract rules.</p>
            </Section>

            <Section id="buyer" title="6. Buyer">
              <p>Fair practices.</p>
            </Section>

            <Section id="payments" title="7. Payments">
              <p>Mutual pricing.</p>
            </Section>

            <Section id="dispute" title="8. Dispute">
              <p>Resolve via negotiation.</p>
            </Section>

            <Section id="privacy" title="9. Privacy">
              <p>Data is secure.</p>
            </Section>

            <Section id="risk" title="10. Risk">
              <p>Agriculture risks exist.</p>
            </Section>

            <Section id="termination" title="11. Termination">
              <p>Policy violations lead to suspension.</p>
            </Section>

            <Section id="updates" title="12. Updates">
              <p>Policies may change.</p>
            </Section>

            <Section id="contact" title="13. Contact">
              <p>Email: support@farmlink.com</p>
            </Section>
          </div>

          {/* Right Nav */}
          <div className="hidden lg:block">
            <div className="sticky top-24 bg-white rounded-2xl shadow p-5 max-h-[80vh] overflow-y-auto">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">
                On this page
              </h3>
              <nav className="space-y-1">
                <NavItem
                  label="Introduction"
                  href="#intro"
                  active={activeSection === "intro"}
                />
                <NavItem
                  label="Legal"
                  href="#legal"
                  active={activeSection === "legal"}
                />
                <NavItem
                  label="Eligibility"
                  href="#eligibility"
                  active={activeSection === "eligibility"}
                />
                <NavItem
                  label="Contract"
                  href="#contract"
                  active={activeSection === "contract"}
                />
                <NavItem
                  label="Responsibilities"
                  href="#responsibilities"
                  active={activeSection === "responsibilities"}
                />
                <NavItem
                  label="Buyer"
                  href="#buyer"
                  active={activeSection === "buyer"}
                />
                <NavItem
                  label="Payments"
                  href="#payments"
                  active={activeSection === "payments"}
                />
                <NavItem
                  label="Dispute"
                  href="#dispute"
                  active={activeSection === "dispute"}
                />
                <NavItem
                  label="Privacy"
                  href="#privacy"
                  active={activeSection === "privacy"}
                />
                <NavItem
                  label="Risk"
                  href="#risk"
                  active={activeSection === "risk"}
                />
                <NavItem
                  label="Termination"
                  href="#termination"
                  active={activeSection === "termination"}
                />
                <NavItem
                  label="Updates"
                  href="#updates"
                  active={activeSection === "updates"}
                />
                <NavItem
                  label="Contact"
                  href="#contact"
                  active={activeSection === "contact"}
                />
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmerPolicy;
