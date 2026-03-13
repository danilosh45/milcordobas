import { Client } from '@notionhq/client';

const token = process.env.NOTION_TOKEN!;
const notion = new Client({ auth: token });

// ID de tu página "Mil cordobas" (del link que pasaste)
const PARENT_PAGE_ID = '321c8d73-de56-80e8-b53b-edda7d5e8953';

// Crear database de conciertos
async function createGigsDatabase(pageId: string) {
  const db = await notion.databases.create({
    parent: { page_id: pageId },
    title: [{ text: { content: 'Conciertos' } }],
    properties: {
      Nombre: { title: {} },
      Fecha: { date: {} },
      Ciudad: { rich_text: {} },
      Sala: { rich_text: {} },
      Entradas: { url: {} },
      Estado: {
        select: {
          options: [
            { name: 'Anunciado', color: 'green' },
            { name: 'Agotado', color: 'red' },
            { name: 'Cancelado', color: 'gray' }
          ]
        }
      }
    }
  });
  return db.id;
}

// Crear database de galería
async function createGalleryDatabase(pageId: string) {
  const db = await notion.databases.create({
    parent: { page_id: pageId },
    title: [{ text: { content: 'Galería' } }],
    properties: {
      Nombre: { title: {} },
      Fotos: { files: {} }
    }
  });
  return db.id;
}

// Crear database de miembros
async function createMembersDatabase(pageId: string) {
  const db = await notion.databases.create({
    parent: { page_id: pageId },
    title: [{ text: { content: 'Miembros' } }],
    properties: {
      Nombre: { title: {} },
      Rol: { rich_text: {} },
      Foto: { files: {} },
      Orden: { number: { format: 'number' } }
    }
  });
  return db.id;
}

async function main() {
  console.log('🔧 Setup Notion para Mil Córdoba...\n');
  console.log('📄 Usando página padre:', PARENT_PAGE_ID);

  try {
    const gigsId = await createGigsDatabase(PARENT_PAGE_ID);
    console.log('✅ Database Conciertos:', gigsId);

    const galleryId = await createGalleryDatabase(PARENT_PAGE_ID);
    console.log('✅ Database Galería:', galleryId);

    const membersId = await createMembersDatabase(PARENT_PAGE_ID);
    console.log('✅ Database Miembros:', membersId);

    console.log('\n🎉 Listo! Copia esto a tu .env.local:');
    console.log(`\nNOTION_GIGS_DATABASE_ID=${gigsId}`);
    console.log(`NOTION_GALLERY_DATABASE_ID=${galleryId}`);
    console.log(`NOTION_MEMBERS_DATABASE_ID=${membersId}`);

  } catch (error: any) {
    console.error('❌ Error:', error.message);
    if (error.code === 'unauthorized') {
      console.error('\n⚠️  Verifica que:');
      console.error('1. El token es correcto');
      console.error('2. La integración tiene permisos "Insert content"');
      console.error('3. La página está compartida con la integración (Share → Add connections)');
    }
  }
}

main();
