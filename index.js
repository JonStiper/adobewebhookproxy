export default {
  async fetch(request, env) {
    // Adobe Sign validation request
    if (request.method === "GET") {
      return new Response("OK", {
        status: 200,
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
          "Cache-Control": "no-store",
          "X-Adobe-Webhook-Validation": "true"
        }
      });
    }

    // Forward POST payload to your Logic App
    const logicUrl = env.LOGIC_APP_URL;

    // Adobe sends JSON, XML, or multipart — we forward raw bytes
    const body = await request.arrayBuffer();

    const resp = await fetch(logicUrl, {
      method: "POST",
      body,
      headers: request.headers
    });

    // Return Logic App response back to Adobe
    return new Response(await resp.text(), {
      status: resp.status,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-store"
      }
    });
  }
};

