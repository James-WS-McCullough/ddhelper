export const parseFilename = (filename: string) => {
  // Remove the extension first
  let baseName = filename.replace(/\.[^/.]+$/, "");

  // Check for '_loop' or 'loop' at the end and remove it
  baseName = baseName.replace(/_?loop$/, "");

  // Check for '_location' or 'location' at the end and remove it
  baseName = baseName.replace(/_?location$/, "");

  return baseName;
};

export const formatDistance = (distance: string) => {
  if (/^\d+$/.test(distance)) {
    return distance + "ft";
  }
  return distance;
};
