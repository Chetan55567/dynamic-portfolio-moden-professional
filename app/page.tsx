import { getProfileData } from '@/lib/storage';
import PortfolioPage from '@/components/sections/PortfolioPage';

export const dynamic = 'force-dynamic';

export default function HomePage() {
  const { profile, settings } = getProfileData();

  return (
    <main className="w-screen overflow-x-hidden">
      <PortfolioPage profile={profile} settings={settings} />
    </main>
  );
}
