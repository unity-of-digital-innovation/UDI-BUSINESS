import { 
  users, type User, type InsertUser,
  services, type Service, type InsertService,
  projects, type Project, type InsertProject,
  testimonials, type Testimonial, type InsertTestimonial,
  contacts, type Contact, type InsertContact
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
  updateService(id: number, service: Partial<InsertService>): Promise<Service | undefined>;
  deleteService(id: number): Promise<boolean>;
  
  // Project operations
  getProjects(): Promise<Project[]>;
  getProject(id: number): Promise<Project | undefined>;
  getProjectsByCategory(category: string): Promise<Project[]>;
  createProject(project: InsertProject): Promise<Project>;
  updateProject(id: number, project: Partial<InsertProject>): Promise<Project | undefined>;
  deleteProject(id: number): Promise<boolean>;
  
  // Testimonial operations
  getTestimonials(): Promise<Testimonial[]>;
  getTestimonial(id: number): Promise<Testimonial | undefined>;
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;
  updateTestimonial(id: number, testimonial: Partial<InsertTestimonial>): Promise<Testimonial | undefined>;
  deleteTestimonial(id: number): Promise<boolean>;
  
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
  
  private currentUserId: number;
  private currentServiceId: number;
  private currentProjectId: number;
  private currentTestimonialId: number;
  private currentContactId: number;

  constructor() {
    this.users = new Map();
    this.services = new Map();
    this.projects = new Map();
    this.testimonials = new Map();
    this.contacts = new Map();
    
    this.currentUserId = 1;
    this.currentServiceId = 1;
    this.currentProjectId = 1;
    this.currentTestimonialId = 1;
    this.currentContactId = 1;
    
    // Create initial admin user
    this.createUser({
      username: "admin",
      password: "$2b$10$8MYYFqGFh35MIvH.OBNEtu9U3Wh7JQK9yZI0tUm.UUUpkGI0Fgn0u", // "password"
      isAdmin: true
    });
    
    // Add default services
    this.createService({
      title: "Développement Logiciel",
      description: "Applications sur mesure, sites web dynamiques et solutions mobiles développés selon vos besoins spécifiques.",
      icon: "fa-code",
      color: "blue"
    });
    
    this.createService({
      title: "Intelligence Artificielle et Big Data",
      description: "Analyse prédictive, traitement de données massives et systèmes d'IA adaptés à votre domaine d'activité.",
      icon: "fa-brain",
      color: "yellow"
    });
    
    this.createService({
      title: "Automatisation des processus d'affaires",
      description: "Optimisez votre flux de travail grâce à des solutions d'automatisation qui augmentent l'efficacité opérationnelle.",
      icon: "fa-cogs",
      color: "blue"
    });
    
    this.createService({
      title: "Conseil Digital",
      description: "Stratégies digitales, transformation numérique et accompagnement personnalisé pour une évolution réussie.",
      icon: "fa-chart-line",
      color: "yellow"
    });
    
    // Add sample projects with new fields
    this.createProject({
      title: "Application E-commerce",
      description: "Plateforme complète de commerce électronique avec passerelle de paiement et système de gestion des commandes. Notre solution permet une expérience d'achat fluide, une gestion des stocks en temps réel, et des intégrations avec différentes passerelles de paiement.",
      image: "/src/assets/projects/ecommerce.svg",
      category: "Développement",
      link: "#",
      technologies: ["React", "Node.js", "MongoDB", "AWS"],
      keyResults: [
        "Augmentation des ventes en ligne de 45%",
        "Réduction des coûts opérationnels de 30%",
        "Expérience utilisateur améliorée avec un taux de conversion de 15%"
      ]
    });
    
    this.createProject({
      title: "Système de BI et Analytics",
      description: "Tableau de bord d'analyse de données et plateforme de business intelligence personnalisée. Notre solution intègre des algorithmes d'apprentissage automatique pour prédire les tendances et aider à la prise de décision.",
      image: "/src/assets/projects/ai-analytics.svg",
      category: "Intelligence Artificielle",
      link: "#",
      technologies: ["Python", "TensorFlow", "R", "PowerBI", "AWS"],
      keyResults: [
        "Prévision des tendances avec une précision de 92%",
        "Réduction du temps d'analyse de 70%",
        "ROI de 300% sur les campagnes marketing basées sur les données"
      ]
    });
    
    this.createProject({
      title: "Workflow automatisé",
      description: "Solution d'automatisation des processus RH pour une entreprise internationale. Ce système gère l'ensemble du cycle de vie des employés, de l'embauche à la sortie, en automatisant les tâches répétitives.",
      image: "/src/assets/projects/automation.svg",
      category: "Automatisation",
      link: "#",
      technologies: ["Java", "Spring Boot", "Angular", "Docker", "Kubernetes"],
      keyResults: [
        "Temps de traitement des dossiers RH réduit de 85%",
        "Économie annuelle de 120,000€",
        "Satisfaction des employés améliorée de 40%"
      ]
    });

    this.createProject({
      title: "CRM Enterprise",
      description: "Système complet de gestion de la relation client avec automatisation marketing et analyses avancées. Notre CRM permet de suivre l'intégralité du parcours client et d'optimiser les processus de vente.",
      image: "/src/assets/projects/crm.svg",
      category: "Conseil",
      link: "#",
      technologies: ["Salesforce", "JavaScript", "Apex", "AWS", "Tableau"],
      keyResults: [
        "Augmentation du taux de conversion de 35%",
        "Pipeline de vente amélioré de 50%",
        "Réduction du temps de cycle de vente de 28%"
      ]
    });

    this.createProject({
      title: "Application Mobile Santé",
      description: "Application mobile de suivi de santé et de bien-être avec intégration IoT pour les appareils connectés. Cette solution permet aux utilisateurs de suivre leurs activités, leur alimentation et leurs constantes vitales.",
      image: "/src/assets/projects/mobile-app.svg",
      category: "Développement",
      link: "#",
      technologies: ["React Native", "Firebase", "Swift", "Kotlin", "IoT"],
      keyResults: [
        "Plus de 250,000 téléchargements",
        "Engagement utilisateur quotidien à 72%",
        "Note moyenne de 4.8/5 sur les app stores"
      ]
    });
    
    // Add sample testimonials
    this.createTestimonial({
      name: "Sophie Martin",
      position: "Directrice Marketing",
      company: "TechSolutions",
      content: "L'équipe d'UDI a complètement transformé notre processus de gestion client. Leur solution d'automatisation nous fait économiser des heures chaque semaine.",
      image: "https://images.unsplash.com/photo-1557862921-37829c790f19?ixlib=rb-4.0.3&auto=format&fit=crop&w=60&h=60&q=80"
    });
    
    this.createTestimonial({
      name: "Thomas Dubois",
      position: "CEO",
      company: "StartupNow",
      content: "Notre application développée par UDI a connu un succès immédiat auprès de nos utilisateurs. Leur approche centrée sur l'utilisateur a fait toute la différence.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=60&h=60&q=80"
    });
    
    this.createTestimonial({
      name: "Camille Leroy",
      position: "Directrice des Opérations",
      company: "DataCorp",
      content: "Le système d'IA que UDI a développé pour notre analyse de données a révolutionné notre prise de décision. C'est un investissement qui continue de rapporter.",
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=60&h=60&q=80"
    });
  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { 
      ...insertUser, 
      id, 
      isAdmin: insertUser.isAdmin ?? false 
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
  
  async updateService(id: number, service: Partial<InsertService>): Promise<Service | undefined> {
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
      project => project.category === category
    );
  }
  
  async createProject(project: InsertProject): Promise<Project> {
    const id = this.currentProjectId++;
    const newProject: Project = { 
      ...project, 
      id, 
      technologies: project.technologies || [],
      keyResults: project.keyResults || []
    };
    this.projects.set(id, newProject);
    return newProject;
  }
  
  async updateProject(id: number, project: Partial<InsertProject>): Promise<Project | undefined> {
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
  
  async createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial> {
    const id = this.currentTestimonialId++;
    const newTestimonial: Testimonial = { ...testimonial, id };
    this.testimonials.set(id, newTestimonial);
    return newTestimonial;
  }
  
  async updateTestimonial(id: number, testimonial: Partial<InsertTestimonial>): Promise<Testimonial | undefined> {
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
    const newContact: Contact = { 
      ...contact, 
      id,
      createdAt: new Date()
    };
    this.contacts.set(id, newContact);
    return newContact;
  }
  
  async deleteContact(id: number): Promise<boolean> {
    return this.contacts.delete(id);
  }
}

export const storage = new MemStorage();
