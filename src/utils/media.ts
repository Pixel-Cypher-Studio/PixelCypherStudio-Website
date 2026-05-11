import mediaConfig from "@/config/media.json";

const MEDIA_BASE = "https://assets.pixelcypherstudio.in/media";

export function mediaUrl(slotKey: string): string {
  const slot = mediaConfig.slots[slotKey as keyof typeof mediaConfig.slots];
  
  if (!slot) {
    console.warn(`Media slot "${slotKey}" not found in media.json`);
    return "";
  }

  return `${MEDIA_BASE}/${slot.path}`;
}