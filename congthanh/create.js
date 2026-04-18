import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://mdrycrdhktaifbvztwkd.supabase.co',
  'sb_publishable_llfjxrVlVf20p6cUuI_UCA_YQEgr-25'
);

function randomId() {
  return Math.random().toString(36).substring(2, 8);
}

export async function handler(event) {
  const { content, filename } = JSON.parse(event.body);

  const id = randomId();

  const { data, error } = await supabase
    .from('files')
    .insert([{ id, content, filename }])
    .select();

  if (error) {
    console.log("ERROR:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }

  console.log("DATA:", data);

  return {
    statusCode: 200,
    body: JSON.stringify({
      id,
      raw: `/raw/${id}/${filename}`,
      view: `/view/${id}`
    })
  };
}
