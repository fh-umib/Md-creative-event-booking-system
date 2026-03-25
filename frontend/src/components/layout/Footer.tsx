import { Camera, Globe, Mail, MapPin, Phone } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <h3 className="text-3xl font-semibold text-white">
            MD <span className="text-amber-500">Creative</span>
          </h3>
          <p className="mt-6 max-w-sm text-lg leading-8 text-slate-400">
            Premium event services in Kosovo. Creating extraordinary celebrations since 2018.
          </p>

          <div className="mt-6 flex gap-4">
            <a href="#" className="rounded-xl bg-slate-800 p-3 hover:bg-slate-700">
              <Camera size={20} />
            </a>
            <a href="#" className="rounded-xl bg-slate-800 p-3 hover:bg-slate-700">
              <Globe size={20} />
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-white">
            Services
          </h4>
          <div className="mt-6 flex flex-col gap-4">
            <Link to="/decorations" className="hover:text-white">Decorations</Link>
            <Link to="/mascots" className="hover:text-white">Mascot Characters</Link>
            <Link to="/activities" className="hover:text-white">Activities</Link>
            <Link to="/gallery" className="hover:text-white">Photo Experiences</Link>
            <Link to="/packages" className="hover:text-white">Event Packages</Link>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-white">
            Company
          </h4>
          <div className="mt-6 flex flex-col gap-4">
            <Link to="/gallery" className="hover:text-white">Event Gallery</Link>
            <Link to="/staff" className="hover:text-white">Our Team</Link>
            <Link to="/reviews" className="hover:text-white">Client Reviews</Link>
            <Link to="/booking" className="hover:text-white">Book an Event</Link>
            <Link to="/login" className="hover:text-white">My Account</Link>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-white">
            Contact
          </h4>
          <div className="mt-6 space-y-5">
            <div className="flex items-center gap-3">
              <Phone size={18} className="text-amber-500" />
              <span>+383 4X XXX XXX</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail size={18} className="text-amber-500" />
              <span>info@mdcreative.com</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin size={18} className="text-amber-500" />
              <span>Prishtina, Kosovo</span>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-800 px-6 py-5 text-center text-amber-400">
        June, July, August, and September are peak season months. Please book at least 1 week in advance.
      </div>

      <div className="border-t border-slate-800 px-6 py-6 text-center text-slate-500">
        © 2026 MD Creative — Magic.Event. All rights reserved.
      </div>
    </footer>
  );
}