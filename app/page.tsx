"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { motion, useScroll, AnimatePresence } from "framer-motion"
import {
  Download,
  Send,
  Linkedin,
  Github,
  ExternalLink,
  Instagram,
  Phone,
  MapPin,
  Menu,
  X,
  Code,
  BookOpen,
  Award,
  Terminal,
  Mail,
} from "lucide-react"

const globalStyles = `
  * {
    position: relative;
    z-index: 1;
  }
  .bg-element {
    z-index: 0;
  }
`

export default function Home() {
  const { toast } = useToast()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })
  const [cursorVariant, setCursorVariant] = useState("default")
  const [/* splineLoaded, */ setSplineLoaded] = useState(false)

  // Refs for sections
  const homeRef = useRef(null)
  const aboutRef = useRef(null)
  const skillsRef = useRef(null)
  const projectsRef = useRef(null)
  const educationRef = useRef(null)
  const contactRef = useRef(null)

  // For parallax effects
  const { scrollYProgress } = useScroll()
  /* const heroImageY = useTransform(scrollYProgress, [0, 0.5], [0, 100]) */
  /* const heroTextY = useTransform(scrollYProgress, [0, 0.5], [0, -50]) */

  // Custom cursor effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  // Intersection Observer for active section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.5 },
    )

    const sections = [homeRef, aboutRef, skillsRef, projectsRef, educationRef, contactRef]
    sections.forEach((section) => {
      if (section.current) {
        observer.observe(section.current)
      }
    })

    return () => {
      sections.forEach((section) => {
        if (section.current) {
          observer.unobserve(section.current)
        }
      })
    }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // In a real implementation, you would send this data to your backend
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Message sent!",
        description: "Thank you for reaching out. I'll get back to you soon.",
      })

      // Reset form
      setName("")
      setEmail("")
      setMessage("")
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Your message couldn't be sent. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setMobileMenuOpen(false)
  }

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const cursorVariants = {
    default: {
      x: cursorPosition.x - 16,
      y: cursorPosition.y - 16,
      height: 0,
      width: 0,
    },
    button: {
      x: cursorPosition.x - 40,
      y: cursorPosition.y - 40,
      height: 0,
      width: 0,
    },
  }

  const enterButton = () => setCursorVariant("button")
  const leaveButton = () => setCursorVariant("default")

  return (
    <div className="min-h-screen flex flex-col dark relative overflow-hidden">
      <style jsx global>
        {globalStyles}
      </style>
      {/* Custom cursor */}
      <div className="cursor-container fixed top-0 left-0 pointer-events-none z-50 hidden md:block">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`cursor-sparkle-${i}`}
            className="absolute rounded-full pointer-events-none"
            style={{
              left: cursorPosition.x,
              top: cursorPosition.y,
              background: `radial-gradient(circle, rgba(168,85,247,0.9) 0%, rgba(168,85,247,0) 70%)`,
              boxShadow: "0 0 8px 2px rgba(168, 85, 247, 0.8)",
              width: Math.random() * 8 + 2,
              height: Math.random() * 8 + 2,
            }}
            animate={{
              x: Math.random() * 20 - 10,
              y: Math.random() * 20 - 10,
              scale: [1, 1.5, 0],
              opacity: [1, 0.8, 0],
            }}
            transition={{
              duration: Math.random() * 0.5 + 0.3,
              repeat: Number.POSITIVE_INFINITY,
              repeatDelay: Math.random() * 0.1,
            }}
          />
        ))}
        <motion.div
          className="absolute rounded-full pointer-events-none"
          style={{
            left: cursorPosition.x - 4,
            top: cursorPosition.y - 4,
            width: 8,
            height: 8,
            background: "rgba(168, 85, 247, 1)",
            boxShadow: "0 0 10px 2px rgba(168, 85, 247, 1)",
          }}
        />
      </div>

      {/* Animated Background */}
      <div className="fixed inset-0 -z-10 bg-black bg-element">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-blue-500/10"
            initial={{
              width: Math.random() * 200 + 50,
              height: Math.random() * 200 + 50,
              x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1000),
              y: Math.random() * (typeof window !== "undefined" ? window.innerHeight : 1000),
              opacity: Math.random() * 0.5,
            }}
            animate={{
              y: [0, Math.random() * 100 - 50],
              x: [0, Math.random() * 100 - 50],
              opacity: [Math.random() * 0.3, Math.random() * 0.6],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          />
        ))}
        {/* Purple sparkles */}
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={`sparkle-${i}`}
            className="absolute rounded-full"
            initial={{
              width: Math.random() * 6 + 2,
              height: Math.random() * 6 + 2,
              x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1000),
              y: Math.random() * (typeof window !== "undefined" ? window.innerHeight : 1000),
              background: `radial-gradient(circle, rgba(168,85,247,0.8) 0%, rgba(168,85,247,0.1) 70%)`,
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.4, 0.8, 0.4],
              boxShadow: [
                "0 0 5px 0px rgba(168, 85, 247, 0.3)",
                "0 0 10px 2px rgba(168, 85, 247, 0.5)",
                "0 0 5px 0px rgba(168, 85, 247, 0.3)",
              ],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      {/* Dark overlay for better content visibility */}
      <div className="fixed inset-0 bg-black/70 -z-5"></div>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 px-4 py-2">
        <div className="container mx-auto">
          <div className="bg-black/80 backdrop-blur-md rounded-full border border-purple-500/40 px-6 py-3 flex justify-between items-center shadow-lg shadow-purple-900/20">
            <Link
              href="/"
              className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 drop-shadow-[0_1.2px_1.2px_rgba(180,100,255,0.8)]"
            >
              Yeshwanth Mantri
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {["home", "about", "skills", "projects", "education", "contact"].map((section) => (
                <motion.button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`text-sm font-medium transition-colors hover:text-blue-400 ${
                    activeSection === section ? "text-blue-400" : "text-gray-300"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  onMouseEnter={enterButton}
                  onMouseLeave={leaveButton}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </motion.button>
              ))}
              <motion.div whileHover={{ scale: 1.05 }} onMouseEnter={enterButton} onMouseLeave={leaveButton}>
                <Button
                  asChild
                  size="sm"
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-full"
                >
                  <a href="/resume.pdf" download>
                    <Download className="mr-2 h-4 w-4" />
                    Resume
                  </a>
                </Button>
              </motion.div>
            </nav>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              className="md:hidden absolute w-full px-4 mt-2"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-black/90 backdrop-blur-md rounded-2xl border border-purple-500/30 py-4 px-4 flex flex-col space-y-4">
                {["home", "about", "skills", "projects", "education", "contact"].map((section) => (
                  <motion.button
                    key={section}
                    onClick={() => scrollToSection(section)}
                    className="text-sm font-medium py-2 hover:text-blue-400"
                    whileHover={{ x: 10 }}
                  >
                    {section.charAt(0).toUpperCase() + section.slice(1)}
                  </motion.button>
                ))}
                <Button asChild size="sm" className="w-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full">
                  <a href="/resume.pdf" download>
                    <Download className="mr-2 h-4 w-4" />
                    Resume
                  </a>
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className="flex-1 pt-12">
        {/* Hero Section */}
        <section id="home" ref={homeRef} className="min-h-screen flex items-center relative overflow-hidden pt-8">
          <div className="container mx-auto px-4 py-10 md:py-0">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <motion.div
                className="md:w-[60%] space-y-6 z-10"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerContainer}
              >
                <motion.h1 className="text-4xl md:text-7xl font-bold leading-tight" variants={fadeInUp}>
                  Hi, I'm{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 drop-shadow-[0_1.2px_1.2px_rgba(180,100,255,0.8)]">
                    Yeshwanth
                  </span>
                </motion.h1>
                <motion.h2 className="text-2xl md:text-4xl font-medium text-gray-300" variants={fadeInUp}>
                  Full-Stack Developer
                </motion.h2>
                <motion.p className="text-lg text-gray-400 max-w-xl" variants={fadeInUp}>
                  Dedicated IT student skilled in problem-solving, full-stack development, and data analysis. Building
                  innovative solutions with modern web technologies.
                </motion.p>
                <motion.div className="flex flex-wrap gap-4 pt-4" variants={fadeInUp}>
                  <motion.div whileHover={{ scale: 1.05 }} onMouseEnter={enterButton} onMouseLeave={leaveButton}>
                    <Button
                      onClick={() => scrollToSection("projects")}
                      className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all duration-300 rounded-full relative z-10 pointer-events-auto"
                    >
                      View My Projects
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }} onMouseEnter={enterButton} onMouseLeave={leaveButton}>
                    <Button
                      variant="outline"
                      onClick={() => scrollToSection("contact")}
                      className="border-blue-500 text-blue-400 hover:bg-blue-500/10 transition-all duration-300 rounded-full relative z-10 pointer-events-auto"
                    >
                      Get In Touch
                    </Button>
                  </motion.div>
                </motion.div>

                {/* Enhanced Social Media Section */}
                <motion.div className="flex gap-6 pt-8 z-10" variants={fadeInUp}>
                  <motion.a
                    href="https://www.linkedin.com/in/mantri-yeshwanth"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -8, scale: 1.15 }}
                    className="social-icon-link"
                    onMouseEnter={enterButton}
                    onMouseLeave={leaveButton}
                  >
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-600 to-blue-400 p-0.5 shadow-lg shadow-blue-500/40 hover:shadow-blue-500/70 transition-all duration-300 enhanced-glow">
                      <div className="w-full h-full rounded-full bg-black/80 flex items-center justify-center">
                        <Linkedin size={28} className="text-blue-400" />
                      </div>
                    </div>
                    <span className="block text-center text-xs mt-2 text-blue-400 font-medium">LinkedIn</span>
                  </motion.a>

                  <motion.a
                    href="https://github.com/MantriYeshwanth"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -8, scale: 1.15 }}
                    className="social-icon-link"
                    onMouseEnter={enterButton}
                    onMouseLeave={leaveButton}
                  >
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-600 to-purple-400 p-0.5 shadow-lg shadow-purple-500/40 hover:shadow-purple-500/70 transition-all duration-300 enhanced-glow">
                      <div className="w-full h-full rounded-full bg-black/80 flex items-center justify-center">
                        <Github size={28} className="text-purple-400" />
                      </div>
                    </div>
                    <span className="block text-center text-xs mt-2 text-purple-400 font-medium">GitHub</span>
                  </motion.a>

                  <motion.a
                    href="https://leetcode.com/YeshwanthMantri"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -8, scale: 1.15 }}
                    className="social-icon-link"
                    onMouseEnter={enterButton}
                    onMouseLeave={leaveButton}
                  >
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-500 to-yellow-400 p-0.5 shadow-lg shadow-orange-500/40 hover:shadow-orange-500/70 transition-all duration-300 enhanced-glow">
                      <div className="w-full h-full rounded-full bg-black/80 flex items-center justify-center">
                        <Code size={28} className="text-orange-400" />
                      </div>
                    </div>
                    <span className="block text-center text-xs mt-2 text-orange-400 font-medium">LeetCode</span>
                  </motion.a>

                  <motion.a
                    href="https://www.instagram.com/yeah__shh/"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -8, scale: 1.15 }}
                    className="social-icon-link"
                    onMouseEnter={enterButton}
                    onMouseLeave={leaveButton}
                  >
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-pink-600 to-purple-400 p-0.5 shadow-lg shadow-pink-500/40 hover:shadow-pink-500/70 transition-all duration-300 enhanced-glow">
                      <div className="w-full h-full rounded-full bg-black/80 flex items-center justify-center">
                        <Instagram size={28} className="text-pink-400" />
                      </div>
                    </div>
                    <span className="block text-center text-xs mt-2 text-pink-400 font-medium">Instagram</span>
                  </motion.a>
                </motion.div>
              </motion.div>

              <motion.div
                className="relative w-[320px] h-[320px] md:w-[380px] md:h-[380px] md:mr-8"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
              >
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/30 to-purple-600/30 blur-xl opacity-30 animate-pulse -z-10" />
                <div className="relative w-full h-full overflow-hidden rounded-full border-2 border-purple-500/30 shadow-2xl shadow-purple-500/20">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/tankbund-z5dzmKbgWCEs7ycg0RxZw1KL4DlHN3.jpeg"
                    alt="Yeshwanth Mantri"
                    fill
                    className="object-cover object-center"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-transparent" />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" ref={aboutRef} className="py-20">
          <style jsx global>{`
            #about p, #about li {
              color: white !important;
            }
            #about h3 {
              color: #60a5fa !important; /* text-blue-400 */
            }
          `}</style>
          <div className="container mx-auto px-4">
            <motion.div
              className="max-w-3xl mx-auto"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <motion.h2
                className="text-3xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 drop-shadow-[0_1.2px_1.2px_rgba(180,100,255,0.8)]"
                variants={fadeInUp}
              >
                About Me
              </motion.h2>

              <motion.div className="space-y-6" variants={fadeInUp}>
                <motion.p className="text-lg text-white font-medium z-10 relative" variants={fadeInUp}>
                  I'm a passionate IT student at Keshav Memorial Institute of Technology with a strong foundation in
                  full-stack development and problem-solving. My journey in tech is driven by a desire to create
                  innovative solutions that make a difference.
                </motion.p>

                <motion.p className="text-lg text-white font-medium z-10 relative" variants={fadeInUp}>
                  With expertise in various programming languages and frameworks, I enjoy tackling complex challenges
                  and turning ideas into functional applications. I'm particularly interested in web development, data
                  analysis, and building user-friendly interfaces.
                </motion.p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" ref={skillsRef} className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              className="max-w-4xl mx-auto"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <motion.h2
                className="text-3xl font-bold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 drop-shadow-[0_1.2px_1.2px_rgba(180,100,255,0.8)]"
                variants={fadeInUp}
              >
                Technical Skills
              </motion.h2>

              <motion.div className="grid grid-cols-2 md:grid-cols-3 gap-6" variants={staggerContainer}>
                {[
                  { name: "Languages", items: ["JavaScript", "Python", "Java", "C++", "C"] },
                  { name: "Frontend", items: ["React.js", "HTML", "CSS", "Bootstrap"] },
                  { name: "Backend", items: ["Node.js", "Express.js", "MongoDB", "MySQL"] },
                  { name: "DevOps", items: ["Docker", "Kubernetes", "Jenkins", "Maven", "Git", "CI/CD"] },
                  { name: "Tools", items: ["VS Code", "Postman", "Jupyter", "Figma"] },
                  {
                    name: "Soft Skills",
                    items: ["Problem Solving", "Team Collaboration", "Communication", "Time Management", "Leadership"],
                  },
                ].map((category, index) => (
                  <motion.div
                    key={index}
                    className="p-6 rounded-xl bg-black/50 border border-purple-500/20 backdrop-blur-sm hover:bg-black/70 transition-all duration-300"
                    variants={fadeInUp}
                    whileHover={{ y: -5 }}
                  >
                    <h3 className="text-xl font-semibold mb-4 text-blue-400">{category.name}</h3>
                    <ul className="space-y-2">
                      {category.items.map((item, i) => (
                        <motion.li
                          key={i}
                          className="text-white"
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                        >
                          <span className="mr-2 text-blue-400">▹</span>
                          {item}
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" ref={projectsRef} className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              className="max-w-5xl mx-auto"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <motion.h2
                className="text-3xl font-bold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 drop-shadow-[0_1.2px_1.2px_rgba(180,100,255,0.8)]"
                variants={fadeInUp}
              >
                Featured Projects
              </motion.h2>

              <motion.div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" variants={staggerContainer}>
                {[
                  {
                    title: "Review Bot",
                    description:
                      "A web app that analyzes product reviews, generates pros and cons, and includes a chatbot to assist with review-related queries.",
                    tech: ["React.js", "Node.js", "Express.js", "MongoDB", "Vite"],
                    image: "/images/reviewBot.jpg",
                    link: "#",
                  },
                  {
                    title: "RecipeRealm",
                    description:
                      "A recipe recommendation app that suggests recipes based on user-input ingredients using web scraping and LLM.",
                    tech: ["React.js", "Node.js", "Express.js", "MongoDB", "Web Scraping", "LLM"],
                    image: "/images/recipeRealm.webp",
                    link: "#",
                  },
                  {
                    title: "Sashakt",
                    description:
                      "An interactive web application for children to learn essential child rights through engaging games.",
                    tech: ["MongoDB", "Express.js", "React.js", "Node.js"],
                    image: "/images/sashakt.jpg",
                    link: "#",
                  },
                ].map((project, index) => (
                  <motion.div
                    key={index}
                    className="group relative overflow-hidden rounded-xl bg-black/50 border border-purple-500/20 hover:border-blue-500/50 transition-all duration-300"
                    variants={fadeInUp}
                    whileHover={{ y: -10 }}
                  >
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        width={720}
                        height={450}
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-blue-400">{project.title}</h3>
                      <p className="mt-2 text-white">{project.description}</p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {project.tech.map((tech, i) => (
                          <div
                            key={i}
                            className="rounded-full bg-blue-500/20 border border-blue-500/30 px-2.5 py-0.5 text-xs font-semibold text-blue-300"
                          >
                            {tech}
                          </div>
                        ))}
                      </div>
                      <motion.div
                        className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        initial={{ y: 20 }}
                        whileInView={{ y: 0 }}
                      >
                        <Button
                          asChild
                          variant="outline"
                          size="sm"
                          className="border-blue-500 text-blue-400 hover:bg-blue-500/20 rounded-full"
                        >
                          <a href={project.link} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="mr-2 h-4 w-4" />
                            View Project
                          </a>
                        </Button>
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div className="mt-16 text-center" variants={fadeInUp}>
                <p className="text-white font-medium mb-6">
                  Check out my GitHub for more projects and code samples. I'm constantly working on new ideas and
                  improving my skills.
                </p>
                <motion.div whileHover={{ scale: 1.05 }} onMouseEnter={enterButton} onMouseLeave={leaveButton}>
                  <Button
                    asChild
                    className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-full"
                  >
                    <a
                      href="https://github.com/MantriYeshwanth"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white font-medium"
                    >
                      <Github className="mr-2 h-5 w-5" />
                      View All Projects
                    </a>
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Education Section */}
        <section id="education" ref={educationRef} className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              className="max-w-4xl mx-auto"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <motion.h2
                className="text-3xl font-bold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 drop-shadow-[0_1.2px_1.2px_rgba(180,100,255,0.8)]"
                variants={fadeInUp}
              >
                Education & Achievements
              </motion.h2>

              <motion.div
                className="relative border-l-2 border-blue-500/50 pl-8 ml-4 space-y-12 py-4"
                variants={staggerContainer}
              >
                {/* Education Timeline */}
                <motion.div className="relative" variants={fadeInUp}>
                  <div className="absolute -left-12 w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                    <BookOpen className="h-4 w-4 text-white" />
                  </div>
                  <div className="p-6 rounded-xl bg-black/50 border border-purple-500/20 backdrop-blur-sm hover:bg-black/70 transition-all duration-300">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-2">
                      <h3 className="text-xl font-bold text-blue-400">Keshav Memorial Institute of Technology</h3>
                      <span className="text-gray-400">2022 - 2026</span>
                    </div>
                    <p className="text-white">B.Tech. - Information Technology</p>
                    <p className="text-gray-400 mt-1">CGPA: 8.81</p>
                  </div>
                </motion.div>

                <motion.div className="relative" variants={fadeInUp}>
                  <div className="absolute -left-12 w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                    <BookOpen className="h-4 w-4 text-white" />
                  </div>
                  <div className="p-6 rounded-xl bg-black/50 border border-purple-500/20 backdrop-blur-sm hover:bg-black/70 transition-all duration-300">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-2">
                      <h3 className="text-xl font-bold text-blue-400">Sri Chaitanya Jr. College</h3>
                      <span className="text-gray-400">2020 - 2022</span>
                    </div>
                    <p className="text-white">Board of Intermediate Education, Telangana - MPC</p>
                    <p className="text-gray-400 mt-1">Percentage: 97%</p>
                  </div>
                </motion.div>

                <motion.div className="relative" variants={fadeInUp}>
                  <div className="absolute -left-12 w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                    <BookOpen className="h-4 w-4 text-white" />
                  </div>
                  <div className="p-6 rounded-xl bg-black/50 border border-purple-500/20 backdrop-blur-sm hover:bg-black/70 transition-all duration-300">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-2">
                      <h3 className="text-xl font-bold text-blue-400">Krishnaveni Talent School</h3>
                      <span className="text-gray-400">2010 - 2020</span>
                    </div>
                    <p className="text-white">Board of Secondary Education, Telangana - SSC</p>
                    <p className="text-gray-400 mt-1">CGPA: 10</p>
                  </div>
                </motion.div>

                {/* Achievements */}
                <motion.div className="relative" variants={fadeInUp}>
                  <div className="absolute -left-12 w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center">
                    <Award className="h-4 w-4 text-white" />
                  </div>
                  <div className="p-6 rounded-xl bg-black/50 border border-purple-500/20 backdrop-blur-sm hover:bg-black/70 transition-all duration-300">
                    <h3 className="text-xl font-bold text-purple-400 mb-4">Achievements & Certifications</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <span className="mr-2 text-purple-400">▹</span>
                        <div>
                          <p className="text-white">Scored 98.05 percentile in Naukri Campus Young Turks</p>
                          <p className="text-gray-400 text-sm">Certificate ID: 67080ef5e3b9a668e00065ed</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 text-purple-400">▹</span>
                        <div>
                          <p className="text-white">Member of Recurse Club at KMIT (Coding Club)</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 text-purple-400">▹</span>
                        <div>
                          <p className="text-white">2 star Coder on CodeChef</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 text-purple-400">▹</span>
                        <div>
                          <p className="text-white">Solved over 400 DSA questions on LeetCode and CodeChef</p>
                        </div>
                      </li>
                    </ul>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" ref={contactRef} className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              className="max-w-4xl mx-auto"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <motion.h2
                className="text-3xl font-bold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 drop-shadow-[0_1.2px_1.2px_rgba(180,100,255,0.8)]"
                variants={fadeInUp}
              >
                Get In Touch
              </motion.h2>

              <motion.div className="grid md:grid-cols-2 gap-8" variants={staggerContainer}>
                <motion.div variants={fadeInUp}>
                  <h3 className="text-xl font-semibold mb-6 text-blue-400">Contact Information</h3>
                  <div className="space-y-4">
                    <motion.div className="flex items-center group" whileHover={{ x: 5 }}>
                      <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center mr-4 group-hover:bg-blue-500/40 transition-colors">
                        <Mail className="h-5 w-5 text-blue-400" />
                      </div>
                      <a
                        href="mailto:yashmanthmanthri19@gmail.com"
                        className="text-white hover:text-blue-400 transition-colors font-medium"
                      >
                        yashmanthmanthri19@gmail.com
                      </a>
                    </motion.div>
                    <motion.div className="flex items-center group" whileHover={{ x: 5 }}>
                      <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center mr-4 group-hover:bg-blue-500/40 transition-colors">
                        <Phone className="h-5 w-5 text-blue-400" />
                      </div>
                      <a
                        href="tel:+918074494363"
                        className="text-white hover:text-blue-400 transition-colors font-medium"
                      >
                        +91 807 449 4363
                      </a>
                    </motion.div>
                    <motion.div className="flex items-center group" whileHover={{ x: 5 }}>
                      <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center mr-4 group-hover:bg-blue-500/40 transition-colors">
                        <MapPin className="h-5 w-5 text-blue-400" />
                      </div>
                      <span className="text-white font-medium">Hyderabad, India</span>
                    </motion.div>
                  </div>

                  <h3 className="text-xl font-semibold mt-12 mb-6 text-blue-400">Connect With Me</h3>
                  <div className="flex space-x-4">
                    <motion.a
                      href="https://www.linkedin.com/in/mantri-yeshwanth"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-blue-400 p-0.5 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/70 transition-all enhanced-glow"
                      whileHover={{ y: -5, scale: 1.1 }}
                      onMouseEnter={enterButton}
                      onMouseLeave={leaveButton}
                    >
                      <div className="w-full h-full rounded-full bg-black/80 flex items-center justify-center">
                        <Linkedin className="h-5 w-5 text-blue-400" />
                      </div>
                    </motion.a>
                    <motion.a
                      href="https://github.com/MantriYeshwanth"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-purple-400 p-0.5 shadow-lg shadow-purple-500/30 hover:shadow-purple-500/70 transition-all enhanced-glow"
                      whileHover={{ y: -5, scale: 1.1 }}
                      onMouseEnter={enterButton}
                      onMouseLeave={leaveButton}
                    >
                      <div className="w-full h-full rounded-full bg-black/80 flex items-center justify-center">
                        <Github className="h-5 w-5 text-purple-400" />
                      </div>
                    </motion.a>
                    <motion.a
                      href="https://leetcode.com/YeshwanthMantri"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-yellow-400 p-0.5 shadow-lg shadow-orange-500/30 hover:shadow-orange-500/70 transition-all enhanced-glow"
                      whileHover={{ y: -5, scale: 1.1 }}
                      onMouseEnter={enterButton}
                      onMouseLeave={leaveButton}
                    >
                      <div className="w-full h-full rounded-full bg-black/80 flex items-center justify-center">
                        <Terminal className="h-5 w-5 text-orange-400" />
                      </div>
                    </motion.a>
                    <motion.a
                      href="https://www.instagram.com/yeah__shh/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-600 to-purple-400 p-0.5 shadow-lg shadow-pink-500/30 hover:shadow-pink-500/70 transition-all enhanced-glow"
                      whileHover={{ y: -5, scale: 1.1 }}
                      onMouseEnter={enterButton}
                      onMouseLeave={leaveButton}
                    >
                      <div className="w-full h-full rounded-full bg-black/80 flex items-center justify-center">
                        <Instagram className="h-5 w-5 text-pink-400" />
                      </div>
                    </motion.a>
                  </div>
                </motion.div>

                <motion.div
                  className="p-6 rounded-xl bg-black/50 border border-purple-500/20 backdrop-blur-sm"
                  variants={fadeInUp}
                >
                  <h3 className="text-xl font-semibold mb-6 text-blue-400">Send Me a Message</h3>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-1 text-white">
                        Name
                      </label>
                      <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your name"
                        required
                        className="bg-black/30 border-purple-500/30 text-white placeholder:text-gray-500 focus:border-blue-500 rounded-lg"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-1 text-white">
                        Email
                      </label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Your email"
                        required
                        className="bg-black/30 border-purple-500/30 text-white placeholder:text-gray-500 focus:border-blue-500 rounded-lg"
                      />
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium mb-1 text-white">
                        Message
                      </label>
                      <Textarea
                        id="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Your message"
                        rows={4}
                        required
                        className="bg-black/30 border-purple-500/30 text-white placeholder:text-gray-500 focus:border-blue-500 rounded-lg"
                      />
                    </div>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onMouseEnter={enterButton}
                      onMouseLeave={leaveButton}
                    >
                      <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-full"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <span className="flex items-center">
                            <svg
                              className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            Sending...
                          </span>
                        ) : (
                          <span className="flex items-center text-white font-medium">
                            <Send className="mr-2 h-4 w-4" />
                            Send Message
                          </span>
                        )}
                      </Button>
                    </motion.div>
                  </form>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-6 border-t border-purple-500/20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <motion.p
              className="text-sm text-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              © {new Date().getFullYear()} Yeshwanth Mantri. All rights reserved.
            </motion.p>
            <motion.div
              className="flex space-x-6 mt-4 md:mt-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <a
                href="https://www.linkedin.com/in/mantri-yeshwanth-167623287"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-blue-400 transition-colors"
              >
                LinkedIn
              </a>
              <a
                href="https://github.com/MantriYeshwanth"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-blue-400 transition-colors"
              >
                GitHub
              </a>
              <a
                href="https://leetcode.com/YeshwanthMantri"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-blue-400 transition-colors"
              >
                LeetCode
              </a>
              <a
                href="https://www.instagram.com/yeah__shh/"
                className="text-white hover:text-blue-400 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram
              </a>
            </motion.div>
          </div>
        </div>
      </footer>
    </div>
  )
}

