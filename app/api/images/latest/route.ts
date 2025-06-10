import { supabase } from '@/lib/utils';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('imagenes')
      .select(`
        id,
        titulo,
        descripcion,
        url_cloudinary,
        fechas (fecha_desde)
      `)
      .eq('fechas.fecha_desde', supabase
        .from('fechas')
        .select('fecha_desde')
        .order('fecha_desde', { ascending: false })
        .limit(1)
        .single()
      )
      .order('created_at', { ascending: false })
      .limit(50);

    if (error) {
      console.error('Error fetching latest images:', error.message);
      return NextResponse.json({ error: 'Failed to fetch images' }, { status: 500 });
    }

    const formattedData = data?.map((img) => ({
      id: img.id,
      titulo: img.titulo,
      descripcion: img.descripcion,
      url_cloudinary: img.url_cloudinary,
      fecha_desde: img.fechas?.[0]?.fecha_desde || new Date().toISOString().split('T')[0],
    })) || [];

    return NextResponse.json(formattedData, { status: 200 });
  } catch (err) {
    console.error('Unexpected error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}