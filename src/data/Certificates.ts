import awsCloudPractitionerBadge from '@assets/images/certificates/aws-certified-cloud-practitioner.png';
import awsAiPractitionerBadge from '@assets/images/certificates/aws-certified-ai-practitioner.png';
import { CertificateItemType } from './types';

export const CERTIFICATES_DATA: CertificateItemType[] = [
  {
    title: 'AWS Certified Cloud Practitioner',
    issuer: 'Amazon Web Services',
    badgeImage: awsCloudPractitionerBadge,
    verificationUrl:
      'https://www.credly.com/badges/ee58a8d8-6dcf-433b-9d14-d29833b531b7',
    tags: ['Cloud Computing', 'AWS Core Services', 'Security & Architecture'],
    glowColors: ['#FF9900', '#F5853F', '#a855f7', '#FF9900'],
  },
  {
    title: 'AWS Certified AI Practitioner',
    issuer: 'Amazon Web Services',
    badgeImage: awsAiPractitionerBadge,
    verificationUrl:
      'https://www.credly.com/badges/38fd07b0-fad2-4c89-b569-f7d8ffdd441b',
    tags: ['Machine Learning', 'Generative AI', 'Responsible AI'],
    glowColors: ['#38bdf8', '#818cf8', '#c084fc', '#38bdf8'],
  },
];
