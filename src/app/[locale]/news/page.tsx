import type { Metadata } from "next";
import { PostIndex, postIndexMetadata } from "@/components/posts";
import type { Locale } from "@/lib/i18n";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return postIndexMetadata((await params).locale as Locale, "news");
}

export default async function Page({ params }: Props) {
  return <PostIndex locale={(await params).locale as Locale} type="news" />;
}
