/** Dock'taki Terminal ikonu /#terminal'e gider; ana sayfa açılınca terminal büyür. */
export function shouldOpenFromHash(hash) {
  return /^#terminal$/i.test(hash);
}
