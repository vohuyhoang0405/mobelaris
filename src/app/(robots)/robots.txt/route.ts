export async function GET() {
  return new Response(`User-agent: *
Disallow: /en/customer/*
Disallow: /en/cart*
Disallow: /en/checkout/*
Disallow: /en/ordertracking/*

Disallow: /es/customer/*
Disallow: /es/cart*
Disallow: /es/checkout/*
Disallow: /es/ordertracking/*
Disallow: /es-es/customer/*
Disallow: /es-es/cart*
Disallow: /es-es/checkout/*
Disallow: /es-es/ordertracking/*

Disallow: /fr/customer/*
Disallow: /fr/cart*
Disallow: /fr/checkout/*
Disallow: /fr/ordertracking/*
Disallow: /fr-fr/customer/*
Disallow: /fr-fr/cart*
Disallow: /fr-fr/checkout/*
Disallow: /fr-fr/ordertracking/*
Disallow: /fr-be/customer/*
Disallow: /fr-be/cart*
Disallow: /fr-be/checkout/*
Disallow: /fr-be/ordertracking/*

Disallow: /it/customer/*
Disallow: /it/cart*
Disallow: /it/checkout/*
Disallow: /it/ordertracking/*
Disallow: /it-it/customer/*
Disallow: /it-it/cart*
Disallow: /it-it/checkout/*
Disallow: /it-it/ordertracking/*

Disallow: /nl/customer/*
Disallow: /nl/cart*
Disallow: /nl/checkout/*
Disallow: /nl/ordertracking/*
Disallow: /nl-nl/customer/*
Disallow: /nl-nl/cart*
Disallow: /nl-nl/checkout/*
Disallow: /nl-nl/ordertracking/*
Disallow: /nl-be/customer/*
Disallow: /nl-be/checkout/*
Disallow: /nl-be/ordertracking/*

Disallow: /pt-pt/customer/*
Disallow: /pt-pt/cart*
Disallow: /pt-pt/checkout/*
Disallow: /pt-pt/ordertracking/*

Disallow: /de/customer/*
Disallow: /de/cart*
Disallow: /de/checkout/*
Disallow: /de/ordertracking/*
Disallow: /de-de/customer/*
Disallow: /de-de/cart*
Disallow: /de-de/checkout/*
Disallow: /de-de/ordertracking/*

Disallow: /at/customer/*
Disallow: /at/cart*
Disallow: /at/checkout/*
Disallow: /at/ordertracking/*
Disallow: /de-at/customer/*
Disallow: /de-at/cart*
Disallow: /de-at/checkout/*
Disallow: /de-at/ordertracking/*
Disallow: /de-at/en/*

Disallow: /pl-pl/customer/*
Disallow: /pl-pl/cart*
Disallow: /pl-pl/checkout/*
Disallow: /pl-pl/ordertracking/*

Disallow: /no/customer/*
Disallow: /no/cart*
Disallow: /no/checkout/*
Disallow: /no/ordertracking/*
Disallow: /no-no/customer/*
Disallow: /no-no/cart*
Disallow: /no-no/checkout/*
Disallow: /no-no/ordertracking/*

Disallow: /se/customer/*
Disallow: /se/cart*
Disallow: /se/checkout/*
Disallow: /se/ordertracking/*
Disallow: /sv-se/customer/*
Disallow: /sv-se/cart*
Disallow: /sv-se/checkout/*
Disallow: /sv-se/ordertracking/*
  `)
}
