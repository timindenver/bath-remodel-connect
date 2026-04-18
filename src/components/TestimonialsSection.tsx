import { Star } from "lucide-react";
import testimonialsBgDesktop from "@/assets/testimonials-bg-desktop.webp";
import testimonialsBgMobile from "@/assets/testimonials-bg-mobile.webp";

type Review = {
  author: string;
  meta?: string;
  timeAgo: string;
  badge?: string;
  text: string;
};

const reviews: Review[] = [
  {
    author: "Scott Schreckinger",
    meta: "7 reviews",
    timeAgo: "3 months ago",
    badge: "Reasonable price",
    text: "Jeff and Justin did a great job remodeling our bathroom. Very professional and friendly too. We have an older house and the two obstacles they ran into they did a great job figuring it out. Highly recommend",
  },
  {
    author: "Carol O'Connor",
    meta: "2 reviews",
    timeAgo: "2 months ago",
    badge: "Reasonable price",
    text: "Jay and Dom did a great job. I am very happy with the work. Showed up at the exact time they said they would. Kept me updated on what they were doing and finished on time. Everyone was very friendly and pleasant to work with.",
  },
  {
    author: "Tim",
    meta: "2 reviews",
    timeAgo: "a month ago",
    text: "Couldn't be more pleased with my walk-in shower install! Fantastic process from start to finish. Jay and Dom were amazing and I truly appreciate their craft and my result!",
  },
  {
    author: "Suzanne Duong",
    meta: "Local Guide · 16 reviews · 3 photos",
    timeAgo: "4 months ago",
    text: "Jay and Dom did excellent work on our home. They clearly communicated with us, worked efficiently and are very professional. I highly recommend them for any home improvement projects. They educated us on how to continue to maintain our new home project. We had a pleasant experience.",
  },
  {
    author: "Linda Kemmerer",
    meta: "12 reviews",
    timeAgo: "5 months ago",
    text: "I just had my bathroom redone with removing a tub and shower and just replacing it with a shower. Chad & Shawn were great workers. They laid down tarps from my doorway through my living room, up the stairs and right into the bath.",
  },
  {
    author: "Barry Miller",
    meta: "1 review",
    timeAgo: "a month ago",
    text: "Jay and Don were great. Very professional and respectful. The shower installation went very smoothly. Walls and fixtures look great. Thank you!",
  },
  {
    author: "Janis Croissette",
    meta: "4 reviews · 7 photos",
    timeAgo: "10 months ago",
    text: "We love our new shower. We should have done this years ago. We had a large tub/shower removed and new walk-in shower installed in 2 days. It's absolutely gorgeous and much safer.",
  },
  {
    author: "Tim Vanhorn",
    meta: "6 reviews · 1 photo",
    timeAgo: "6 months ago",
    text: "We want to thank Chad and Shawn for our new bathtub install! We love how it turned out and are very pleased. They were top notch installers and were very clean also! Thank you!",
  },
  {
    author: "Wilamenia Rosa",
    meta: "2 reviews",
    timeAgo: "5 months ago",
    badge: "Reasonable price",
    text: "Chris and Zack were friendly, respectful and did a great job. They removed the old bathtub and installed a shower. They got to the job site on time. They protected the floor they walked on to and from the bathroom and left everything clean.",
  },
  {
    author: "Darryl",
    meta: "Local Guide · 19 reviews · 1 photo",
    timeAgo: "8 months ago",
    text: "They did an excellent job — they started at 7:45am and were finished by 2:15pm. Very fast and efficient workers. All the workers in this company are very friendly, helpful, and help you a lot in getting the best bathroom for your money.",
  },
  {
    author: "Karen Malone",
    meta: "Local Guide · 16 reviews",
    timeAgo: "2 months ago",
    badge: "Reasonable price",
    text: "Chad and Shawn did an awesome job installing our new frameless shower. They were prompt, neat, extremely efficient, and a dog lover! We are extremely pleased. You get what you pay for.",
  },
  {
    author: "Lois McGibbon",
    meta: "7 reviews",
    timeAgo: "5 months ago",
    text: "We are retired and wanted to renovate our fiberglass shower stall into a larger shower stall with a shower seat. The workers came on time and finished within a day and a half. They were neat and professional. We highly recommend!",
  },
  {
    author: "Marc Friedman",
    meta: "Local Guide · 54 reviews · 30 photos",
    timeAgo: "4 months ago",
    badge: "Reasonable price",
    text: "Jeff and Justin came and remodeled our ensuite. They were nothing but professional. They were very careful of our property and were very friendly. It was a three day project and they were always on time, despite the long commute.",
  },
  {
    author: "Ying Yang",
    meta: "7 reviews",
    timeAgo: "a month ago",
    badge: "Reasonable price",
    text: "The two technicians are professional and polite. They followed the protocol well. They are efficient to get the job done. The project looks beautiful!",
  },
  {
    author: "Carol Krom",
    meta: "Local Guide · 5 reviews · 14 photos",
    timeAgo: "7 months ago",
    badge: "Reasonable price",
    text: "Jeff and Justin did a great job with our shower and sink installation. Great attention to detail. A follow-up phone call several days after the installation was complete shows their concern for customer satisfaction. Would definitely recommend.",
  },
  {
    author: "Frank DeRosa",
    meta: "Local Guide · 16 reviews · 2 photos",
    timeAgo: "2 months ago",
    badge: "Reasonable price",
    text: "Had my shower redone to make it more accessible and safe as we age. Plus wanted to upgrade and modernize the shower and remove shower doors. Frank and Ryan arrived promptly at 7:30 and stayed until they were done in the late afternoon. We are very pleased.",
  },
  {
    author: "Joan Schaffer",
    meta: "Local Guide · 12 reviews · 3 photos",
    timeAgo: "9 months ago",
    text: "Highly recommend! The entire process was smooth and completed in one day as promised. Installers were experienced, neat, professional and friendly. We are extremely pleased with our new walk-in shower.",
  },
  {
    author: "Tom Werkheiser",
    meta: "5 reviews",
    timeAgo: "7 months ago",
    badge: "Reasonable price",
    text: "Excellent company to work with. From the first visit to their showroom to the completed tub to shower conversion. The installers Ryan and Devon were prompt and very professional. They did excellent work.",
  },
  {
    author: "Kathleen O'Donnell",
    meta: "3 reviews",
    timeAgo: "4 months ago",
    badge: "Reasonable price",
    text: "We are thrilled with the results of our complete bath remodel! Ryan and Devyn work so well together — they are extremely clean, careful and efficient while working. I HIGHLY recommend them.",
  },
  {
    author: "Joseph Lehnert",
    meta: "1 review",
    timeAgo: "2 months ago",
    badge: "Reasonable price",
    text: "Chad and Shawn did an excellent job. Arrived at the appointment exactly on time. Placed blankets down throughout the house where needed. New shower looks amazing!",
  },
  {
    author: "Lindsay Tennett",
    meta: "9 reviews · 2 photos",
    timeAgo: "9 months ago",
    text: "We had a wonderful experience from start to finish! Everyone we worked with was so professional, respectful, and always on time. I only wish we had done this renovation sooner.",
  },
  {
    author: "Sallie Griffiths",
    meta: "2 reviews · 3 photos",
    timeAgo: "a year ago",
    text: "Anthony came to my home with all samples. Explained everything to me. I picked out what I wanted. They came and installed everything. Explained everything as they installed. I asked questions and they answered them. Best experience ever.",
  },
];

