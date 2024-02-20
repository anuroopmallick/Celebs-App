export function calculateAge(dob: string) {
  const today = new Date();
  const birthDate = new Date(dob);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
}

export function calculateDOB(age: number): Date {
  const today = new Date();
  const birthYear = today.getFullYear() - age;
  const dob = new Date(birthYear, today.getMonth(), today.getDate());
  return dob;
}
