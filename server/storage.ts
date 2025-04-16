import {
  users,
  type User,
  type InsertUser,
  services,
  type Service,
  type InsertService,
  projects,
  type Project,
  type InsertProject,
  testimonials,
  type Testimonial,
  type InsertTestimonial,
  contacts,
  type Contact,
  type InsertContact,
  partenaires,
  type Partenaires,
  type InsertPartenaires,
} from "@shared/schema";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Service operations
  getServices(): Promise<Service[]>;
  getService(id: number): Promise<Service | undefined>;
  createService(service: InsertService): Promise<Service>;
  updateService(
    id: number,
    service: Partial<InsertService>
  ): Promise<Service | undefined>;
  deleteService(id: number): Promise<boolean>;

  // Project operations
  getProjects(): Promise<Project[]>;
  getProject(id: number): Promise<Project | undefined>;
  getProjectsByCategory(category: string): Promise<Project[]>;
  createProject(project: InsertProject): Promise<Project>;
  updateProject(
    id: number,
    project: Partial<InsertProject>
  ): Promise<Project | undefined>;
  deleteProject(id: number): Promise<boolean>;

  // Testimonial operations
  getTestimonials(): Promise<Testimonial[]>;
  getTestimonial(id: number): Promise<Testimonial | undefined>;
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;

  updateTestimonial(
    id: number,
    testimonial: Partial<InsertTestimonial>
  ): Promise<Testimonial | undefined>;
  deleteTestimonial(id: number): Promise<boolean>;
  //partenaires operations
  getPartenaires(): Promise<Partenaires[]>;
  getPartenaire(id: number): Promise<Partenaires | undefined>;
  createPartenaire(partenaires: InsertPartenaires): Promise<Partenaires>;
  updatePartenaire(
    id: number,
    partenaires: Partial<InsertPartenaires>
  ): Promise<Partenaires | undefined>;

  // Contact operations
  getContacts(): Promise<Contact[]>;
  getContact(id: number): Promise<Contact | undefined>;
  createContact(contact: InsertContact): Promise<Contact>;
  deleteContact(id: number): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private services: Map<number, Service>;
  private projects: Map<number, Project>;
  private testimonials: Map<number, Testimonial>;
  private contacts: Map<number, Contact>;
  private partenaires: Map<number, Partenaires>;

  private currentUserId: number;
  private currentServiceId: number;
  private currentProjectId: number;
  private currentTestimonialId: number;
  private currentContactId: number;
  private currentPartenaireId: number;

  constructor() {
    this.users = new Map();
    this.services = new Map();
    this.projects = new Map();
    this.testimonials = new Map();
    this.contacts = new Map();
    this.partenaires = new Map();

    this.currentUserId = 1;
    this.currentServiceId = 1;
    this.currentProjectId = 1;
    this.currentTestimonialId = 1;
    this.currentContactId = 1;
    this.currentPartenaireId = 1;

    // Create initial admin user
    this.createUser({
      username: "admin",
      password: "$2b$10$8MYYFqGFh35MIvH.OBNEtu9U3Wh7JQK9yZI0tUm.UUUpkGI0Fgn0u", // "password"
      isAdmin: true,
    });

    // Add default services
    this.createService({
      title: "Développement Logiciel",
      description:
        "Applications sur mesure, sites web dynamiques et solutions mobiles développés selon vos besoins spécifiques.",
      icon: "fa-code",
      color: "blue",
    });

    this.createService({
      title: "Intelligence Artificielle et Big Data",
      description:
        "Analyse prédictive, traitement de données massives et systèmes d'IA adaptés à votre domaine d'activité.",
      icon: "fa-brain",
      color: "yellow",
    });

    this.createService({
      title: "Automatisation des processus d'affaires",
      description:
        "Optimisez votre flux de travail grâce à des solutions d'automatisation qui augmentent l'efficacité opérationnelle.",
      icon: "fa-cogs",
      color: "blue",
    });

    this.createService({
      title: "Conseil Digital",
      description:
        "Stratégies digitales, transformation numérique et accompagnement personnalisé pour une évolution réussie.",
      icon: "fa-chart-line",
      color: "yellow",
    });

    // Add sample projects with new fields
    this.createProject({
      title: "UDI New Year Challenge",
      description:
        "Plateforme pour augmentez la visibilité de votre entreprise en exploitant pleinement le potentiel du numérique. Attirez de nouveaux clients grâce à une présence en ligne optimisée et bénéficiez d'outils et de conseils stratégiques qui accéléreront votre croissance et vous permettront de vous démarquer sur le marché.",
      image: "/src/assets/projects/udichallenge.png",
      category: "Développement",
      link: "https://challenge-7f5t.onrender.com/",
      technologies: ["React", "Tailwindcss"],
      keyResults: [
        "Augmentation des ventes en ligne de 45%",
        "Réduction des coûts opérationnels de 30%",
        "Expérience utilisateur améliorée avec un taux de conversion de 15%",
      ],
    });

    this.createProject({
      title: "Portfolio Dr. Akowanou Onesime",
      description: "Portfolio pour un Expert en Science de l'Eau",
      image: "/src/assets/projects/portfolio.png",
      category: "Développement",
      link: "https://portfolio-dr-akowanou-onesime.onrender.com/",
      technologies: ["ReactJs"],
      keyResults: [
        "Prévision des tendances avec une précision de 92%",
        "Réduction du temps d'analyse de 70%",
        "ROI de 300% sur les campagnes marketing basées sur les données",
      ],
    });

    this.createProject({
      title: "Chorale EEU-TU",
      description:
        "Plateforme La Chorale EEU-TU (Calavi) est un ensemble vocal chrétien dévoué à la louange et à l'adoration.",
      image: "/src/assets/projects/choral.png",
      category: "Automatisation",
      link: "https://eeu-tu-chorale.onrender.com/",
      technologies: ["React", "Tailwindcss", "Node.js", "Express.js"],
      keyResults: [
        "Temps de traitement des dossiers RH réduit de 85%",
        "Économie annuelle de 120,000€",
        "Satisfaction des employés améliorée de 40%",
      ],
    });

    this.createProject({
      title: "Tics Master",
      description:
        "Site web pour Tics Master ayant une expertise technique et innovation pour offrir des solutions informatiques sur mesure qui propulsent votre entreprise vers l'avenir.",
      image: "/src/assets/projects/ticsmaster.png",
      category: "Conseil",
      link: "#",
      technologies: ["React", "Tailwindcss", "Node.js", "Express.js"],
      keyResults: [
        "Augmentation du taux de conversion de 35%",
        "Pipeline de vente amélioré de 50%",
        "Réduction du temps de cycle de vente de 28%",
      ],
    });

    this.createProject({
      title: "Woflix",
      description:
        "Plateforme de streaming qui vous plonge dans l'univers du cinéma africain et découvrez des histoires qui transcendent les frontières tout en mettant en lumière l'âme de notre continent.",
      image: "/src/assets/projects/woflix-logo.png",
      category: "Intelligence Artificielle",
      link: "#",
      technologies: ["React Js", "Tailwindcss", "Node.js", "Express.js"],
      keyResults: [
        "Plus de 250,000 téléchargements",
        "Engagement utilisateur quotidien à 72%",
        "Note moyenne de 4.8/5 sur les app stores",
      ],
    });

    this.createProject({
      title: "Orienty",
      description:
        "Notre IA analyse votre personnalité, vos compétences et vos aspirations pour des recommandations ultra-précises.",
      image: "/src/assets/projects/orienty.png",
      category: "Intelligence Artificielle",
      link: "#",
      technologies: ["React Js", "Tailwindcss", "Node.js", "Express.js"],
      keyResults: [
        "Plus de 250,000 téléchargements",
        "Engagement utilisateur quotidien à 72%",
        "Note moyenne de 4.8/5 sur les app stores",
      ],
    });

    // Add sample testimonials
    this.createTestimonial({
      name: "TICS MASTER SARL",
      position: "Directeur",
      company: "TICS MASTER SARL",
      content:
        "Je n'imaginais pas que vous seriez aussi rapide… je peux voir la qualité du site et j'imagine tout l'effort derrière.",
      image: "/src/assets/profil.png",
    });

    this.createTestimonial({
      name: "Dr Onésime AKOWAKOU",
      position: "Docteur",
      company: "Dr Onésime AKOWAKOU",
      content:
        "Très beau travail. Je n'hésiterai pas à vous recommander à mes contacts. J'ai été surtout surpris par la dynamique de l'équipe et même quand j'étais pas là, le travail évoluait et j'avais les retours en temps réel. ",
      image: "/src/assets/profil.png",
    });

    this.createTestimonial({
      name: "Merveil HOUENAGNON",
      position: "Manager T-Connect",
      company: "T-Connect",
      content:
        "J'aime bien le fait que vous avez livré à temps. Et aussi la qualité du travail, en fonction du coût, je ne m'attendais pas à un truc du genre. Merci beaucoup et on garde contact.",
      image: "/src/assets/profil.png",
    });

    this.createPartenaires({
      name: "Celtiis",
      logo: "/src/assets/others/celtiis.jpg",
      link: "https://celtiis.bj/",
    });
  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = {
      ...insertUser,
      id,
      isAdmin: insertUser.isAdmin ?? false,
    };
    this.users.set(id, user);
    return user;
  }

  // Service operations
  async getServices(): Promise<Service[]> {
    return Array.from(this.services.values());
  }

  async getService(id: number): Promise<Service | undefined> {
    return this.services.get(id);
  }

  async createService(service: InsertService): Promise<Service> {
    const id = this.currentServiceId++;
    const newService: Service = { ...service, id };
    this.services.set(id, newService);
    return newService;
  }

  async updateService(
    id: number,
    service: Partial<InsertService>
  ): Promise<Service | undefined> {
    const existingService = this.services.get(id);
    if (!existingService) return undefined;

    const updatedService = { ...existingService, ...service };
    this.services.set(id, updatedService);
    return updatedService;
  }

  async deleteService(id: number): Promise<boolean> {
    return this.services.delete(id);
  }

  // Project operations
  async getProjects(): Promise<Project[]> {
    return Array.from(this.projects.values());
  }

  async getProject(id: number): Promise<Project | undefined> {
    return this.projects.get(id);
  }

  async getProjectsByCategory(category: string): Promise<Project[]> {
    if (category === "Tous") {
      return Array.from(this.projects.values());
    }
    return Array.from(this.projects.values()).filter(
      (project) => project.category === category
    );
  }

  async createProject(project: InsertProject): Promise<Project> {
    const id = this.currentProjectId++;
    const newProject: Project = {
      ...project,
      id,
      technologies: project.technologies || [],
      keyResults: project.keyResults || [],
    };
    this.projects.set(id, newProject);
    return newProject;
  }

  async updateProject(
    id: number,
    project: Partial<InsertProject>
  ): Promise<Project | undefined> {
    const existingProject = this.projects.get(id);
    if (!existingProject) return undefined;

    const updatedProject = { ...existingProject, ...project };
    this.projects.set(id, updatedProject);
    return updatedProject;
  }

  async deleteProject(id: number): Promise<boolean> {
    return this.projects.delete(id);
  }

  // Testimonial operations
  async getTestimonials(): Promise<Testimonial[]> {
    return Array.from(this.testimonials.values());
  }

  async getTestimonial(id: number): Promise<Testimonial | undefined> {
    return this.testimonials.get(id);
  }

  async createTestimonial(
    testimonial: InsertTestimonial
  ): Promise<Testimonial> {
    const id = this.currentTestimonialId++;
    const newTestimonial: Testimonial = { ...testimonial, id };
    this.testimonials.set(id, newTestimonial);
    return newTestimonial;
  }

  async updateTestimonial(
    id: number,
    testimonial: Partial<InsertTestimonial>
  ): Promise<Testimonial | undefined> {
    const existingTestimonial = this.testimonials.get(id);
    if (!existingTestimonial) return undefined;

    const updatedTestimonial = { ...existingTestimonial, ...testimonial };
    this.testimonials.set(id, updatedTestimonial);
    return updatedTestimonial;
  }

  async deleteTestimonial(id: number): Promise<boolean> {
    return this.testimonials.delete(id);
  }

  // Contact operations
  async getContacts(): Promise<Contact[]> {
    return Array.from(this.contacts.values());
  }

  async getContact(id: number): Promise<Contact | undefined> {
    return this.contacts.get(id);
  }

  async createContact(contact: InsertContact): Promise<Contact> {
    const id = this.currentContactId++;
    // Création d'un nouveau contact avec des valeurs par défaut
    const newContact: Contact = {
      name: contact.name,
      email: contact.email,
      phone: contact.phone ?? null,
      subject: contact.subject,
      message: contact.message,
      id,
      createdAt: new Date(),
    };
    this.contacts.set(id, newContact);
    return newContact;
  }

  async deleteContact(id: number): Promise<boolean> {
    return this.contacts.delete(id);
  }

  // partenaires operations
  async getPartenaires(): Promise<Partenaires[]> {
    return Array.from(this.partenaires.values());
  }

  async getPartenaire(id: number): Promise<Partenaires | undefined> {
    return this.partenaires.get(id);
  }

  async createPartenaires(
    partenaires: InsertPartenaires
  ): Promise<Partenaires> {
    const id = this.currentPartenaireId++;
    const newPartenaires: Partenaires = {
      name: partenaires.name,
      logo: partenaires.logo,
      link: partenaires.link,
      id,
    };

    this.partenaires.set(id, newPartenaires);
    return newPartenaires;
  }
}

export const storage = new MemStorage();
