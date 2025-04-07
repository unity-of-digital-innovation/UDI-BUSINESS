import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { hash } from "bcryptjs";
import session from "express-session";
import MemoryStore from "memorystore";
import { storage } from "./storage";
import { authenticateUser, requireAuth, requireAdmin } from "./auth";
import { sendEmail } from "./email";
import { z } from "zod";
import { 
  insertContactSchema, 
  insertServiceSchema, 
  insertProjectSchema, 
  insertTestimonialSchema
} from "@shared/schema";

declare module "express-session" {
  interface SessionData {
    userId: number;
    username: string;
    isAdmin: boolean;
  }
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Configure session
  const SessionStore = MemoryStore(session);
  app.use(session({
    cookie: { maxAge: 86400000 }, // 24 hours
    store: new SessionStore({
      checkPeriod: 86400000 // 24 hours
    }),
    resave: false,
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET || "unity-digital-innovation-secret"
  }));

  // Auth routes
  app.post("/api/auth/login", async (req: Request, res: Response) => {
    try {
      const { username, password } = req.body;
      if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
      }
      
      const user = await authenticateUser(username, password);
      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      
      req.session.userId = user.id;
      req.session.username = user.username;
      req.session.isAdmin = user.isAdmin;
      
      return res.status(200).json({ 
        id: user.id, 
        username: user.username, 
        isAdmin: user.isAdmin 
      });
    } catch (error) {
      return res.status(500).json({ message: "Server error" });
    }
  });
  
  app.post("/api/auth/logout", (req: Request, res: Response) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: "Failed to logout" });
      }
      res.clearCookie("connect.sid");
      return res.status(200).json({ message: "Logged out successfully" });
    });
  });
  
  app.get("/api/auth/status", (req: Request, res: Response) => {
    if (req.session.userId) {
      return res.status(200).json({ 
        authenticated: true, 
        username: req.session.username,
        isAdmin: req.session.isAdmin
      });
    }
    return res.status(200).json({ authenticated: false });
  });
  
  // Public API routes
  app.get("/api/services", async (req: Request, res: Response) => {
    try {
      const services = await storage.getServices();
      return res.status(200).json(services);
    } catch (error) {
      return res.status(500).json({ message: "Failed to fetch services" });
    }
  });
  
  app.get("/api/projects", async (req: Request, res: Response) => {
    try {
      const category = req.query.category as string;
      if (category && category !== "Tous") {
        const projects = await storage.getProjectsByCategory(category);
        return res.status(200).json(projects);
      } else {
        const projects = await storage.getProjects();
        return res.status(200).json(projects);
      }
    } catch (error) {
      return res.status(500).json({ message: "Failed to fetch projects" });
    }
  });
  
  app.get("/api/testimonials", async (req: Request, res: Response) => {
    try {
      const testimonials = await storage.getTestimonials();
      return res.status(200).json(testimonials);
    } catch (error) {
      return res.status(500).json({ message: "Failed to fetch testimonials" });
    }
  });
  
  app.post("/api/contact", async (req: Request, res: Response) => {
    try {
      const contactData = insertContactSchema.parse(req.body);
      const contact = await storage.createContact(contactData);
      
      // Envoyer un email avec les données de contact
      const { success, previewUrl, error } = await sendEmail(contact);
      
      if (success) {
        return res.status(201).json({ 
          message: "Contact message sent successfully", 
          emailSent: true,
          previewUrl // URL pour prévisualiser l'email (utile pour le développement)
        });
      } else {
        console.error("Échec de l'envoi de l'email:", error);
        // Le message est enregistré même si l'email échoue
        return res.status(201).json({ 
          message: "Contact message saved but email failed", 
          emailSent: false,
          emailError: error 
        });
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid contact data", errors: error.errors });
      }
      return res.status(500).json({ message: "Failed to save contact message" });
    }
  });
  
  // Admin API routes
  app.get("/api/admin/contacts", requireAdmin, async (req: Request, res: Response) => {
    try {
      const contacts = await storage.getContacts();
      return res.status(200).json(contacts);
    } catch (error) {
      return res.status(500).json({ message: "Failed to fetch contacts" });
    }
  });
  
  app.delete("/api/admin/contacts/:id", requireAdmin, async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.deleteContact(id);
      if (success) {
        return res.status(200).json({ message: "Contact deleted successfully" });
      } else {
        return res.status(404).json({ message: "Contact not found" });
      }
    } catch (error) {
      return res.status(500).json({ message: "Failed to delete contact" });
    }
  });
  
  // Service admin routes
  app.post("/api/admin/services", requireAdmin, async (req: Request, res: Response) => {
    try {
      const serviceData = insertServiceSchema.parse(req.body);
      const service = await storage.createService(serviceData);
      return res.status(201).json(service);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid service data", errors: error.errors });
      }
      return res.status(500).json({ message: "Failed to create service" });
    }
  });
  
  app.put("/api/admin/services/:id", requireAdmin, async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const serviceData = insertServiceSchema.partial().parse(req.body);
      const service = await storage.updateService(id, serviceData);
      if (service) {
        return res.status(200).json(service);
      } else {
        return res.status(404).json({ message: "Service not found" });
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid service data", errors: error.errors });
      }
      return res.status(500).json({ message: "Failed to update service" });
    }
  });
  
  app.delete("/api/admin/services/:id", requireAdmin, async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.deleteService(id);
      if (success) {
        return res.status(200).json({ message: "Service deleted successfully" });
      } else {
        return res.status(404).json({ message: "Service not found" });
      }
    } catch (error) {
      return res.status(500).json({ message: "Failed to delete service" });
    }
  });
  
  // Project admin routes
  app.post("/api/admin/projects", requireAdmin, async (req: Request, res: Response) => {
    try {
      const projectData = insertProjectSchema.parse(req.body);
      const project = await storage.createProject(projectData);
      return res.status(201).json(project);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid project data", errors: error.errors });
      }
      return res.status(500).json({ message: "Failed to create project" });
    }
  });
  
  app.put("/api/admin/projects/:id", requireAdmin, async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const projectData = insertProjectSchema.partial().parse(req.body);
      const project = await storage.updateProject(id, projectData);
      if (project) {
        return res.status(200).json(project);
      } else {
        return res.status(404).json({ message: "Project not found" });
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid project data", errors: error.errors });
      }
      return res.status(500).json({ message: "Failed to update project" });
    }
  });
  
  app.delete("/api/admin/projects/:id", requireAdmin, async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.deleteProject(id);
      if (success) {
        return res.status(200).json({ message: "Project deleted successfully" });
      } else {
        return res.status(404).json({ message: "Project not found" });
      }
    } catch (error) {
      return res.status(500).json({ message: "Failed to delete project" });
    }
  });
  
  // Testimonial admin routes
  app.post("/api/admin/testimonials", requireAdmin, async (req: Request, res: Response) => {
    try {
      const testimonialData = insertTestimonialSchema.parse(req.body);
      const testimonial = await storage.createTestimonial(testimonialData);
      return res.status(201).json(testimonial);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid testimonial data", errors: error.errors });
      }
      return res.status(500).json({ message: "Failed to create testimonial" });
    }
  });
  
  app.put("/api/admin/testimonials/:id", requireAdmin, async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const testimonialData = insertTestimonialSchema.partial().parse(req.body);
      const testimonial = await storage.updateTestimonial(id, testimonialData);
      if (testimonial) {
        return res.status(200).json(testimonial);
      } else {
        return res.status(404).json({ message: "Testimonial not found" });
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid testimonial data", errors: error.errors });
      }
      return res.status(500).json({ message: "Failed to update testimonial" });
    }
  });
  
  app.delete("/api/admin/testimonials/:id", requireAdmin, async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.deleteTestimonial(id);
      if (success) {
        return res.status(200).json({ message: "Testimonial deleted successfully" });
      } else {
        return res.status(404).json({ message: "Testimonial not found" });
      }
    } catch (error) {
      return res.status(500).json({ message: "Failed to delete testimonial" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
