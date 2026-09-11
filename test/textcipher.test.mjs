import { test } from 'node:test';
import assert from 'node:assert/strict';
import { encryptText, decryptText } from '../src/lib/textcipher.js';
// Cross-project interop check: same KDF params and blob layout as
// paper-wallet-btc's own cipher, verified against its REAL module (not a
// re-implementation) - the same pattern my_btc_wallet's test suite uses for
// its own BIP38/seed-cipher compatibility tests.
import { encryptMnemonic as encryptWithPaperWallet } from '../../paper-wallet-btc/src/lib/seedCipher.js';

test('round-trips arbitrary text with the right password', async () => {
  const text = 'Este es un plan de herencia de prueba.\nSegunda linea.';
  const blob = await encryptText(text, 'una contraseña razonable');
  const decrypted = await decryptText(blob, 'una contraseña razonable');
  assert.equal(decrypted, text);
});

test('rejects the wrong password with a clear error, not garbage output', async () => {
  const blob = await encryptText('contenido secreto', 'correcta');
  await assert.rejects(() => decryptText(blob, 'incorrecta'), /Contrasena incorrecta/);
});

test('rejects a malformed blob', async () => {
  await assert.rejects(() => decryptText('no es base64 valido!!', 'cualquier cosa'), /base64/);
  await assert.rejects(() => decryptText('YQ==', 'cualquier cosa'), /incompleto/);
});

test('tolerates whitespace/line breaks the way a printed or emailed blob would pick up', async () => {
  const blob = await encryptText('texto con espacios', 'clave123');
  const wrapped = blob.slice(0, 20) + '\n  ' + blob.slice(20, 40) + '\n' + blob.slice(40);
  const decrypted = await decryptText(wrapped, 'clave123');
  assert.equal(decrypted, 'texto con espacios');
});

test('interop: a blob encrypted by paper-wallet-btc\'s real seedCipher.js decrypts here too', async () => {
  const blob = await encryptWithPaperWallet('abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about', 'contraseña-compartida');
  const decrypted = await decryptText(blob, 'contraseña-compartida');
  assert.equal(decrypted, 'abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about');
});
