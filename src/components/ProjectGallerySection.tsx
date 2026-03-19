import bath1 from "@/assets/projects/bath1.jpeg";
import bath3 from "@/assets/projects/bath3.jpeg";
import bath4 from "@/assets/projects/bath4.jpeg";
import blue from "@/assets/projects/blue.jpeg";
import shower1 from "@/assets/projects/shower1.jpeg";
import shower2 from "@/assets/projects/shower2.png";
import shower3 from "@/assets/projects/shower3.jpeg";

const PROJECTS = [
  { src: shower2, label: "Silver Shimmer w/ Matte Black" },
  { src: blue, label: "Blue and Gold" },
  { src: bath1, label: "Farmhouse Tub Surround" },
  { src: shower1, label: "Modern Frameless Shower" },
  { src: shower3, label: "Cool Blue + Polished Chrome" },
  { src: bath3, label: "Modern Grey & White Spa Bath" },
  { src: bath4, label: "Dark Slate Tub Surround" },
];

const ProjectGallerySection = () => {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-muted/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-foreground">
            The Perfect Look to Fit Your Space
          </h2>
          <p className="mt-3 text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base">
            Every installation is completed by certified, 5-star rated contractors in your area.
          </p>
        </div>

        {/* Bento-style grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {/* Featured large image */}
          <div className="col-span-2 lg:col-span-2 lg:row-span-2 group relative overflow-hidden rounded-lg">
            <img
              src={PROJECTS[0].src}
              alt={PROJECTS[0].label}
              className="w-full h-64 sm:h-80 lg:h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              <p className="text-white font-serif font-semibold text-sm sm:text-base">
                {PROJECTS[0].label}
              </p>
            </div>
          </div>

          {/* Remaining images */}
          {PROJECTS.slice(1).map((project, i) => (
            <div
              key={i}
              className="group relative overflow-hidden rounded-lg"
            >
              <img
                src={project.src}
                alt={project.label}
                className="w-full h-40 sm:h-48 lg:h-56 object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-white font-serif font-semibold text-xs sm:text-sm">
                  {project.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectGallerySection;
