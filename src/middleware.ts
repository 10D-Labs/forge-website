import { NextRequest, NextResponse } from "next/server";
import { variants, defaultUrls } from "./config/download-variants";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Extract variant code from /download/[variant]
  const variant = pathname === "/download" ? null : pathname.replace("/download/", "");
  const urls = variant && variants[variant] ? variants[variant] : null;

  const ua = request.headers.get("user-agent") || "";
  const isAndroid = /android/i.test(ua);
  const isIOS = /iphone|ipad|ipod/i.test(ua);

  let destination: string;

  if (isAndroid) {
    destination = urls?.android ?? defaultUrls.android;
  } else if (isIOS) {
    destination = urls?.ios ?? defaultUrls.ios;
  } else {
    destination = defaultUrls.desktop;
  }

  // Absolute URLs (store links) get a full redirect; relative paths stay on-site
  if (destination.startsWith("http")) {
    return NextResponse.redirect(destination, 302);
  }

  const url = request.nextUrl.clone();
  url.pathname = destination;
  return NextResponse.redirect(url, 302);
}

export const config = {
  matcher: ["/download", "/download/:variant*"],
};
