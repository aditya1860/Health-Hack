export type EmergencyKey =
  | "heart"
  | "fall"
  | "blood"
  | "breathing"
  | "burn";

export const EMERGENCY_GUIDE: Record<
  EmergencyKey,
  {
    title: string;
    do: string[];
    dont: string[];
    remedy?: string[];
  }
> = {
  heart: {
    title: "Heart Attack",
    do: [
      "Sit down and try to stay calm",
      "Loosen any tight clothing around your neck and chest",
      "Take slow, deep breaths",
      "If you have aspirin, chew one tablet slowly",
    ],
    dont: [
      "Don't eat or drink anything",
      "Don't lie down flat - stay sitting or semi-reclined",
      "Don't try to drive yourself anywhere",
    ],
  },

  fall: {
    title: "Fall / Injury",
    do: [
      "Stay still and assess your pain level",
      "Check if you can move your fingers and toes",
      "Keep your head and neck still if you feel any neck pain",
      "Apply gentle pressure if you're bleeding",
    ],
    dont: [
      "Don't try to get up quickly if you hit your head",
      "Don't move if you have severe neck or back pain",
      "Don't put weight on an injured limb",
    ],
  },

  blood: {
    title: "Blood Loss",
    do: [
      "Apply firm pressure directly on the wound with a clean cloth",
      "Keep pressing for at least 10 minutes without checking",
      "Raise the injured area above your heart if possible",
      "Sit or lie down to prevent fainting",
    ],
    dont: [
      "Don't remove any objects stuck in the wound",
      "Don't release pressure to check if bleeding stopped",
      "Don't use a tourniquet unless bleeding is severe and won't stop",
    ],
    remedy: [
      "Use a clean towel, cloth, or even your hand if nothing else is available",
      "If blood soaks through, add more cloth on top - don't remove the first layer",
    ],
  },

  breathing: {
    title: "Breathing Issue",
    do: [
      "Sit upright in a comfortable position",
      "Loosen tight clothing around your neck and chest",
      "Try to breathe slowly through your nose and out through your mouth",
      "Focus on relaxing your shoulders",
    ],
    dont: [
      "Don't lie down flat - this can make breathing harder",
      "Don't panic - try to stay as calm as possible",
      "Don't eat or drink anything right now",
    ],
  },

  burn: {
    title: "Burn",
    do: [
      "Cool the burn with running water for 10-15 minutes",
      "Remove jewelry or tight clothing near the burn before swelling starts",
      "Cover loosely with a clean, dry cloth once cooled",
      "Keep the burned area elevated if possible",
    ],
    dont: [
      "Don't apply ice directly to the burn",
      "Don't burst any blisters that form",
      "Don't apply creams, butter, or oils to the burn",
      "Don't remove anything stuck to the burn",
    ],
    remedy: [
      "Use cool (not cold) running water only",
      "If no water available, use a clean, cool, wet cloth",
    ],
  },
};