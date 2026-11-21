export default function manifest() {
  return {
    name: 'Park View Yaafour', short_name: 'Park View',
    description: 'Private residential community in Yaafour, Damascus.',
    start_url: '/ar', display: 'standalone', background_color: '#f6f2ec', theme_color: '#2e4435',
    icons: [{ src: '/images/logo.png', sizes: '512x512', type: 'image/png' }],
  };
}
