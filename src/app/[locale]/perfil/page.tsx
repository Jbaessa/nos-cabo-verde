"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useFavorites } from "@/lib/favorites-context";
import { islands, experiences } from "@/lib/data";
import { motion } from "framer-motion";

const PROFILE_KEY = "ncv_profile";
const BOOKINGS_KEY = "ncv_bookings";

type Profile = {
  name: string;
  email: string;
  interests: string[];
};

type Booking = {
  id: string;
  experienceTitle: string;
  island: string;
  checkIn: string;
  people: number;
  total: number;
  createdAt: string;
};

const interestOptions = [
  "Trekking", "Mergulho", "Kitesurf", "Gastronomia", "Cultura", "Música", "Fotografia", "Natureza",
];

export default function PerfilPage() {
  const t = useTranslations("profilePage");
  const locale = useLocale();
  const isEn = locale === "en";

  const { favorites } = useFavorites();
  const [profile, setProfile] = useState<Profile>({ name: "", email: "", interests: [] });
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [saved, setSaved] = useState(false);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    try {
      const p = localStorage.getItem(PROFILE_KEY);
      if (p) setProfile(JSON.parse(p));
      const b = localStorage.getItem(BOOKINGS_KEY);
      if (b) setBookings(JSON.parse(b));
    } catch {}
  }, []);

  function saveProfile() {
    localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
    setSaved(true);
    setEditing(false);
    setTimeout(() => setSaved(false), 3000);
  }

  function toggleInterest(interest: string) {
    setProfile((p) => ({
      ...p,
      interests: p.interests.includes(interest)
        ? p.interests.filter((i) => i !== interest)
        : [...p.interests, interest],
    }));
  }

  const savedIslands = islands.filter((i) => favorites.islands.includes(i.id));
  const savedExperiences = experiences.filter((e) => favorites.experiences.includes(e.id));

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-ncv-night pt-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 py-12 space-y-10">

          {/* Header */}
          <div>
            <p className="text-ncv-gold text-xs tracking-[0.3em] uppercase mb-4">{t("eyebrow")}</p>
            <h1 className="font-serif text-5xl text-white mb-2">
              {t("heading")} <span className="text-ncv-gold">{t("headingHighlight")}</span>
            </h1>
            <p className="text-white/50 font-sans text-base">{t("desc")}</p>
          </div>

          {/* Profile card */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl bg-white/5 border border-white/10 p-6 space-y-5"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-ncv-gold/20 flex items-center justify-center">
                  <span className="font-serif text-ncv-gold text-2xl">
                    {profile.name ? profile.name[0].toUpperCase() : "?"}
                  </span>
                </div>
                <div>
                  <h2 className="font-serif text-xl text-white">{profile.name || t("defaultName")}</h2>
                  <p className="text-white/40 text-sm font-sans">{profile.email || t("noEmail")}</p>
                </div>
              </div>
              <button
                onClick={() => setEditing((e) => !e)}
                className="btn btn-glass text-sm px-4 py-2"
              >
                {editing ? t("cancel") : t("edit")}
              </button>
            </div>

            {editing && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-4 pt-2"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white/60 text-xs font-sans mb-1.5">{t("nameLabel")}</label>
                    <input
                      type="text"
                      value={profile.name}
                      onChange={(e) => setProfile((p) => ({ ...p, name: e.target.value }))}
                      placeholder={t("namePlaceholder")}
                      className="w-full bg-white/8 border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm font-sans placeholder-white/30 focus:outline-none focus:border-ncv-gold/50 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-white/60 text-xs font-sans mb-1.5">{t("emailLabel")}</label>
                    <input
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile((p) => ({ ...p, email: e.target.value }))}
                      placeholder={t("emailPlaceholder")}
                      className="w-full bg-white/8 border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm font-sans placeholder-white/30 focus:outline-none focus:border-ncv-gold/50 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-white/60 text-xs font-sans mb-2.5">{t("interestsLabel")}</label>
                  <div className="flex flex-wrap gap-2">
                    {interestOptions.map((interest) => (
                      <button
                        key={interest}
                        onClick={() => toggleInterest(interest)}
                        className={`px-3 py-1.5 rounded-full text-xs font-sans transition-all duration-200 border ${
                          profile.interests.includes(interest)
                            ? "border-ncv-gold/60 bg-ncv-gold/15 text-ncv-gold"
                            : "border-white/10 text-white/50 hover:border-white/30 hover:text-white"
                        }`}
                      >
                        {interest}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button onClick={saveProfile} className="btn btn-gold px-6 py-2.5 text-sm">
                    {t("saveProfile")}
                  </button>
                  {saved && (
                    <span className="text-emerald-400 text-sm font-sans flex items-center gap-1.5">
                      <svg viewBox="0 0 20 20" className="w-4 h-4 fill-current">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {t("saved")}
                    </span>
                  )}
                </div>
              </motion.div>
            )}
          </motion.section>

          {/* Favorites summary */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-2xl text-white">{t("myFavorites")}</h2>
              <Link href={isEn ? "/en/favoritos" : "/favoritos"} className="text-ncv-gold text-sm font-sans hover:text-ncv-gold/70 transition-colors">
                {t("viewAll")}
              </Link>
            </div>

            {savedIslands.length === 0 && savedExperiences.length === 0 ? (
              <div className="rounded-2xl bg-white/5 border border-white/10 p-8 text-center">
                <p className="text-white/40 font-sans text-sm mb-3">{t("noFavorites")}</p>
                <Link href={isEn ? "/en/experiencias" : "/experiencias"} className="btn btn-gold-line text-sm px-5 py-2">
                  {t("exploreExperiences")}
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {savedIslands.slice(0, 2).map((island) => (
                  <Link
                    key={island.id}
                    href={isEn ? `/en/ilhas/${island.id}` : `/ilhas/${island.id}`}
                    className="group flex gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/8 border border-white/5 hover:border-white/15 transition-all duration-300"
                  >
                    <img src={island.image} alt={island.name} className="w-16 h-16 rounded-xl object-cover shrink-0" />
                    <div>
                      <p className="text-ncv-gold text-xs font-sans mb-1">{t("islandLabel")}</p>
                      <h3 className="font-serif text-base text-white">{island.name}</h3>
                      <p className="text-white/50 text-xs font-sans">{island.temperature} · {island.duration}</p>
                    </div>
                  </Link>
                ))}
                {savedExperiences.slice(0, 2).map((exp) => (
                  <Link
                    key={exp.id}
                    href={isEn ? `/en/experiencias/${exp.id}` : `/experiencias/${exp.id}`}
                    className="group flex gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/8 border border-white/5 hover:border-white/15 transition-all duration-300"
                  >
                    <img src={exp.image} alt={exp.title} className="w-16 h-16 rounded-xl object-cover shrink-0" />
                    <div>
                      <p className="text-ncv-gold text-xs font-sans mb-1">{exp.category}</p>
                      <h3 className="font-serif text-base text-white leading-tight">{exp.title}</h3>
                      <p className="text-white/50 text-xs font-sans">{exp.island} · {exp.price}€</p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </motion.section>

          {/* Bookings history */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <h2 className="font-serif text-2xl text-white">{t("bookingsHistory")}</h2>

            {bookings.length === 0 ? (
              <div className="rounded-2xl bg-white/5 border border-white/10 p-8 text-center">
                <p className="text-white/40 font-sans text-sm mb-3">{t("noBookings")}</p>
                <Link href={isEn ? "/en/experiencias" : "/experiencias"} className="btn btn-gold text-sm px-5 py-2.5">
                  {t("exploreExperiences")}
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {bookings.slice().reverse().map((booking) => (
                  <div
                    key={booking.id}
                    className="flex items-center justify-between gap-4 p-4 rounded-xl bg-white/5 border border-white/5"
                  >
                    <div>
                      <h3 className="font-serif text-base text-white">{booking.experienceTitle}</h3>
                      <p className="text-white/50 text-xs font-sans mt-0.5">
                        {booking.island} · {booking.checkIn} · {booking.people} {booking.people === 1 ? t("personSingular") : t("personPlural")}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-ncv-gold font-sans font-semibold">{booking.total}€</p>
                      <span className="inline-block mt-1 px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 text-xs font-sans">
                        {t("pending")}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.section>

        </div>
      </main>
      <Footer />
    </>
  );
}
