import type { Metadata } from "next";
import CertificationsClient from "./CertificationsClient";

export const metadata: Metadata = {
  title: "Certifications | Harmanpreet Kaur",
  description:
    "Explore the verified academic credentials, professional certificates, and specialized training in AI, Machine Learning, and Full Stack Development completed by Harmanpreet Kaur.",
  keywords: [
    "Certifications",
    "Credentials",
    "Vanderbilt University",
    "Imperial College London",
    "IBM AI Developer",
    "Machine Learning Certifications",
    "Harmanpreet Kaur",
  ],
};

export default function CertificationsPage() {
  return <CertificationsClient />;
}
