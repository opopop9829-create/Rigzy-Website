export interface Project {
   id: string;
   name: string;
   subName: string;
   price: string;
   description: string;
   folderPath: string;
   themeColor: string;
   gradient: string;
   features: string[];
   stats: { label: string; val: string }[];
   section1: { title: string; subtitle: string };
   section2: { title: string; subtitle: string };
   section3: { title: string; subtitle: string };
   section4: { title: string; subtitle: string };
   detailsSection: { title: string; description: string; imageAlt: string };
   workflowSection: { title: string; description: string };
   bookProjectSection: {
       price: string;
       unit: string;
       processingParams: string[];
       deliveryPromise: string;
       returnPolicy: string;
   };
}

export const projects: Project[] = [
  {
    id: "commercial",
    name: "Commercial Editing",
    subName: "Designed to convert.",
    price: "Featured",
    description: "Cinematic Storytelling • Motion Graphics • Professional Color Grading",
    folderPath: "/images/commercial",
    themeColor: "#7C3AED",
    gradient: "linear-gradient(135deg, #1e1b4b 0%, #7c3aed 50%, #4f46e5 100%)",
    features: [
      "Cinematic Editing",
      "Motion Graphics",
      "Professional Color Grading"
    ],
    stats: [
      { label: "Resolution", val: "4K" },
      { label: "FPS", val: "120" },
      { label: "Delivery", val: "Fast" }
    ],
    section1: {
      title: "Commercial Editing.",
      subtitle: "Designed to convert."
    },
    section2: {
      title: "Every frame tells a story.",
      subtitle: "High-end edits crafted with rhythm, emotion, and cinematic precision."
    },
    section3: {
      title: "Premium visual language.",
      subtitle: "Film-grade color grading, seamless transitions, and immersive storytelling."
    },
    section4: {
      title: "Editing beyond expectations.",
      subtitle: ""
    },
    detailsSection: {
      title: "Creative Precision",
      description: "Every project is edited with meticulous attention to pacing, composition, sound design, visual effects, and color science to deliver world-class cinematic visuals.",
      imageAlt: "Commercial Editing"
    },
    workflowSection: {
      title: "Professional Workflow",
      description: "Every project follows an optimized workflow—from organizing footage and storytelling to editing, motion graphics, color grading, sound design, visual effects, and final delivery."
    },
    bookProjectSection: {
      price: "Available",
      unit: "Project Booking",
      processingParams: [
        "Editing",
        "Color Grade",
        "Motion Graphics"
      ],
      deliveryPromise: "Fast turnaround with premium quality.",
      returnPolicy: "Unlimited revisions until satisfaction."
    }
  },
  {
    id: "brand-film",
    name: "Brand Films",
    subName: "Stories that inspire.",
    price: "Featured",
    description: "Luxury Commercials • Corporate Films • Storytelling",
    folderPath: "/images/brand-film",
    themeColor: "#5B21B6",
    gradient: "linear-gradient(135deg, #170b2c 0%, #5b21b6 50%, #312e81 100%)",
    features: [
      "Luxury Visuals",
      "Storytelling",
      "Brand Identity"
    ],
    stats: [
      { label: "Clients", val: "100+" },
      { label: "Quality", val: "Cinema" },
      { label: "Delivery", val: "Fast" }
    ],
    section1: {
      title: "Brand Films.",
      subtitle: "Stories that inspire."
    },
    section2: {
      title: "Build unforgettable brands.",
      subtitle: "Transforming businesses into premium visual experiences."
    },
    section3: {
      title: "Emotion meets strategy.",
      subtitle: "Purpose-driven storytelling that leaves lasting impact."
    },
    section4: {
      title: "Designed for modern brands.",
      subtitle: ""
    },
    detailsSection: {
      title: "Visual Identity",
      description: "Premium filmmaking techniques combined with modern editing workflows create unforgettable brand experiences.",
      imageAlt: "Brand Film"
    },
    workflowSection: {
      title: "Creative Process",
      description: "Concept development, editing, cinematic color grading, motion graphics, audio mixing, and polished delivery."
    },
    bookProjectSection: {
      price: "Available",
      unit: "Project Booking",
      processingParams: [
        "Brand Strategy",
        "Editing",
        "Motion Graphics"
      ],
      deliveryPromise: "Professional delivery with cinematic quality.",
      returnPolicy: "Unlimited revisions."
    }
  },
  {
    id: "reels",
    name: "Social Media Reels",
    subName: "Built to go viral.",
    price: "Featured",
    description: "Instagram • YouTube Shorts • Viral Content",
    folderPath: "/images/reels",
    themeColor: "#9333EA",
    gradient: "linear-gradient(135deg, #2e0854 0%, #9333ea 50%, #6d28d9 100%)",
    features: [
      "Fast Paced Editing",
      "Motion Graphics",
      "Viral Hooks"
    ],
    stats: [
      { label: "Platform", val: "Multi" },
      { label: "Aspect", val: "9:16" },
      { label: "Reach", val: "Unlimited" }
    ],
    section1: {
      title: "Social Media Reels.",
      subtitle: "Built to go viral."
    },
    section2: {
      title: "Capture attention instantly.",
      subtitle: "Every second is optimized for maximum engagement."
    },
    section3: {
      title: "Fast. Dynamic. Memorable.",
      subtitle: "Modern editing styles with premium motion design."
    },
    section4: {
      title: "Content that performs.",
      subtitle: ""
    },
    detailsSection: {
      title: "Scroll-Stopping Content",
      description: "Designed using cinematic pacing, bold typography, motion graphics, sound design, and engaging transitions.",
      imageAlt: "Social Media Reels"
    },
    workflowSection: {
      title: "Optimized Workflow",
      description: "From raw footage to platform-ready exports with the latest editing trends and premium production quality."
    },
    bookProjectSection: {
      price: "Available",
      unit: "Project Booking",
      processingParams: [
        "Editing",
        "Captions",
        "Motion Graphics"
      ],
      deliveryPromise: "Quick delivery optimized for social media.",
      returnPolicy: "Unlimited revisions."
    }
  }
];
