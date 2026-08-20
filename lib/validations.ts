export function validateEmail(email: string): boolean {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

export function validatePassword(password: string): boolean {
  return password.length >= 6;
}

export function validateResumeText(text: string): { valid: boolean; message?: string } {
  if (!text || text.trim().length < 50) {
    return { valid: false, message: "Resume content is too short. Please provide at least 50 characters." };
  }
  return { valid: true };
}
