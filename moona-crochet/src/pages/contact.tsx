import { Layout } from "@/components/layout";
import { useState } from "react";
import { toast } from "sonner";
import { Mail, Phone, Instagram, Send, MessageCircle } from "lucide-react";

const WHATSAPP_NUMBER = "923089603471";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sending, setSending] = useState(false);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.email.trim() || !form.email.includes("@")) errs.email = "Valid email required";
    if (!form.message.trim()) errs.message = "Message is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSending(true);
    await new Promise(r => setTimeout(r, 800));
    toast.success("Message sent! 🌸", {
      description: "We'll get back to you as soon as possible.",
    });
    setForm({ name: "", email: "", message: "" });
    setSending(false);
  };

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi Moona Crochet! I'd like to get in touch 🧶")}`;

  return (
    <Layout>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[hsl(12,45%,95%)] via-background to-background pt-20 pb-14">
        <div className="animate-float absolute -top-16 -left-16 h-64 w-64 rounded-full bg-accent/30 blur-3xl pointer-events-none" />
        <div className="animate-float-slow absolute bottom-0 right-[8%] h-48 w-48 rounded-full bg-primary/14 blur-3xl pointer-events-none" />

        <div className="relative container mx-auto px-4 md:px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-accent/30 border border-accent/40 text-foreground/70 px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
            💬 Say Hello
          </div>
          <h1 className="font-serif font-black leading-none mb-5">
            <span className="block text-5xl md:text-7xl text-foreground">Get in</span>
            <span className="block text-5xl md:text-7xl italic text-primary">Touch</span>
          </h1>
          <p className="text-muted-foreground text-base md:text-lg max-w-xs mx-auto leading-relaxed font-light">
            Questions, custom orders, or just want to say hi — we'd love to hear from you.
          </p>
        </div>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <section className="container mx-auto px-4 md:px-6 py-14">
        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-8">

          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-5">
            <div>
              <h2 className="font-serif text-2xl font-black mb-1">Let's talk</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Reach out through any channel — we're always happy to help with orders, customs, or anything else.
              </p>
            </div>

            <div className="space-y-4">
              {/* WhatsApp */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-2xl border border-border/50 bg-card hover:border-green-400/50 hover:shadow-md group transition-all duration-200"
              >
                <div className="h-11 w-11 rounded-xl bg-green-100 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <MessageCircle className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-0.5">WhatsApp</p>
                  <p className="text-sm font-semibold">+92 308 960 3471</p>
                </div>
              </a>

              {/* Instagram */}
              <a
                href="https://instagram.com/moona.croachets03"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-2xl border border-border/50 bg-card hover:border-pink-400/50 hover:shadow-md group transition-all duration-200"
              >
                <div className="h-11 w-11 rounded-xl bg-pink-100 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <Instagram className="h-5 w-5 text-pink-600" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-0.5">Instagram</p>
                  <p className="text-sm font-semibold">@moona.croachets03</p>
                </div>
              </a>

              {/* Email */}
              <div className="flex items-center gap-4 p-4 rounded-2xl border border-border/50 bg-card">
                <div className="h-11 w-11 rounded-xl bg-primary/12 flex items-center justify-center flex-shrink-0">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-0.5">Email</p>
                  <p className="text-sm font-semibold">moonacrochet@gmail.com</p>
                </div>
              </div>
            </div>

            {/* Hours */}
            <div className="p-4 rounded-2xl bg-primary/8 border border-primary/20">
              <p className="text-xs font-bold uppercase tracking-widest text-primary mb-2">Response time</p>
              <p className="text-sm text-muted-foreground">We typically reply within <strong className="text-foreground">24 hours</strong> on WhatsApp and Instagram.</p>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <div className="bg-card border border-border/50 rounded-3xl p-7 shadow-sm">
              <h3 className="font-serif text-xl font-black mb-5">Send a message</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide block mb-1.5">Name</label>
                    <input
                      type="text"
                      placeholder="Your name"
                      value={form.name}
                      onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-xl border border-border/60 bg-background text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                    />
                    {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide block mb-1.5">Email</label>
                    <input
                      type="email"
                      placeholder="you@email.com"
                      value={form.email}
                      onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-xl border border-border/60 bg-background text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                    />
                    {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide block mb-1.5">Message</label>
                  <textarea
                    rows={5}
                    placeholder="Tell us about your order, custom request, or question..."
                    value={form.message}
                    onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-xl border border-border/60 bg-background text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                  />
                  {errors.message && <p className="text-xs text-destructive mt-1">{errors.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={sending}
                  className="w-full py-3.5 rounded-2xl bg-primary text-primary-foreground font-bold text-sm flex items-center justify-center gap-2 hover:opacity-90 active:scale-[0.98] transition-all duration-200 shadow-sm disabled:opacity-60"
                >
                  {sending ? (
                    <span className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                  ) : (
                    <><Send className="h-4 w-4" /> Send Message</>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
