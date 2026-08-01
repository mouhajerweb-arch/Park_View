import { NextResponse } from 'next/server';

export function middleware(request) {
  const url = request.nextUrl.clone();
  const pathname = url.pathname;

  // Split pathname into segments, ignoring empty strings
  const segments = pathname.split('/').filter(Boolean);
  const first = segments[0];
  const second = segments[1];

  // Determine if URL ends with a language suffix
  const last = segments[segments.length - 1];
  const isLang = last === 'en' || last === 'ar';

  // If the path contains 'studio' segment, normalize it directly to clean /studio
  if (segments.includes('studio')) {
    if (first === 'en' || first === 'ar') {
      const subpath = pathname.substring(pathname.indexOf('/studio') + 7);
      url.pathname = '/studio' + subpath;
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  // Helper to identify asset prefixes or files
  const isAsset = (seg) => {
    if (!seg) return false;
    return (
      seg === '_next' ||
      seg === 'static' ||
      seg === 'api' ||
      seg === 'images' ||
      seg === 'cs-brandis-demo' ||
      seg === 'silka-font-demo' ||
      seg === 'terminal-guise' ||
      seg === 'icons' ||
      seg.includes('.') // bypass files with extensions (e.g. favicon.ico, manifest.json)
    );
  };

  // If request is for a static asset or Sanity Studio, let Next.js handle it
  if (isAsset(first) || first === 'studio') {
    return NextResponse.next();
  }

  // Redirect root to default Arabic suffix
  if (pathname === '/' || pathname === '') {
    url.pathname = '/ar';
    return NextResponse.redirect(url);
  }

  // If URL ends with a language suffix, strip it for internal routing
  if (isLang) {
    const strippedPath = '/' + segments.slice(0, -1).join('/') || '/';
    url.pathname = strippedPath;
    return NextResponse.rewrite(url);
  }

  // No language suffix – redirect preserving the original path and adding default Arabic suffix
  url.pathname = `${pathname.replace(/\/+$/,'')}/ar`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: '/:path*',
};
