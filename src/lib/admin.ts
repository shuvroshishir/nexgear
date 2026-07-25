export function isAdmin(email: string | null | undefined): boolean {
  if (!email) return false;
  
  const adminEmail = process.env.ADMIN_EMAIL || process.env.NEXT_PUBLIC_ADMIN_EMAIL;
  
  if (!adminEmail) return false;
  
  return email.trim().toLowerCase() === adminEmail.trim().toLowerCase();
}
