import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://mdrycrdhktaifbvztwkd.supabase.co',
  'sb_publishable_llfjxrVlVf20p6cUuI_UCA_YQEgr-25'
);

export async function handler(event) {
  const id = event.queryStringParameters.id;

  const { data, error } = await supabase
    .from('files')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    return {
      statusCode: 404,
      body: JSON.stringify({ error: "Not found" })
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify(data)
  };
}
