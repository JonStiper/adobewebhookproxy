export default {
  async fetch(request, env) {
    if (request.method === "GET") {
      return new Response("OK", {
        status: 200,
        headers: { "Content-Type": "text/plain" }
      });
    }

    const logicUrl = env.LOGIC_APP_URL;
    const body = await request.arrayBuffer();

    const resp = await fetch(logicUrl, {
      method: "POST",
      body,
      headers: request.headers
    });

    return new Response(await resp.text(), {
      status: resp.status,
      headers: { "Content-Type": "text/plain" }
    });
  }
};
