import { Layout } from '@/components/layout/Layout';
import { Hero } from '@/components/sections/Hero';
import { Gigs } from '@/components/sections/Gigs';
import { Gallery } from '@/components/sections/Gallery';
import { Members } from '@/components/sections/Members';
import { getGigs, getGallery, getMembers, getHeroImage } from '@/lib/fetchers';

export const revalidate = 3600;

export default async function Home() {
  const [gigs, gallery, members, heroImage] = await Promise.all([
    getGigs(),
    getGallery(),
    getMembers(),
    getHeroImage(),
  ]);

  return (
    <Layout>
      {/* Video local tiene prioridad sobre imagen de Notion */}
      <Hero 
        heroVideo="/videos/hero.mp4" 
        heroImage={heroImage} 
      />
      <Gigs gigs={gigs} />
      <Gallery items={gallery} />
      <Members members={members} />
    </Layout>
  );
}