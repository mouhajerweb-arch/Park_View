'use client';
import LegalPage from '../../components/LegalPage';
import { privacyFallback } from '../../content/legalContent';

export default function PrivacyPage() {
  return <LegalPage documentId="privacyPage" fallback={privacyFallback} />;
}
