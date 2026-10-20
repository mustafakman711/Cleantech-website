import type { Metadata } from "next";
import { PostArticle, postMetadata, postStaticParams } from "@/components/posts";
import type { Locale } from "@/lib/i18n";

type Props = { params: Promise<{ locale: string; slug: string }> };

export const dynamicParams = false;

export function generateStaticParams({ params }: { params: { locale: string } }) {
  return postStaticParams(params.locale, "insights");
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  return postMetadata(locale as Locale, "insights", slug);
}

export default async function Page({ params }: Props) {
  const { locale, slug } = await params;
  return <PostArticle locale={locale as Locale} type="insights" slug={slug} />;
}
