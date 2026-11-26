import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const lang = z.enum(['tr', 'en']).default('tr');
const category = z.enum(['yazilim', 'drone', 'fotograf']);

/** Üç hizmet sayfası. Dosya adı = adres (ör. drone-cekimi-bodrum.md → /drone-cekimi-bodrum). */
const hizmetler = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/hizmetler' }),
  schema: ({ image }) =>
    z.object({
      lang,
      order: z.number(),
      /** Menü, kart ve breadcrumb adı */
      name: z.string(),
      /** <h1> */
      title: z.string(),
      /** <title> (≤ 60 karakter) */
      seoTitle: z.string().max(60),
      /** meta description (≤ 155 karakter) */
      description: z.string().max(155),
      lead: z.string(),
      /** Kart alt başlığı */
      tagline: z.string(),
      heroImage: image().optional(),
      heroPlaceholder: z.string(),
      /** Hero görseli için portfolyo çekimi (media manifest slug'ı) */
      heroShoot: z.string().optional(),
      proof: z.array(z.object({ value: z.string(), label: z.string() })),
      scope: z.array(z.object({ title: z.string(), desc: z.string(), icon: z.string().optional(), shoot: z.string().optional() })),
      process: z.array(z.object({ title: z.string(), desc: z.string() })),
      faq: z.array(z.object({ q: z.string(), a: z.string() })),
      workCategory: category,
      whatsappMessage: z.string(),
    }),
});

/** Müşteri işleri. Dosya adı = adres (ör. narin-mermer.md → /isler/narin-mermer). */
const isler = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/isler' }),
  schema: ({ image }) =>
    z.object({
      lang,
      name: z.string(),
      sector: z.string(),
      location: z.string(),
      category: z.array(category).min(1),
      url: z.string().url().optional(),
      /** Aynı müşterinin portfolyo çekimi (media manifest slug'ı); tek sayfada birleşir */
      shoot: z.string().optional(),
      year: z.number().optional(),
      /** Kartlarda tek satır: ne yapıldı */
      summary: z.string().max(140),
      languages: z.array(z.string()).default(['Türkçe']),
      stack: z.array(z.string()).default([]),
      featured: z.boolean().default(false),
      order: z.number().default(100),
      desktopShot: image().optional(),
      mobileShot: image().optional(),
      testimonial: z.object({ quote: z.string(), author: z.string() }).optional(),
    }),
});

export const collections = { hizmetler, isler };
