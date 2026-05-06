// Vercel Edge Middleware - Basic認証で社内向けパスワード保護
// 環境変数 BASIC_AUTH_USER と BASIC_AUTH_PASS をVercelダッシュボードで設定してください

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};

export default function middleware(request) {
  const basicAuth = request.headers.get('authorization');
  const url = new URL(request.url);

  const expectedUser = process.env.BASIC_AUTH_USER;
  const expectedPass = process.env.BASIC_AUTH_PASS;

  // 環境変数が未設定の場合は認証スキップ（開発用）
  if (!expectedUser || !expectedPass) {
    return new Response(null, { status: 200 });
  }

  if (basicAuth) {
    const authValue = basicAuth.split(' ')[1];
    const decoded = atob(authValue);
    const [user, pwd] = decoded.split(':');

    if (user === expectedUser && pwd === expectedPass) {
      return new Response(null, { status: 200 });
    }
  }

  return new Response('認証が必要です', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Secure Area"',
    },
  });
}
