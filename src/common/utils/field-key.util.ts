export class FieldKeyUtil {
  /**
   * Converts field name to key format (lowercase, spaces to underscores)
   * @param name - The field name to convert
   * @returns The generated key
   */
  static generateKey(name: string): string {
    return name
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '_')
      .replace(/[^a-z0-9_]/g, '');
  }

  /**
   * Validates if a key is properly formatted
   * @param key - The key to validate
   * @returns True if valid, false otherwise
   */
  static isValidKey(key: string): boolean {
    return /^[a-z0-9_]+$/.test(key);
  }
}