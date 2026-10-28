import Link from 'next/link';
import { supabase, bn } from '../lib/supabase';

export const revalidate = 60; // refresh product list every minute

const ICON = { groceries: '🛒', clothing: '👕', food: '🍛', medicine: '💊' };

export default async function Home({ searchParams }) {
  const { data: categories = [] } = await supabase.from('categories').select('*').order('id');
  const active = categories.find((c) => c.slug === searchParams?.cat);

  let q = supabase
    .from('products')
    .select('id, name_bn, price_bdt, unit_bn, stock, category_id, shops(name_bn), categories(slug)')
    .order('created_at');
  if (active) q = q.eq('category_id', active.id);
  const { data: products = [] } = await q;

  return (
    <>
      <header>
        <div className="wrap">
          <Link href="/" className="logo">সম্পাড়া<span>বাজার</span></Link>
          <nav className="nav">
            <a href="/cart">কার্ট</a>
            <a href="/login">লগইন</a>
          </nav>
        </div>
      </header>

      <main className="wrap">
        <section className="hero">
          <h1>আপনার গ্রামের বাজার, এখন ঘরে বসেই</h1>
          <p>সম্পাড়ার দোকানগুলো থেকে মুদি, পোশাক, খাবার ও ঔষধ অর্ডার করুন।</p>
          <div className="fee">ডেলিভারি ফি মাত্র ১৫০ টাকা</div>
        </section>

        <nav className="cats" aria-label="ক্যাটাগরি">
          <Link href="/" className={!active ? 'on' : ''}>সব পণ্য</Link>
          {categories.map((c) => (
            <Link key={c.id} href={`/?cat=${c.slug}`} className={active?.id === c.id ? 'on' : ''}>
              {c.name_bn}
            </Link>
          ))}
        </nav>

        {products.length === 0 ? (
          <p className="empty">এই ক্যাটাগরিতে এখনো কোনো পণ্য নেই।</p>
        ) : (
          <div className="grid">
            {products.map((p) => (
              <article key={p.id} className="item">
                <div className="pic">{ICON[p.categories?.slug] || '🛍️'}</div>
                <div className="body">
                  <div className="name">{p.name_bn}</div>
                  <div className="meta">{p.unit_bn} · {p.shops?.name_bn}</div>
                  <div className="price">৳ {bn(p.price_bdt)}</div>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>

      <footer>
        <div className="wrap">শুধু সম্পাড়া এলাকায় ডেলিভারি · ক্যাশ অন ডেলিভারি, বিকাশ, নগদ</div>
      </footer>
    </>
  );
}
