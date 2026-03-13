import { Client } from '@notionhq/client';

export const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

export const NOTION_DATABASES = {
  gigs: process.env.NOTION_GIGS_DATABASE_ID!,
  gallery: process.env.NOTION_GALLERY_DATABASE_ID!,
  members: process.env.NOTION_MEMBERS_DATABASE_ID!,
};

export interface Gig {
  id: string;
  name: string;
  date: string;
  city: string;
  venue: string;
  ticketUrl?: string;
  status: string;
}

export interface GalleryItem {
  id: string;
  name: string;
  photos: string[];
}

export interface Member {
  id: string;
  name: string;
  role: string;
  photo?: string;
  order: number;
}
