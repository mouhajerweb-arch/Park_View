'use client';
import LegalPage from '../../components/LegalPage';
import { termsFallback } from '../../content/legalContent';

export default function TermsPage() {
  return <LegalPage documentId="termsPage" fallback={termsFallback} />;
}
