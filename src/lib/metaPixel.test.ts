import { afterEach, describe, expect, it, vi } from "vitest";
import { metaCall, parsePixelId, sendMetaEvent, shouldTrackPageView } from "./metaPixel";

describe("parsePixelId", () => {
  it("accepts digits-only ids", () => {
    expect(parsePixelId("1234567890")).toBe("1234567890");
    expect(parsePixelId("  1234567890 ")).toBe("1234567890");
  });
  it("treats anything else as unset", () => {
    for (const bad of [undefined, "", "   ", "12a", "1;alert(1)", "'1'", "1 2", "-1", "1.5"]) {
      expect(parsePixelId(bad), String(bad)).toBe("");
    }
  });
});

describe("metaCall", () => {
  it("maps contact_submit to Lead", () => {
    expect(metaCall("contact_submit", { project_type: "ux-ui", locale: "es" })).toBe("Lead");
  });
  it("maps whatsapp and email link clicks to Contact", () => {
    expect(metaCall("contact_link_click", { channel: "whatsapp" })).toBe("Contact");
    expect(metaCall("contact_link_click", { channel: "email" })).toBe("Contact");
  });
  it("ignores other channels", () => {
    for (const channel of ["linkedin", "github", "cv", undefined]) {
      expect(metaCall("contact_link_click", { channel })).toBeNull();
    }
  });
});

describe("sendMetaEvent", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("calls fbq with the standard event name and no parameters", () => {
    const fbq = vi.fn();
    vi.stubGlobal("window", { fbq });
    sendMetaEvent(true, "contact_submit", { project_type: "x", locale: "es" });
    expect(fbq).toHaveBeenCalledTimes(1);
    expect(fbq).toHaveBeenCalledWith("track", "Lead");
  });

  it("is a no-op when disabled", () => {
    const fbq = vi.fn();
    vi.stubGlobal("window", { fbq });
    sendMetaEvent(false, "contact_submit", {});
    expect(fbq).not.toHaveBeenCalled();
  });

  it("is a no-op when fbq is undefined or the event is unmapped", () => {
    vi.stubGlobal("window", {});
    expect(() => sendMetaEvent(true, "contact_submit", {})).not.toThrow();
    const fbq = vi.fn();
    vi.stubGlobal("window", { fbq });
    sendMetaEvent(true, "contact_link_click", { channel: "github" });
    expect(fbq).not.toHaveBeenCalled();
  });

  it("never throws if fbq throws", () => {
    vi.stubGlobal("window", {
      fbq: () => {
        throw new Error("boom");
      },
    });
    expect(() => sendMetaEvent(true, "contact_submit", {})).not.toThrow();
  });
});

describe("shouldTrackPageView", () => {
  it("does not fire for the initial load (base code already did)", () => {
    expect(shouldTrackPageView(null, "/")).toBe(false);
  });
  it("does not fire when the path is unchanged (re-render, strict mode)", () => {
    expect(shouldTrackPageView("/", "/")).toBe(false);
  });
  it("fires on a real pathname change", () => {
    expect(shouldTrackPageView("/", "/en/privacy")).toBe(true);
  });
});
