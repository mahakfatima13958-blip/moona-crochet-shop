import { Layout } from "@/components/layout";
import { Link } from "wouter";
import { Calendar, ArrowRight } from "lucide-react";

const posts = [
  {
    id: 1,
    title: "How I Started Moona Crochet",
    date: "April 20, 2025",
    tag: "Story",
    tagColor: "bg-primary/15 text-primary",
    excerpt: "It all began with a single ball of yarn and a dream. I picked up my first crochet hook as a hobby during quiet evenings, and slowly those little stitches turned into something I never expected — a brand made with love.",
    readTime: "3 min read",
    emoji: "🧶",
  },
  {
    id: 2,
    title: "My Top 5 Yarn Brands for Beginners",
    date: "April 28, 2025",
    tag: "Tips",
    tagColor: "bg-amber-100 text-amber-700",
    excerpt: "Choosing the right yarn can make or break your crochet experience. After years of crocheting, I've tested dozens of yarn brands — here are the five I always recommend to anyone just starting out.",
    readTime: "5 min read",
    emoji: "🌸",
  },
  {
    id: 3,
    title: "Behind the Scenes: How a Keychain is Made",
    date: "May 2, 2025",
    tag: "Process",
    tagColor: "bg-rose-100 text-rose-600",
    excerpt: "Every tiny keychain you see in my shop starts as a skein of yarn and ends up as something precious you can carry in your pocket. Let me walk you through the whole process — from choosing colors to final packaging.",
    readTime: "4 min read",
    emoji: "✨",
  },
  {
    id: 4,
    title: "Custom Orders: Everything You Need to Know",
    date: "May 5, 2025",
    tag: "Guide",
    tagColor: "bg-purple-100 text-purple-600",
    excerpt: "Custom orders are my absolute favourite part of running Moona Crochet. Someone describes a vision, and I get to bring it to life stitch by stitch. Here's how it works and how to request yours.",
    readTime: "4 min read",
    emoji: "💌",
  },
];

export default function Blog() {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[hsl(343,58%,96%)] via-background to-background pt-20 pb-14">
        <div className="animate-float absolute -top-20 -right-16 h-64 w-64 rounded-full bg-primary/16 blur-3xl pointer-events-none" />
        <div className="animate-float-slow absolute bottom-0 left-[10%] h-48 w-48 rounded-full bg-accent/25 blur-3xl pointer-events-none" />
        <span className="animate-float absolute top-14 right-[14%] text-primary/20 font-serif text-7xl select-none pointer-events-none hidden lg:block">✦</span>

        <div className="relative container mx-auto px-4 md:px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-primary/12 border border-primary/25 text-primary px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-6 shadow-sm">
            📝 Journal
          </div>
          <h1 className="font-serif font-black leading-none mb-5">
            <span className="block text-5xl md:text-7xl text-foreground">The Moona</span>
            <span className="block text-5xl md:text-7xl italic text-primary">Blog</span>
          </h1>
          <p className="text-muted-foreground text-base md:text-lg max-w-xs mx-auto leading-relaxed font-light">
            Crochet tips, behind-the-scenes stories, and a little bit of everything.
          </p>
        </div>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      {/* Posts */}
      <section className="container mx-auto px-4 md:px-6 py-14">
        <div className="max-w-2xl mx-auto space-y-6">
          {posts.map((post) => (
            <article
              key={post.id}
              className="group bg-card border border-border/50 rounded-3xl p-7 hover:border-primary/30 hover:shadow-md transition-all duration-300"
            >
              <div className="flex items-start gap-5">
                <div className="h-14 w-14 flex-shrink-0 rounded-2xl bg-primary/10 flex items-center justify-center text-2xl">
                  {post.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <span className={`text-[11px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full ${post.tagColor}`}>
                      {post.tag}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      {post.date}
                    </span>
                    <span className="text-xs text-muted-foreground">{post.readTime}</span>
                  </div>
                  <h2 className="font-serif text-xl font-black mb-2 leading-snug group-hover:text-primary transition-colors duration-200">
                    {post.title}
                  </h2>
                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                  <button className="mt-4 flex items-center gap-1.5 text-xs font-bold text-primary hover:gap-2.5 transition-all duration-200">
                    Read more <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Newsletter CTA */}
        <div className="max-w-2xl mx-auto mt-12">
          <div className="bg-gradient-to-br from-primary/10 to-accent/15 border border-primary/20 rounded-3xl p-8 text-center">
            <div className="text-3xl mb-3">✉️</div>
            <h3 className="font-serif text-2xl font-black mb-2">Stay in the loop</h3>
            <p className="text-sm text-muted-foreground mb-5">New posts, behind-the-scenes content, and exclusive drops — right to your inbox.</p>
            <div className="flex gap-2 max-w-sm mx-auto">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 px-4 py-2.5 rounded-xl border border-border/60 bg-background text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
              />
              <button className="px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-bold hover:opacity-90 transition-opacity">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
