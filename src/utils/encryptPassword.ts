import { pbkdf2Sync } from 'crypto';

export default function encryptPassword(password: string, salt: string): string {
  const encrypted: string = pbkdf2Sync(
    password,
    salt,
    200000,
    64,
    'sha512',
  ).toString('base64');
  return encrypted;
}
