export const sectionImageFields = `
  "mainImageUrl": mainImage.asset->url,
  "profileImageUrl": profileImage.asset->url,
  "smallImageUrl": smallImage.asset->url,
  "largeImageUrl": largeImage.asset->url,
  "mapImageUrl": mapImage.asset->url,
  "mapImageEnUrl": mapImageEn.asset->url,
  "mapImageArUrl": mapImageAr.asset->url,
  "row1ImageUrl": row1Image.asset->url,
  "row2ImageUrl": row2Image.asset->url,
  bullets[] {
    ...,
    "iconImageUrl": iconImage.asset->url
  },
  destinations[] {
    ...,
    "iconImageUrl": iconImage.asset->url
  },
  tabs[] {
    ...,
    images[] {
      ...,
      "imageUrl": image.asset->url
    }
  },
  phases[] {...},
  clusters[] {
    ...,
    "interiorImageUrl": interiorImage.asset->url,
    "flowerImageUrl": flowerImage.asset->url
  },
  "resolvedAmenities": amenities[] {
    ...,
    "iconUrl": icon.asset->url
  },
  "inlineImages": images[] {
    ...,
    "imageUrl": image.asset->url
  }
`;

export const pageSectionsProjection = `
  "reusableSections": *[_type == "reusableSections" && _id == "reusableSections"][0] {
    prestigeSection {
      ...,
      ${sectionImageFields}
    },
    developerProfileSection {
      ...,
      ${sectionImageFields}
    },
    connectivitySection {
      ...,
      ${sectionImageFields}
    },
    residencesSection {
      ...,
      ${sectionImageFields}
    },
    interiorsSection {
      ...,
      ${sectionImageFields}
    },
    gallerySection {
      ...,
      ${sectionImageFields}
    },
    amenitiesSection {
      ...,
      ${sectionImageFields}
    },
    contactFormSection {
      ...,
      ${sectionImageFields}
    }
  },
  sections[] {
    ...,
    ${sectionImageFields}
  }
`;

export function mergeSharedSections(pageData) {
  if (!pageData) return pageData;

  const reusableSections = pageData.reusableSections || {};
  const reusableTypes = [
    'prestigeSection',
    'developerProfileSection',
    'connectivitySection',
    'residencesSection',
    'interiorsSection',
    'gallerySection',
    'amenitiesSection',
    'contactFormSection',
  ];
  const reusableByType = new Map(
    reusableTypes
      .map((type) => [type, reusableSections[type] ? { ...reusableSections[type], _type: type } : null])
      .filter(([, section]) => section)
  );

  const resolvedSections = (pageData.sections || [])
    .filter(Boolean)
    .map((section) => reusableByType.get(section._type) || section);

  return {
    ...pageData,
    sections: resolvedSections,
  };
}
