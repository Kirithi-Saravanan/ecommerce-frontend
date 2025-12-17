import React from "react";

function Footer() {
  return (
    <footer className="mt-16 border-t bg-[#C8A27A]">
      <div className="max-w-6xl mx-auto px-8 py-10 flex flex-col md:flex-row md:items-start md:justify-between gap-12">
        <div className="space-y-6">
          <div className="inline-flex items-center border-2 border-slate-900 px-5 py-2">
            <span className="font-semibold text-lg italic">KIRAA</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 text-sm">
          <div>
            <h4 className="font-semibold text-slate-600 mb-3">Shop</h4>
            <ul className="space-y-2 text-slate-900">
              <li>Ethnic Wear</li>
              <li>Western Wear</li>
              <li>Sarees & Lehengas</li>
              <li>Accessories</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-slate-600 mb-3">About KIRAA</h4>
            <ul className="space-y-2 text-slate-900">
              <li>Our Story</li>
              <li>Careers</li>
              <li>Sustainability</li>
              <li>Store Locator</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-slate-600 mb-3">Help</h4>
            <ul className="space-y-2 text-slate-900">
              <li>FAQs</li>
              <li>Shipping & Returns</li>
              <li>Track Order</li>
              <li>Contact Support</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
