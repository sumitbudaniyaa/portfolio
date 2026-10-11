export type ClassValue =
  | string
  | number
  | boolean
  | undefined
  | null
  | ClassValue[]
  | { [key: string]: any };

function flattenClasses(...inputs: ClassValue[]): string[] {
  const classes: string[] = [];

  for (const input of inputs) {
    if (!input) continue;
    if (typeof input === "string" || typeof input === "number") {
      classes.push(...String(input).trim().split(/\s+/));
    } else if (Array.isArray(input)) {
      classes.push(...flattenClasses(...input));
    } else if (typeof input === "object") {
      for (const [key, value] of Object.entries(input)) {
        if (value) classes.push(...key.trim().split(/\s+/));
      }
    }
  }

  return classes.filter(Boolean);
}

export function cn(...inputs: ClassValue[]): string {
  const tokens = flattenClasses(...inputs);
  // Ensure later bg-* utility classes override earlier bg-* utility classes
  let lastBgIndex = -1;
  for (let i = 0; i < tokens.length; i++) {
    if (/^bg-(?!linear|gradient|clip|origin|repeat|no-repeat|bottom|center|left|right|top|fixed|local|scroll|auto|cover|contain)/.test(tokens[i])) {
      lastBgIndex = i;
    }
  }
  if (lastBgIndex !== -1) {
    return tokens
      .filter((t, i) => {
        if (i === lastBgIndex) return true;
        return !/^bg-(?!linear|gradient|clip|origin|repeat|no-repeat|bottom|center|left|right|top|fixed|local|scroll|auto|cover|contain)/.test(t);
      })
      .join(" ");
  }
  return tokens.join(" ");
}
