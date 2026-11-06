import { GOOGLE_TAG_ID } from "@/content/site";
import { googleTagInlineScript, googleTagSrc } from "@/lib/googleTag";

/**
 * Google tag, rendered as plain server-rendered <script> tags (not next/script)
 * so tag testers and crawlers find it in the initial HTML. Must be the first
 * child of <head>, and rendered exactly once per page.
 */
export default function GoogleTag() {
  return (
    <>
      <script async src={googleTagSrc(GOOGLE_TAG_ID)} />
      <script dangerouslySetInnerHTML={{ __html: googleTagInlineScript() }} />
    </>
  );
}
