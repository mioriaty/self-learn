export default function nightModeBlacklist(color?: string): string {
  if (!color) {
    return '';
  }
  if (color.includes('-rgb-')) {
    return color.replace('-rgb-', '-rgb-always-');
  }
  return color.replace('-color-', '-color-always-');
}
