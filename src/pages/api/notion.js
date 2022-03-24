export default async function notion(request, response) {
  const { body, auth } = request.body;

  // eslint-disable-next-line camelcase
  const { access_token } = await (
    await fetch('https://api.notion.com/v1/oauth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${auth}`,
      },
      body: JSON.stringify(body),
    })
  ).json();

  response.json({ access_token });
}
