/**
 * Utility to fetch from the Spring Boot API with authentication
 */
export async function fetchWithAuth(url: string, options?: RequestInit) {
  // En Next.js 15 avec Better Auth, on récupère la session côté serveur ou client
  // Pour cet exemple, on suppose que le token est stocké dans un cookie ou géré par Better Auth
  
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';
  
  // Simulation de récupération de token (à adapter selon Better Auth)
  const token = ''; // session?.session.token
  
  return fetch(`${baseUrl}${url}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options?.headers,
    },
  });
}
