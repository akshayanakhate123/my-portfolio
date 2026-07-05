"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import type { User } from "@supabase/supabase-js";

export default function AuthButton() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        const currentUser = session?.user ?? null;
        setUser(currentUser);

        // Log visit when a new sign-in occurs
        if (event === "SIGNED_IN" && currentUser) {
          await supabase.from("page_visits").insert({
            user_id:    currentUser.id,
            email:      currentUser.email,
            name:       currentUser.user_metadata?.full_name ?? null,
            referrer:   document.referrer || null,
            user_agent: navigator.userAgent,
          });
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const signIn = () =>
    supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: window.location.origin },
    });

  const signOut = async () => {
    await supabase.auth.signOut();
    setShowMenu(false);
  };

  if (loading) return null;

  const initials = user?.user_metadata?.full_name
    ? (user.user_metadata.full_name as string)
        .split(" ")
        .map((n: string) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : user?.email?.[0]?.toUpperCase() ?? "?";

  return (
    <div className="fixed top-5 right-5 z-50">
      {user ? (
        <div className="relative">
          <button
            onClick={() => setShowMenu(v => !v)}
            className="w-9 h-9 rounded-full bg-accent text-black font-mono text-xs font-black flex items-center justify-center shadow-lg hover:bg-accent/90 transition-colors"
            aria-label="Account menu"
          >
            {initials}
          </button>

          {showMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-[#111114] border border-white/10 rounded-xl shadow-2xl py-2 text-left">
              <p className="px-4 py-1 text-[10px] font-mono text-white/30 uppercase tracking-widest truncate">
                {user.email}
              </p>
              <div className="my-1 h-px bg-white/8" />
              <button
                onClick={signOut}
                className="w-full text-left px-4 py-2 text-xs font-mono text-white/50 hover:text-white hover:bg-white/5 transition-colors uppercase tracking-widest"
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      ) : (
        <button
          onClick={signIn}
          className="px-4 py-2 bg-white/5 border border-white/10 rounded-full font-mono text-[10px] text-white/50 hover:text-white hover:border-white/30 hover:bg-white/10 transition-all uppercase tracking-widest"
        >
          Sign In
        </button>
      )}
    </div>
  );
}
