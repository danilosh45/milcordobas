import { notion, NOTION_DATABASES, type Gig, type GalleryItem, type Member } from './notion';

const getTitle = (prop: any) => prop?.title?.[0]?.plain_text || '';
const getText = (prop: any) => prop?.rich_text?.[0]?.plain_text || '';
const getDate = (prop: any) => prop?.date?.start || '';
const getUrl = (prop: any) => prop?.url || '';
const getSelect = (prop: any) => prop?.select?.name || '';
const getNumber = (prop: any) => prop?.number || 0;
const getFiles = (prop: any) => prop?.files?.map((f: any) => f.file?.url || f.external?.url) || [];

export async function getGigs(): Promise<Gig[]> {
  const response = await notion.databases.query({
    database_id: NOTION_DATABASES.gigs,
    filter: { property: 'Fecha', date: { on_or_after: new Date().toISOString().split('T')[0] } },
    sorts: [{ property: 'Fecha', direction: 'ascending' }],
  });

  return response.results.map((page: any) => ({
    id: page.id,
    name: getTitle(page.properties.Nombre),
    date: getDate(page.properties.Fecha),
    city: getText(page.properties.Ciudad),
    venue: getText(page.properties.Sala),
    ticketUrl: getUrl(page.properties.Entradas),
    status: getSelect(page.properties.Estado) || 'Anunciado',
  }));
}

export async function getGallery(): Promise<GalleryItem[]> {
  const response = await notion.databases.query({
    database_id: NOTION_DATABASES.gallery,
    // Sin sorts por ahora, o usa Nombre si quieres ordenar
  });

  return response.results.map((page: any) => ({
    id: page.id,
    name: getTitle(page.properties.Nombre),
    photos: getFiles(page.properties.Fotos),
  }));
}

export async function getMembers(): Promise<Member[]> {
  const response = await notion.databases.query({
    database_id: NOTION_DATABASES.members,
    sorts: [{ property: 'Orden', direction: 'ascending' }],
  });

  return response.results.map((page: any) => ({
    id: page.id,
    name: getTitle(page.properties.Nombre),
    role: getText(page.properties.Rol),
    photo: getFiles(page.properties.Foto)[0],
    order: getNumber(page.properties.Orden),
  }));
}


// 👇 AÑADE ESTO AQUÍ AL FINAL 👇
export async function getHeroImage(): Promise<string | null> {
  const response = await notion.databases.query({
    database_id: NOTION_DATABASES.gallery,
    page_size: 1,
  });

  if (response.results.length === 0) return null;

  const firstItem = response.results[0] as any;
  const photos = getFiles(firstItem.properties.Fotos);

  return photos[0] || null;
}
