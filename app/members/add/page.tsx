import { Suspense } from 'react';
import AddMemberPage from './AddMemberPage';

export default function Page() {
  return (
    <Suspense fallback={null}> {/* fallback игнорируется — используется loading.tsx */}
      <AddMemberPage />
    </Suspense>
  );
}