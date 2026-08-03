import type { APIRoute } from 'astro';
import { getAuth } from '../../../lib/server';

export const prerender = false;

const handler: APIRoute = ({ request }) => getAuth(request).handler(request);

export const GET = handler;
export const POST = handler;
