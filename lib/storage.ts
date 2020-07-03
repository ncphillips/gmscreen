/**
 *
 * LOCAL STORAGE
 */
export function read(key) {
  try {
    const a = JSON.parse(localStorage.getItem(key)) || {};
    return a;
  } catch {
    return {};
  }
}

export function write(key: string, data: any) {
  let d;
  try {
    d = JSON.stringify(data);
  } catch (e) {
    console.error(e);
  }

  if (key === 'encountrs') {
    console.log('Saving', d);
  }

  localStorage.setItem(key, d);
}
