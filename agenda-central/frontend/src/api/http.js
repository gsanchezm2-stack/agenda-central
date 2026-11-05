// Cliente HTTP: siempre devuelve { ok, status, cuerpo } y nunca lanza excepciones
export async function api(url, opciones = {}) {
  try {
    const r = await fetch(url, { headers: { 'Content-Type': 'application/json' }, ...opciones });
    return { ok: r.ok, status: r.status, cuerpo: r.status === 204 ? null : await r.json().catch(() => null) };
  } catch {
    return { ok: false, status: 0, cuerpo: { mensaje: 'No se pudo comunicar con el servidor. Revise su conexión.' } };
  }
}
export const enviar = (url, metodo, datos) => api(url, { method: metodo, body: JSON.stringify(datos) });
