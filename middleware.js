export const config = {
  // Apenas bloqueia a raiz. Mude para '/:path*' para bloquear TUDO do site se possuir outras abas.
  matcher: '/',
};

export default function middleware(request) {
  // O Vercel injeta os IPs nestes cabeçalhos automaticamente
  const ip = request.headers.get('x-real-ip') || request.headers.get('x-forwarded-for');
  
  // INSTRUÇÃO: Cole o número de IP da rede Wi-Fi da empresa aqui!
  // Descubra seu IP digitando "meu ip" no Google pelo Wi-Fi da empresa.
  const ipsAutorizados = [
    '177.69.243.49', // IP restrito da empresa
  ];

  // Regra de Bloqueio (ignora se for acesso local 'null' ou '::1' em testes na sua máquina)
  if (ip && !ipsAutorizados.includes(ip) && ip !== '::1' && ip !== '127.0.0.1') {
    return new Response(
      `Acesso Negado: Este painel está restrito apenas para a rede interna da empresa.\n(Seu IP foi identificado como: ${ip})`, 
      { 
        status: 403,
        headers: { 'Content-Type': 'text/plain; charset=utf-8' }
      }
    );
  }
}
