export default function Footer() {
  return (
    <footer className="footer footer-center p-8 bg-base-200 text-base-content rounded mt-20">
      <nav className="grid grid-flow-col gap-4">
        <a href="/" className="link link-hover">Home</a>
        <a href="/artworks" className="link link-hover">Artworks</a>
        <a href="#" className="link link-hover">About us</a>
      </nav>
      <aside>
        <p>© 2026 ArtHub Online Art Marketplace. All rights reserved.</p>
      </aside>
    </footer>
  );
}