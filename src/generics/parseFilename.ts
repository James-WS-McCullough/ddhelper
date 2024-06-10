export const parseFilename = (filename: string) => {
  // Remove the extension first
  let baseName = filename.replace(/\.[^/.]+$/, "");

  // Check for '_loop' or 'loop' at the end and remove it
  baseName = baseName.replace(/_?loop$/, "");

  // Check for '_location' or 'location' at the end and remove it
  baseName = baseName.replace(/_?location$/, "");

  // Check for _ at the beginning and replace it with (???)
  baseName = baseName.replace(/^_/, "(???)");

  // Replace any remaining underscores with spaces
  baseName = baseName.replace(/_/g, " ");

  return baseName;
};

export const formatDistance = (distance: string) => {
  if (/^\d+$/.test(distance)) {
    return distance + "ft";
  }
  return distance;
};
