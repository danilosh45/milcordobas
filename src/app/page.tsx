import { Layout } from '@/components/layout/Layout';
import { Hero } from '@/components/sections/Hero';
import { Gigs } from '@/components/sections/Gigs';
import { Gallery } from '@/components/sections/Gallery';
import { Members } from '@/components/sections/Members';
import { Store } from '@/components/sections/Store';
import { getGigs, getGallery, getMembers, getHeroImage, getProducts } from '@/lib/fetchers';

// Caché ISR de 1 minuto: los cambios en Notion se ven casi al instante
// sin saturar la API en cada visita.
export const revalidate = 60;

const CRIMES = ['Distorsión excesiva', 'Solos interminables', 'Grooves ilegales', 'Ritmos peligrosos'];

export default async function Home() {
  const [gigs, gallery, members, heroImage, products] = await Promise.all([
    getGigs(),
    getGallery(),
    getMembers(),
    getHeroImage(),
    getProducts(),
  ]);

  const displayMembers = members.map((m, i) => ({
    id: m.id,
    name: m.name,
    role: m.role,
    photo: m.photo ?? null,
    order: m.order,
    crimes: CRIMES[i % 4],
    wanted: `A${i + 1}`,
    since: '2019',
  }));

  return (
    <Layout>
      <Hero
        heroVideo="/videos/hero.mp4"
        heroImage={heroImage ?? null}
      />
      <Gigs gigs={gigs ?? []} />
      <Gallery items={gallery ?? []} />
      <Store products={products ?? []} />
      <Members members={displayMembers} />
    </Layout>
  );
}
