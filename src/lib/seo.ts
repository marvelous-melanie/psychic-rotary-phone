interface SeoOptions {
  title: string;
  description: string;
  image?: string;
  canonicalUrl: string;
}

export type BuiltSeoMeta = {
  title: string;
  description: string;
  canonicalUrl: string;
  ogTitle: string;
  ogDescription: string;
  ogImage?: string;
  twitterCard: 'summary' | 'summary_large_image';
  twitterTitle: string;
  twitterDescription: string;
  twitterImage?: string;
};

export function buildSeoMeta({ title, description, image, canonicalUrl }: SeoOptions): BuiltSeoMeta {
  return {
    title,
    description,
    canonicalUrl,
    ogTitle: title,
    ogDescription: description,
    ogImage: image,
    twitterCard: image ? 'summary_large_image' : 'summary',
    twitterTitle: title,
    twitterDescription: description,
    twitterImage: image,
  };
}