const GoogleG = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" aria-hidden="true">
    <path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.99.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A10.98 10.98 0 0 0 12 23z"
    />
    <path
      fill="#FBBC05"
      d="M5.84 14.1A6.6 6.6 0 0 1 5.5 12c0-.73.13-1.44.34-2.1V7.06H2.18A11 11 0 0 0 1 12c0 1.77.42 3.45 1.18 4.94l3.66-2.84z"
    />
    <path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z"
    />
  </svg>
);

const initialsColor = (name: string) => {
  const palette = [
    "bg-[#1a73e8]",
    "bg-[#188038]",
    "bg-[#c5221f]",
    "bg-[#e37400]",
    "bg-[#9334e6]",
    "bg-[#129eaf]",
    "bg-[#a8323d]",
    "bg-[#5f6368]",
  ];
  const sum = name.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  return palette[sum % palette.length];
};

const ReviewCard = ({ r }: { r: Review }) => {
  const initials = r.author
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <article className="bg-white rounded-lg p-5 shadow-[0_1px_3px_rgba(0,0,0,0.08)] border border-[#e8eaed]">
      <header className="flex items-start gap-3">
        <div
          className={`${initialsColor(
            r.author
          )} text-white w-10 h-10 rounded-full flex items-center justify-center font-medium text-sm flex-shrink-0`}
        >
          {initials}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <p className="font-medium text-[#202124] text-sm truncate">
              {r.author}
            </p>
            <GoogleG />
          </div>
          {r.meta && (
            <p className="text-xs text-[#5f6368] truncate">{r.meta}</p>
          )}
        </div>
      </header>

      <div className="flex items-center gap-2 mt-3">
        <div className="flex gap-0.5">
          {Array.from({ length: 5 }).map((_, j) => (
            <Star
              key={j}
              className="w-4 h-4 fill-[#fbbc04] text-[#fbbc04]"
            />
          ))}
        </div>
        <span className="text-xs text-[#5f6368]">{r.timeAgo}</span>
      </div>

      {r.badge && (
        <div className="mt-3">
          <span className="inline-flex items-center text-xs text-[#5f6368] bg-[#f1f3f4] px-2 py-1 rounded-full">
            {r.badge}
          </span>
        </div>
      )}

      <p className="text-sm text-[#3c4043] mt-3 leading-relaxed">{r.text}</p>
    </article>
  );
};

