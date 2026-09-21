/**
 * ARC Associates - Core Data & Initial Assets
 * Established 1998, Cuddalore, Tamil Nadu
 */

const ARC_DATA = {
  company: {
    name: "ARC Associates",
    tagline: "Engineering & Architectural Craftsmanship Since 1998",
    founded: "1998",
    experienceYears: "25+",
    completedProjects: "580+",
    satisfiedClients: "100%",
    activeEngineers: "45+",
    address: {
      line1: "23/33, First Floor, K.K. Nagar",
      line2: "Vannarapalayam, Cuddalore - 607001",
      state: "Tamil Nadu, India",
      full: "23/33, First Floor, K.K. Nagar, Vannarapalayam, Cuddalore - 607001, Tamil Nadu, India"
    },
    phones: [
      { display: "04142 - 293270", raw: "04142293270", type: "Landline" },
      { display: "+91 93823 12700", raw: "+919382312700", type: "Direct / WhatsApp" }
    ],
    email: "arcassociates73@gmail.com",
    whatsapp: "+919382312700",
    workingHours: "Mon - Sat: 9:00 AM - 8:00 PM (Sunday by appointment)",
    rating: 4.9,
    totalReviews: 142
  },

  promoters: [
    {
      name: "Er. A. Ramanathan, B.E. (Civil)",
      role: "Managing Director & Chief Structural Engineer",
      experience: "28+ Years Experience",
      bio: "Pioneered ARC Associates in 1998 with a vision to deliver uncompromising structural integrity, transparent cost estimation, and modern architectural aesthetics across Cuddalore and Tamil Nadu.",
      specialization: "Structural Analysis, Turnkey Residential & Commercial Contracting, Quality Control",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80"
    },
    {
      name: "Mrs. R. Chitra, M.Arch",
      role: "Director of Architecture & Interior Design",
      experience: "22+ Years Experience",
      bio: "Oversees spatial planning, sustainable architectural design, luxury residential elevations, and premium turnkey interior woodwork and finishes.",
      specialization: "Architectural Planning, Vastu-Compliant 3D Elevations, Interior Spatial Design",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80"
    }
  ],

  services: [
    {
      id: "houses-and-offices",
      slug: "houses-and-offices",
      title: "Houses & Commercial Offices",
      shortDesc: "Complete turnkey construction for premium luxury villas, modern residences, commercial complexes, and modern corporate office spaces.",
      icon: "fa-building",
      heroImg: "assets/construction-service.jpg",
      samplePhotos: [
        { title: "Contemporary Luxury Villa", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80", tag: "K.K. Nagar, Cuddalore" },
        { title: "Modern Duplex Residence", image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80", tag: "Semmandalam, Cuddalore" },
        { title: "Commercial Plaza & Retail Complex", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80", tag: "Vannarapalayam Main Rd" },
        { title: "Corporate Office Interiors", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80", tag: "Manjakuppam, Cuddalore" },
        { title: "Heavy RCC Framework Construction", image: "assets/construction-service.jpg", tag: "Structural Stage" },
        { title: "Architectural 3D Elevation Execution", image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80", tag: "Turnkey Handover" }
      ],
      gallery: [
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80"
      ],
      highlights: [
        "End-to-end turnkey building contract from foundation to handover",
        "High-grade TMT steel (Fe550D) and branded 53-grade OPC/PPC cement",
        "Vastu-compliant architectural planning & DTCP/Corporation approvals",
        "Earthquake-resistant RCC column-beam framework design",
        "Transparent stage-by-stage billing with milestone tracking"
      ],
      process: [
        { step: "01", title: "Soil Testing & Site Survey", desc: "Comprehensive geotechnical soil investigation to determine safe foundation depth and bearing capacity." },
        { step: "02", title: "Architectural & 3D Planning", desc: "Drafting floor layouts, 3D exterior elevations, structural drawings, and obtaining statutory sanctions." },
        { step: "03", title: "Foundation & Superstructure", desc: "Precision casting of footings, plinth beams, columns, brickwork, and roof slabs with strict curing periods." },
        { step: "04", title: "MEP & Finishing Works", desc: "Integrated electrical conduit laying, concealed plumbing, plastering, premium flooring, and final finishes." }
      ],
      startingPrice: "₹ 1,850 / sq.ft",
      faq: [
        { q: "Do you assist with Cuddalore municipal building plan approvals?", a: "Yes, our team handles complete DTCP, Corporation, and local body planning permissions, documentation, and structural stability certificates." },
        { q: "What is the typical completion timeframe for a 2,000 sq.ft residence?", a: "A standard 2,000 sq.ft independent villa is completed within 6 to 8 months with full interior readiness." }
      ]
    },
    {
      id: "renovations",
      slug: "renovations",
      title: "Building Renovations & Remodeling",
      shortDesc: "Comprehensive remodeling, structural strengthening, vertical floor additions, facade modernizations, and spatial layout reconfigurations.",
      icon: "fa-tools",
      heroImg: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80",
      samplePhotos: [
        { title: "Complete Heritage Home Remodel", image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80", tag: "Manjakuppam, Cuddalore" },
        { title: "Terrace Waterproofing & Heat Proofing", image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80", tag: "10-Year Warranty" },
        { title: "Modern Elevation Facelift", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80", tag: "Facade Makeover" },
        { title: "Structural Beam Retrofitting & Jacketing", image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80", tag: "RCC Strengthening" },
        { title: "Modern Bathroom & Kitchen Overhaul", image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80", tag: "Interior Remodel" },
        { title: "Vertical First-Floor Extension", image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80", tag: "Floor Addition" }
      ],
      gallery: [
        "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80"
      ],
      highlights: [
        "Old home modernization into contemporary luxury residences",
        "RCC structural retrofitting, jacketing & crack injection treatment",
        "Terrace waterproofing with high-elastomeric polymers and heat-reflective tiles",
        "Kitchen & bathroom complete layout overhaul and modernization",
        "Commercial facade redesign with ACP sheets, structural glazing & louvers"
      ],
      process: [
        { step: "01", title: "Structural Health Audit", desc: "Detailed inspection of existing beams, load-bearing walls, moisture seepage, and foundation health." },
        { step: "02", title: "Redesign & Budgeting", desc: "Creating modern space-optimization blueprints and itemized material schedule." },
        { step: "03", title: "Demolition & Retrofit", desc: "Safe, non-destructive structural alterations, propping, beam retrofitting, and MEP relocation." },
        { step: "04", title: "Modern Finishes", desc: "Applying modern paint systems, false ceilings, luxury bath fittings, and exterior elevation facelift." }
      ],
      startingPrice: "Customized according to scope",
      faq: [
        { q: "Can we live in the house while renovation is ongoing?", a: "For phased interior renovations, we partition work zones to minimize disruption. For major structural remodels, temporary vacancy is advised." },
        { q: "How do you guarantee leak-proof terrace renovation?", a: "We apply a 5-layer polymer waterproofing membrane backed by a written 10-year warranty." }
      ]
    },
    {
      id: "electrical",
      slug: "electrical",
      title: "Electrical & Smart Automation",
      shortDesc: "Concealed heavy-duty wiring, 3-phase industrial panel installations, home automation, architectural LED lighting, and surge protection.",
      icon: "fa-bolt",
      heroImg: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1200&q=80",
      samplePhotos: [
        { title: "Architectural Cove & False Ceiling Lighting", image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80", tag: "Ambient LED" },
        { title: "Smart Home Automation Touch Controls", image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80", tag: "App & Touch Panel" },
        { title: "3-Phase Distribution Box Dressing & MCB", image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80", tag: "Heavy Duty Panel" },
        { title: "Concealed Wall Conduit & Switch Mounting", image: "https://images.unsplash.com/photo-1565608438257-fac3c27beb36?auto=format&fit=crop&w=800&q=80", tag: "Concealed Work" },
        { title: "Commercial Office Recessed Modular Lighting", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80", tag: "Corporate Space" },
        { title: "Solar Inverter Grid & Surge Protection", image: "https://images.unsplash.com/photo-1517581177682-a085bb7ffb15?auto=format&fit=crop&w=800&q=80", tag: "Safety Setup" }
      ],
      gallery: [
        "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1565608438257-fac3c27beb36?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1517581177682-a085bb7ffb15?auto=format&fit=crop&w=800&q=80"
      ],
      highlights: [
        "FR-LSH (Flame Retardant Low Smoke & Halogen) pure copper wiring (Finolex/Havells/Polycab)",
        "Modular switches and sockets from Legrand, Schneider, or Anchor Panasonic",
        "Smart lighting automation, motion sensors, and remote app control",
        "Dedicated EV charging station setups and solar inverter grid integration",
        "Comprehensive copper earthing and Lightning protection systems"
      ],
      process: [
        { step: "01", title: "Load Calculation & SLD", desc: "Detailed load calculation, Single Line Diagram (SLD) preparation, and phase balancing." },
        { step: "02", title: "Concealed Wall Chasing", desc: "Precision cutting with dustless wall chasers and heavy PVC conduit laying." },
        { step: "03", title: "Wiring & DB Dressing", desc: "Color-coded multi-strand wire drawing, MCB/RCCB distribution box dressing." },
        { step: "04", title: "Testing & Commissioning", desc: "Insulation resistance testing, earth pit resistance audit, and smart fixture calibration." }
      ],
      startingPrice: "₹ 75 / sq.ft (Labor + Conduit)",
      faq: [
        { q: "Do you install RCCBs for shock protection in all circuits?", a: "Yes, every ARC Associates electrical installation includes 30mA high-sensitivity RCCB protection against electric shocks and fire hazards." },
        { q: "Can you retrofit smart home switches into existing wiring?", a: "Yes, we integrate smart capacitive touch panels and Wi-Fi modules without rewiring." }
      ]
    },
    {
      id: "plumbing",
      slug: "plumbing",
      title: "Plumbing, Drainage & Sanitary",
      shortDesc: "CPVC & UPVC water supply networks, acoustic drainage lines, pressure pump systems, solar water heaters, and luxury sanitary fitting.",
      icon: "fa-faucet-drip",
      heroImg: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80",
      samplePhotos: [
        { title: "Luxury Wall-Hung Sanitary & Concealed Tank", image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80", tag: "Kohler / Jaquar" },
        { title: "Concealed Diverter & Overhead Rain Shower", image: "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=800&q=80", tag: "Master Bathroom" },
        { title: "Multi-Zone CPVC Pressure Water Line", image: "https://images.unsplash.com/photo-1585338107529-13afc5f02586?auto=format&fit=crop&w=800&q=80", tag: "Pressure Tested" },
        { title: "Modern Vanity Counter & Basin Mixer", image: "https://images.unsplash.com/photo-1594818379496-da1e345b0ded?auto=format&fit=crop&w=800&q=80", tag: "Sanitary Fitting" },
        { title: "Hydro-Pneumatic Booster Pump Station", image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80", tag: "High Pressure" },
        { title: "Rainwater Harvesting Filtration Setup", image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80", tag: "Eco Engineering" }
      ],
      gallery: [
        "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1585338107529-13afc5f02586?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1594818379496-da1e345b0ded?auto=format&fit=crop&w=800&q=80"
      ],
      highlights: [
        "Lead-free CPVC (Astral / Ashirvad) hot & cold concealed water distribution",
        "SWR PVC acoustic drainage pipes with leak-proof solvent & ring fit joints",
        "Hydro-pneumatic booster pump systems for consistent high-pressure showers",
        "Concealed diverters, rain showerheads, wall-hung WC with concealed cisterns",
        "Rainwater harvesting sump and modern septic tank / soak pit engineering"
      ],
      process: [
        { step: "01", title: "Hydraulic Line Layout", desc: "Designing pressure-balanced pipeline routes to prevent water hammer and pressure drops." },
        { step: "02", title: "Concealed Pipe Installation", desc: "Precision embedding of CPVC/UPVC pipes with heavy brass fittings." },
        { step: "03", title: "Hydrostatic Pressure Testing", desc: "Pressurizing lines to 10 kg/cm² for 24 hours to ensure 100% zero-leak integrity before wall closure." },
        { step: "04", title: "Sanitary Fixture Fitting", desc: "Mounting Kohler/Jaquar/Hindware sanitaryware, vanity mixers, and drainage traps." }
      ],
      startingPrice: "₹ 65 / sq.ft (Point-based estimation available)",
      faq: [
        { q: "How do you test plumbing lines before tiling?", a: "We carry out a strict 24-hour hydraulic pressure test with calibrated pressure gauges. Tiling commences only after zero-pressure drop certification." },
        { q: "Do you install rainwater harvesting recharge systems?", a: "Yes, compliant with Tamil Nadu government groundwater conservation norms." }
      ]
    },
    {
      id: "carpentry",
      slug: "carpentry",
      title: "Carpentry & Custom Woodworks",
      shortDesc: "Bespoke teak wood main doors, modular kitchens, luxury wardrobes, acoustic wall paneling, and handcrafted interior architectural joinery.",
      icon: "fa-hammer",
      heroImg: "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=1200&q=80",
      samplePhotos: [
        { title: "Bespoke Acrylic Modular Kitchen & Island", image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80", tag: "Blum Soft-Close" },
        { title: "Floor-to-Ceiling Luxury Master Wardrobe", image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80", tag: "Lacquer Glass Finish" },
        { title: "Handcrafted Carved Teak Main Door", image: "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=800&q=80", tag: "Solid Burma Teak" },
        { title: "Living Room TV Media Console & Fluted Panel", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80", tag: "Veneer Finish" },
        { title: "Traditional Pooja Room Teak Wood Mandapam", image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80", tag: "CNC Jali Work" },
        { title: "Custom Study Unit & Floating Bookcase", image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80", tag: "Marine Plywood" }
      ],
      gallery: [
        "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80"
      ],
      highlights: [
        "100% BWP (Boiling Water Proof) Marine Grade 710 plywood & solid Teak wood",
        "Modular kitchens with soft-close tandem boxes and Blum/Hettich/Hafele hardware",
        "Custom master bedroom wardrobes with acrylic, lacquer glass, or veneer finishes",
        "Carved Teak wood entrance doors with brass architectural fittings",
        "Modern TV media consoles, prayer room (Pooja unit) woodwork & CNC jali partitions"
      ],
      process: [
        { step: "01", title: "3D Visual Design", desc: "Detailed 3D renders of wardrobes, kitchens, and living room units customized to client ergonomics." },
        { step: "02", title: "Wood & Hardware Selection", desc: "Choosing certified IS:710 plywood, laminates, natural veneers, and German hardware." },
        { step: "03", title: "Precision Crafting", desc: "Factory edge-banding, calibration, CNC cutting, and on-site master carpenter assembly." },
        { step: "04", title: "PU Polish & Handover", desc: "Multi-coat polyurethane (PU) polish, Melamine coating, and soft-close adjustment." }
      ],
      startingPrice: "₹ 1,200 / sq.ft (Modular woodwork)",
      faq: [
        { q: "What brand of hardware fittings do you use for modular kitchens?", a: "We exclusively use genuine Blum, Hettich, or Hafele hardware with a lifetime mechanical warranty." },
        { q: "Is your plywood termite and borer proof?", a: "Yes, we use chemically treated, 100% borer and termite proof BWP Marine Grade plywood with a 15-year warranty." }
      ]
    },
    {
      id: "flooring",
      slug: "flooring",
      title: "Flooring, Tiling & Marble Works",
      shortDesc: "Italian marble laying, mirror-finish granite countertops, large-format glazed vitrified tiles (GVT), wooden parquet, and anti-skid outdoor paving.",
      icon: "fa-layer-group",
      heroImg: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80",
      samplePhotos: [
        { title: "High-Gloss Italian Botticino Marble", image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80", tag: "Diamond Buffed" },
        { title: "Large Format 6ft x 4ft PGVT Vitrified Tiles", image: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=800&q=80", tag: "Seamless Joints" },
        { title: "Granite Staircase with Brass Profile Inlay", image: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80", tag: "Bullnose Finish" },
        { title: "Stain-Free Epoxy Grouting Bathroom Tiles", image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80", tag: "100% Waterproof" },
        { title: "Warm Engineered Hardwood Flooring", image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80", tag: "Bedroom Parquet" },
        { title: "Exterior Anti-Skid Cobblestone Paving", image: "https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=800&q=80", tag: "Driveway Landscaping" }
      ],
      gallery: [
        "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80"
      ],
      highlights: [
        "Large format 4ft x 2ft & 6ft x 4ft GVT vitrified tile laying with tile leveling spacers",
        "Natural Italian marble laying with diamond-pad multi-stage crystallization polishing",
        "Heavy-duty granite steps with bullnosing and anti-slip groove cutting",
        "Epoxy tile grouting for 100% stain-free, waterproof, and fungal-resistant bathroom joints",
        "Interlocking paver blocks & cobblestone driveway landscaping"
      ],
      process: [
        { step: "01", title: "Sub-base Leveling & Screeding", desc: "Laser leveling of concrete floor base with polymer-modified cement mortar." },
        { step: "02", title: "Tile / Slab Dry Layout", desc: "Arranging book-matched marble veins and aligning tile patterns before adhesive application." },
        { step: "03", title: "Precision Adhesive Laying", desc: "Using high-tensile tile adhesives (Laticrete/Roff) with vibration compactors and spacers." },
        { step: "04", title: "Epoxy Grouting & Buffing", desc: "Filling joints with two-component resin epoxy grout and mirror-sheen surface buffing." }
      ],
      startingPrice: "₹ 45 / sq.ft (Laying labor) | Turnkey options available",
      faq: [
        { q: "Why do you recommend epoxy grouting over white cement?", a: "Epoxy grout is 100% waterproof, does not absorb oil or dirt, never discolors, and prevents water seepage beneath tiles." },
        { q: "Do you polish existing dull marble floors?", a: "Yes, we provide diamond-pad crystallization restoration that brings back mirror gloss." }
      ]
    }
  ],

  projects: [
    {
      id: "p1",
      title: "Royal Palm Contemporary Villa",
      category: "Residential",
      serviceId: "houses-and-offices",
      location: "K.K. Nagar, Cuddalore",
      area: "3,850 sq.ft",
      year: "2024",
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1000&q=80",
      description: "A 4-BHK luxury contemporary villa featuring double-height living areas, Italian marble flooring, custom teakwood woodwork, and energy-efficient LED automation.",
      features: ["Turnkey Construction", "3D Elevation & Planning", "Smart Home Automation", "Landscaped Terrace"]
    },
    {
      id: "p2",
      title: "Vannarapalayam Commercial Plaza",
      category: "Commercial",
      serviceId: "houses-and-offices",
      location: "Vannarapalayam Main Road, Cuddalore",
      area: "14,500 sq.ft",
      year: "2023",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=80",
      description: "Multi-tenant corporate retail and office complex engineered with structural glazing, heavy 3-phase industrial power infrastructure, and high-speed elevator shafts.",
      features: ["Commercial Grade RCC", "Structural Glazing", "Booster Plumbing", "Basement Parking"]
    },
    {
      id: "p3",
      title: "Heritage Bungalow Complete Renovation",
      category: "Renovation",
      serviceId: "renovations",
      location: "Manjakuppam, Cuddalore",
      area: "2,600 sq.ft",
      year: "2024",
      image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1000&q=80",
      description: "Restoration of a 40-year-old residence into a modern open-plan home. Included structural column strengthening, complete new plumbing and electrical lines, and modern kitchen.",
      features: ["Structural Retrofitting", "Polymer Waterproofing", "Open Plan Layout", "New Bath & Kitchen"]
    },
    {
      id: "p4",
      title: "Modern Minimalist Kitchen & Wardrobe Joinery",
      category: "Carpentry",
      serviceId: "carpentry",
      location: "Beach Road, Cuddalore",
      area: "1,200 sq.ft Woodwork",
      year: "2024",
      image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1000&q=80",
      description: "Custom acrylic modular kitchen with German soft-close mechanisms, integrated breakfast counter, and floor-to-ceiling master bedroom wardrobes with sensor lighting.",
      features: ["Marine Plywood BWP", "Blum Soft-Close", "Acrylic Finish", "Pooja Unit Carving"]
    },
    {
      id: "p5",
      title: "Luxury Duplex GVT & Marble Flooring",
      category: "Flooring",
      serviceId: "flooring",
      location: "Semmandalam, Cuddalore",
      area: "3,200 sq.ft",
      year: "2023",
      image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1000&q=80",
      description: "Precision laser-guided installation of 6ft x 4ft glazed vitrified tiles with epoxy joints, combined with high-gloss Italian Bottochino marble in the formal drawing room.",
      features: ["Italian Marble", "Epoxy Grouting", "Granite Staircase", "Laser Leveling"]
    },
    {
      id: "p6",
      title: "Industrial Facility Heavy Electrical & Plumbing",
      category: "Commercial",
      serviceId: "electrical",
      location: "SIPCOT Industrial Complex, Cuddalore",
      area: "22,000 sq.ft",
      year: "2023",
      image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1000&q=80",
      description: "Industrial grade electrical substation, heavy cable trays, MCC panels, industrial drainage lines, and emergency deluge plumbing systems.",
      features: ["Industrial Substation", "Heavy Cable Trays", "Fire Deluge Lines", "Lightning Protection"]
    }
  ],

  reviews: [
    {
      id: "r1",
      author: "Senthil Kumar",
      role: "Homeowner, K.K. Nagar, Cuddalore",
      rating: 5,
      date: "2 weeks ago",
      text: "ARC Associates built our 3-BHK house in Cuddalore from blueprint to final key handover. Er. Ramanathan and his team maintained total transparency in cement, steel quality, and daily updates. Delivered 2 weeks ahead of schedule!",
      verified: true
    },
    {
      id: "r2",
      author: "Dr. Rajeshwari Anand",
      role: "Clinic Owner, Vannarapalayam, Cuddalore",
      rating: 5,
      date: "3 weeks ago",
      text: "We completely renovated our medical clinic space. ARC Associates handled the civil alterations, electrical rewiring, plumbing, and modern false ceilings with zero leakage. Extremely professional workmanship!",
      verified: true
    },
    {
      id: "r3",
      author: "V. Murugan",
      role: "Resident, Manjakuppam, Cuddalore",
      rating: 5,
      date: "1 month ago",
      text: "Their carpentry team did an amazing modular kitchen and wardrobe work in our villa. The marine wood quality and German fittings are top notch. Cost is very reasonable compared to Chennai contractors.",
      verified: true
    },
    {
      id: "r4",
      author: "K. Balasubramanian",
      role: "Industrialist, SIPCOT, Cuddalore",
      rating: 5,
      date: "1 month ago",
      text: "ARC Associates has been our trusted construction partner since 2005. Over the last 20 years they have built our factory sheds, commercial shops, and residential apartments with rock solid engineering.",
      verified: true
    },
    {
      id: "r5",
      author: "R. Vijay Anand",
      role: "Duplex Villa Owner, Semmandalam, Cuddalore",
      rating: 5,
      date: "2 months ago",
      text: "The 3D architectural plan and elevation design by Mrs. Chitra turned out exactly as rendered in the 3D model! Soil testing, foundation depth, and column casting were executed with extreme precision.",
      verified: true
    },
    {
      id: "r6",
      author: "Meenakshi Sundaram",
      role: "Heritage Renovation, Thirupapuliyur, Cuddalore",
      rating: 5,
      date: "2 months ago",
      text: "Our 45-year-old ancestral home was suffering from heavy roof leakage and damp walls. ARC structural team retrofitted the beams, applied polymer waterproofing, and gave our home a stunning modern luxury facelift.",
      verified: true
    },
    {
      id: "r7",
      author: "Er. G. Praveen",
      role: "Architect & Resident, Beach Road, Cuddalore",
      rating: 5,
      date: "3 months ago",
      text: "As an engineer myself, I appreciate ARC Associates' strict adherence to IS codes and curing times. Their plumbing hydrostatic pressure testing and electrical load calculations are standard-setting.",
      verified: true
    },
    {
      id: "r8",
      author: "S. Dinesh Babu",
      role: "Commercial Complex Owner, Nellikuppam Road",
      rating: 5,
      date: "3 months ago",
      text: "Constructed a 3-storey commercial plaza with ARC Associates. DTCP building plan sanctions, structural stability approvals, and stage-by-stage billing made the whole process smooth and stress-free.",
      verified: true
    },
    {
      id: "r9",
      author: "Anitha Radhakrishnan",
      role: "Interior & Woodwork Client, Kondur, Cuddalore",
      rating: 5,
      date: "4 months ago",
      text: "The Italian marble laying and custom carved teak wood main door are the talk of our neighborhood! Their master carpenters and tiling masons take immense pride in their craft.",
      verified: true
    },
    {
      id: "r10",
      author: "M. Saravanan",
      role: "Turnkey 4-BHK Villa, Padaleeswarar Nagar",
      rating: 5,
      date: "5 months ago",
      text: "100% satisfied with ARC Associates. No hidden costs, genuine Ramco 53-grade cement and branded Fe550D steel used throughout. Best construction company in Cuddalore by far!",
      verified: true
    }
  ],

  articles: [
    {
      id: "art1",
      title: "Key Factors to Check Before Starting Residential Construction in Cuddalore",
      category: "Planning & Tips",
      date: "September 2024",
      readTime: "4 min read",
      summary: "Understand coastal soil testing, safe foundation design, and DTCP approval checklists to ensure your dream home lasts for generations.",
      content: "Building a home in Cuddalore requires special attention to the water table level and coastal atmospheric salinity. Always insist on Fe550D corrosion-resistant TMT steel, proper plinth height above road level, and anti-termite soil treatment before laying the PCC bed."
    },
    {
      id: "art2",
      title: "Why Hydrostatic Pressure Testing is Critical for Concealed Plumbing",
      category: "Plumbing",
      date: "August 2024",
      readTime: "3 min read",
      summary: "How a 24-hour water pressure test protects your expensive tiles and wall paint from hidden future leakage catastrophes.",
      content: "Never allow plastering or tile work to begin until your CPVC water supply lines have undergone 24 hours of hydrostatic pressure testing at 10 kg/cm². At ARC Associates, we mandate photographic proof of zero gauge pressure loss for every bathroom."
    },
    {
      id: "art3",
      title: "5 Tell-Tale Signs Your Old Building Needs Immediate Structural Retrofitting",
      category: "Renovation",
      date: "July 2024",
      readTime: "5 min read",
      summary: "Diagonal wall cracks, spalling concrete, and rusted column rebar shouldn't be ignored. Learn how modern micro-concreting and jacketing restores structural strength.",
      content: "Hairline plaster cracks are cosmetic, but 45-degree diagonal cracks across masonry indicate differential settlement. RCC beam spalling requires immediate rust removal, zinc chromate priming, and polymer-modified mortar repair."
    }
  ],

  faqs: [
    {
      q: "How long has ARC Associates been operating in Cuddalore?",
      a: "ARC Associates was founded in 1998 and has been serving Cuddalore and surrounding districts in Tamil Nadu continuously for over 25 years with more than 580 successfully completed projects."
    },
    {
      q: "Do you provide turnkey construction contracts including materials and labor?",
      a: "Yes! We specialize in comprehensive turnkey contracts that cover soil testing, 3D architectural design, structural engineering, government approvals, material procurement (branded steel, cement, bricks, tiles), labor, plumbing, electrical, carpentry, and final painting."
    },
    {
      q: "Can I customize the brand of materials used for my house?",
      a: "Absolutely. In our itemized construction agreement, you can select your preferred brands for steel (Tata Tiscon / JSW), cement (Ramco / UltraTech), wires (Finolex / Havells), sanitary fittings (Kohler / Jaquar), and tiles."
    },
    {
      q: "How can I get an initial estimate for my plot?",
      a: "You can use our online Cost Estimator on this website, call us directly at 04142-293270 / +91 93823 12700, or send us your plot dimensions and requirements via WhatsApp."
    }
  ]
};

// Expose globally
window.ARC_DATA = ARC_DATA;
