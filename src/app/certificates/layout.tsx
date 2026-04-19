import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Certificate Verification',
  description: 'Officially verify Advanced Inspection Est. certificates using our secure online registry.',
};

export default function CertificatesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
