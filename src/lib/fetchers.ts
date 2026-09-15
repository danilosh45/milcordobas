import { notion, NOTION_DATABASES, type Gig, type GalleryItem, type Member, type Product } from './notion';

const getTitle = (prop: any) => prop?.title?.[0]?.plain_text || '';
const getText = (prop: any) => prop?.rich_text?.[0]?.plain_text || '';
const getDate = (prop: any) => prop?.date?.start || '';
const getUrl = (prop: any) => prop?.url || '';
const getSelect = (prop: any) => prop?.select?.name || '';
const getNumber = (prop: any) => prop?.number || 0;
const getMultiSelect = (prop: any) =>
  prop?.multi_select?.map((s: any) => s.name).filter(Boolean) || [];
const getFiles = (prop: any) =>
  prop?.files?.map((f: any) => f.file?.url || f.external?.url).filter(Boolean) || [];

function toPlain<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

export async function getGigs(): Promise<Gig[]> {
  try {
    if (!NOTION_DATABASES.gigs) return [];
    const response = await notion.databases.query({
      database_id: NOTION_DATABASES.gigs,
      sorts: [{ property: 'Fecha', direction: 'ascending' }],
    });
    return toPlain(response.results.map((page: any) => ({
      id: page.id,
      name: getTitle(page.properties.Nombre),
      date: getDate(page.properties.Fecha),
      city: getText(page.properties.Ciudad),
      venue: getText(page.properties.Sala),
      ticketUrl: getUrl(page.properties.Entradas),
      status: getSelect(page.properties.Estado) || 'Anunciado',
      poster: getFiles(page.properties.Cartel)[0] ?? null,
    })));
  } catch (e) {
    console.error('[getGigs] Error:', e);
    return [];
  }
}

export async function getGallery(): Promise<GalleryItem[]> {
  try {
    if (!NOTION_DATABASES.gallery) return [];
    const response = await notion.databases.query({
      database_id: NOTION_DATABASES.gallery,
    });
    return toPlain(response.results.map((page: any) => ({
      id: page.id,
      name: getTitle(page.properties.Nombre),
      photos: getFiles(page.properties.Fotos),
    })));
  } catch (e) {
    console.error('[getGallery] Error:', e);
    return [];
  }
}

export async function getMembers(): Promise<Member[]> {
  try {
    if (!NOTION_DATABASES.members) return [];
    const response = await notion.databases.query({
      database_id: NOTION_DATABASES.members,
      sorts: [{ property: 'Orden', direction: 'ascending' }],
    });
    return toPlain(response.results.map((page: any) => ({
      id: page.id,
      name: getTitle(page.properties.Nombre),
      role: getText(page.properties.Rol),
      photo: getFiles(page.properties.Foto)[0] ?? null,
      order: getNumber(page.properties.Orden),
    })));
  } catch (e) {
    console.error('[getMembers] Error:', e);
    return [];
  }
}

export async function getProducts(): Promise<Product[]> {
  try {
    if (!NOTION_DATABASES.store) return [];
    const response = await notion.databases.query({
      database_id: NOTION_DATABASES.store,
      sorts: [{ property: 'Orden', direction: 'ascending' }],
    });
    return toPlain(response.results.map((page: any) => ({
      id: page.id,
      name: getTitle(page.properties.Nombre),
      description: getText(page.properties.Descripción),
      price: getText(page.properties.Precio),
      photos: getFiles(page.properties.Fotos),
      sizes: getMultiSelect(page.properties.Tallas),
      status: getSelect(page.properties.Estado) || 'Disponible',
      url: getUrl(page.properties.Enlace),
      order: getNumber(page.properties.Orden),
    })));
  } catch (e) {
    console.error('[getProducts] Error:', e);
    return [];
  }
}

export async function getHeroImage(): Promise<string | null> {
  try {
    if (!NOTION_DATABASES.gallery) return null;
    const response = await notion.databases.query({
      database_id: NOTION_DATABASES.gallery,
      page_size: 1,
    });
    if (response.results.length === 0) return null;
    const firstItem = response.results[0] as any;
    const photos = getFiles(firstItem.properties.Fotos);
    return photos[0] ?? null;
  } catch (e) {
    console.error('[getHeroImage] Error:', e);
    return null;
  }
}
