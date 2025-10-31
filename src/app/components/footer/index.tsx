export default function Footer() {
  return (
    <footer className="bg-[#0e1a40] text-[#c39439] border-t border-[#1a237e] py-6 mt-16">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0">
        <p className="text-sm font-light">
          © {new Date().getFullYear()} Ravenclaw Library. All Rights Reserved.
        </p>

        <div className="flex space-x-4">
          <a href="#" className="hover:text-[#bfa76f] transition-colors">Twitter</a>
          <a href="#" className="hover:text-[#bfa76f] transition-colors">Instagram</a>
          <a href="#" className="hover:text-[#bfa76f] transition-colors">Contact</a>
        </div>
      </div>
    </footer>
  );
}
