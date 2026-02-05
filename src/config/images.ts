const imagesRoute: string = "/images";
const showcaseRoute: string = `${imagesRoute}/showcase`;
const peopleImageRoute: string = `${imagesRoute}/people`;
const showcaseImageRoute: string = `${showcaseRoute}/website`;
const imageExtension: string = '.webp';

export const Images = {
  showcase: {
    websites: [
      `${showcaseImageRoute}/project-view${imageExtension}`,
      `${showcaseImageRoute}/project-view-1${imageExtension}`,
      `${showcaseImageRoute}/project-view-2${imageExtension}`,
      `${showcaseImageRoute}/project-view-3${imageExtension}`,
    ],
  },
  people: {
    prtrait: {
      farhanAli: `${peopleImageRoute}/farhanali.webp`,
    },
    cutout: {
      farhanAli: `${peopleImageRoute}/farhanali-no-bg.webp`
    }
  }
};
