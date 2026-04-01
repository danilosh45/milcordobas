import { Layout } from '@/components/layout/Layout';
import { Hero } from '@/components/sections/Hero';
import { Gigs } from '@/components/sections/Gigs';
import { Gallery } from '@/components/sections/Gallery';
import { Members } from '@/components/sections/Members';
import { getGigs, getGallery, getMembers, getHeroImage } from '@/lib/fetchers';

export const revalidate = 3600;

const CRIMES = ['Distorsión excesiva', 'Solos interminables', 'Grooves ilegales', 'Ritmos peligrosos'];

export default async function Home() {
  const [gigs, gallery, members, heroImage] = await Promise.all([
    getGigs(),
    getGallery(),
    getMembers(),
    getHeroImage(),
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
      <Members members={displayMembers} />
    </Layout>
  );
}
