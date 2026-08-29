import AppHeader from "./AppHeader";
import Footer from "./Footer";

/**
 * Wraps all public-facing pages with the site header and footer.
 */
export default function PublicLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8F3EA]">
      <AppHeader />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
