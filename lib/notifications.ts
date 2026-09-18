export function getNotificationHref(link: string | null | undefined) {
  if (!link) return "/notifications";
  if (link.startsWith("/jobs/")) return `/jobseeker${link}`;
  return link;
}