const ScrollColumn = ({
  items,
  duration,
  reverse = false,
}: {
  items: Review[];
  duration: string;
  reverse?: boolean;
}) => {
  const doubled = [...items, ...items];
  return (
    <div className="relative h-[600px] overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-background to-transparent z-10 pointer-events-none" />
      <div
        className="flex flex-col gap-4"
        style={{
          animation: `${reverse ? "scroll-down" : "scroll-up"} ${duration} linear infinite`,
        }}
      >
        {doubled.map((r, i) => (
          <ReviewCard key={i} r={r} />
        ))}
      </div>
    </div>
  );
};

const TestimonialsSection = () => {
  const third = Math.ceil(reviews.length / 3);
  const col1 = reviews.slice(0, third);
  const col2 = reviews.slice(third, third * 2);
  const col3 = reviews.slice(third * 2);

  const avgRating = 4.9;
  const totalReviews = reviews.length;

  return (
    <section className="relative py-12 sm:py-20 px-4 sm:px-6 overflow-hidden">
      <div
        className="absolute inset-0 hidden md:block bg-cover bg-center"
        style={{ backgroundImage: `url(${testimonialsBgDesktop})` }}
      />
      <div
        className="absolute inset-0 md:hidden bg-cover bg-center"
        style={{ backgroundImage: `url(${testimonialsBgMobile})` }}
      />
      <div className="absolute inset-0 bg-background/30" />

      <div className="relative max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-sm border border-[#e8eaed] mb-4">
            <GoogleG />
            <span className="text-sm font-medium text-[#202124]">
              Google Reviews
            </span>
            <span className="text-[#5f6368]">·</span>
            <div className="flex items-center gap-1">
              <span className="text-sm font-semibold text-[#202124]">
                {avgRating}
              </span>
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star
                    key={j}
                    className="w-3.5 h-3.5 fill-[#fbbc04] text-[#fbbc04]"
                  />
                ))}
              </div>
            </div>
            <span className="text-xs text-[#5f6368]">
              ({totalReviews}+ reviews)
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-foreground text-balance">
            What Homeowners Are Saying
          </h2>
        </div>

        {/* Desktop: 3 vertical scrolling columns */}
        <div className="hidden md:grid grid-cols-3 gap-4">
          <ScrollColumn items={col1} duration="60s" />
          <ScrollColumn items={col2} duration="75s" reverse />
          <ScrollColumn items={col3} duration="65s" />
        </div>

        {/* Mobile: single scrolling column */}
        <div className="md:hidden">
          <ScrollColumn items={reviews} duration="80s" />
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
