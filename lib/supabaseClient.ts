import { createBrowserClient } from '@supabase/ssr';
import { createServerClient as createSSRServerClient } from '@supabase/ssr';
import type { NextApiRequest, NextApiResponse } from 'next';

// Para uso en el cliente (frontend)
export const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Para uso en el servidor (API routes o getServerSideProps)
export const createServerClient = (req: NextApiRequest, res: NextApiResponse) => {
  return createSSRServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      cookies: {
        get(name) {
          return req.cookies[name];
        },
        set(name, value, options) {
          const cookie = `${name}=${value}; Path=${options.path ?? '/'}; ${
            options.httpOnly ? 'HttpOnly; ' : ''
          }${options.secure ? 'Secure; ' : ''}SameSite=${options.sameSite ?? 'Lax'}`;

          res.setHeader('Set-Cookie', cookie);
        },
        remove(name, options) {
          res.setHeader(
            'Set-Cookie',
            `${name}=; Path=${options.path ?? '/'}; Max-Age=0`
          );
        },
      },
    }
  );
};
