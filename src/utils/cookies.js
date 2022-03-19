// eslint-disable-next-line import/prefer-default-export
export function extractEmailFromCookies() {
  const cookies = document.cookie;
  const email = cookies.match(/(?<=email=).+?(?=(?:; |$))/)[0];
  return email;
}
