import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

function getSupabase() {
  if (!supabaseUrl || !supabaseKey) {
    throw new Error('MetroDEVOPS Hub connection is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to the portfolio deployment.');
  }

  return createClient(supabaseUrl, supabaseKey);
}

const WEBSITE_SLUG = 'metrodevops-ccf4be';

export async function loadWebsiteContent() {
  const supabase = getSupabase();
  const { data: website, error: websiteError } = await supabase
    .from('websites')
    .select('id, name, slug, status')
    .eq('slug', WEBSITE_SLUG)
    .eq('status', 'live')
    .single();

  if (websiteError) throw websiteError;

  const [contentResult, productsResult, servicesResult] = await Promise.all([
    supabase.from('website_content').select('*').eq('website_id', website.id).single(),
    supabase.from('products').select('*').eq('website_id', website.id).eq('is_published', true).order('display_order'),
    supabase.from('services').select('*').eq('website_id', website.id).eq('is_published', true).order('display_order'),
  ]);

  if (contentResult.error) throw contentResult.error;
  if (productsResult.error) throw productsResult.error;
  if (servicesResult.error) throw servicesResult.error;

  return {
    website,
    content: contentResult.data,
    products: productsResult.data ?? [],
    services: servicesResult.data ?? [],
  };
}
