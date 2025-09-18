
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function BudayaKerjaPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/tentang-kami/visi-misi');
  }, [router]);

  return null;
}
