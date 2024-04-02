import { redirect } from '@sveltejs/kit';
/** @type {import('./$types').PageServerLoad} */
export async function load() {
    return {};
};

export const actions = {
  default: async ({ request, fetch }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    const response = await fetch('http://localhost:5000/runs/start', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    await redirect(303, '/realtime');
  },
};
