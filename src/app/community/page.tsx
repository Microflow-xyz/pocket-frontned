import { Adaptability } from '@/app/community/Adaptability';
import { Awareness } from '@/app/community/Awareness';
import { CommunityAndCollaboration } from '@/app/community/CommunityAndCollaboration';
import { QuarterlyERAAllocation } from '@/app/community/QuarterlyERAAllocation';
import { Transparency } from '@/app/community/Transparency';

const CommunityPage = () => {
  return (
    <main className="flex flex-grow flex-col gap-8 p-6">
      <CommunityAndCollaboration />
      <Awareness />
      <Transparency />
      <Adaptability />
      <QuarterlyERAAllocation />
    </main>
  );
};

export default CommunityPage;
