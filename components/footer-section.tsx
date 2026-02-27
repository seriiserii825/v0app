"use client"

import { useRef, useState, useTransition } from "react"
import dynamic from "next/dynamic"
import Link from "next/link"

const LeafletMap = dynamic(
  () => import("@/components/leaflet-map").then((m) => m.LeafletMap),
  { ssr: false, loading: () => <div className="size-full rounded-lg bg-card/5" /> }
)
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  Facebook,
  Instagram,
  Paperclip,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { sendContactEmail } from "@/app/actions/send-email"

const ACCEPTED = ".csv,.docx,.pdf"
const MAX_MB = 10

export function FooterSection() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })
  const [file, setFile] = useState<File | null>(null)
  const [fileError, setFileError] = useState("")
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle")
  const [errorMsg, setErrorMsg] = useState("")
  const [isPending, startTransition] = useTransition()
  const fileRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const picked = e.target.files?.[0] ?? null
    setFileError("")
    if (!picked) return setFile(null)

    if (picked.size > MAX_MB * 1024 * 1024) {
      setFileError(`File must be under ${MAX_MB} MB.`)
      e.target.value = ""
      return setFile(null)
    }
    setFile(picked)
  }

  const removeFile = () => {
    setFile(null)
    setFileError("")
    if (fileRef.current) fileRef.current.value = ""
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const data = new FormData()
    data.append("name", formState.name)
    data.append("email", formState.email)
    data.append("phone", formState.phone)
    data.append("message", formState.message)
    if (file) data.append("file", file)

    startTransition(async () => {
      const result = await sendContactEmail(data)
      if (result.success) {
        setStatus("success")
        setFormState({ name: "", email: "", phone: "", message: "" })
        removeFile()
        setTimeout(() => setStatus("idle"), 5000)
      } else {
        setStatus("error")
        setErrorMsg(result.error ?? "Something went wrong.")
        setTimeout(() => setStatus("idle"), 5000)
      }
    })
  }

  return (
    <footer id="contact" className="bg-foreground text-card">
      <div className="mx-auto max-w-7xl px-6 py-24 lg:py-32">
        <div className="text-center">
          <p className="text-sm tracking-[0.3em] uppercase text-accent">
            Get In Touch
          </p>
          <h2 className="mt-3 font-serif text-3xl leading-tight text-card md:text-5xl text-balance">
            {"Let's start your project"}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-card/60">
            Ready to transform your space? Reach out for a free consultation
            and let us help you find the perfect doors for your home.
          </p>
        </div>

        <div className="mt-16 grid gap-12 lg:grid-cols-3">
          {/* Contact Form */}
          <div className="lg:col-span-1">
            <h3 className="font-serif text-xl text-card">Send a Message</h3>
            <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
              <div>
                <Label htmlFor="name" className="text-card/70 text-xs tracking-wide">
                  Full Name
                </Label>
                <Input
                  id="name"
                  type="text"
                  required
                  value={formState.name}
                  onChange={(e) =>
                    setFormState({ ...formState, name: e.target.value })
                  }
                  placeholder="John Smith"
                  className="mt-1 border-card/20 bg-card/5 text-card placeholder:text-card/30 focus-visible:ring-accent"
                />
              </div>
              <div>
                <Label htmlFor="email" className="text-card/70 text-xs tracking-wide">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={formState.email}
                  onChange={(e) =>
                    setFormState({ ...formState, email: e.target.value })
                  }
                  placeholder="john@example.com"
                  className="mt-1 border-card/20 bg-card/5 text-card placeholder:text-card/30 focus-visible:ring-accent"
                />
              </div>
              <div>
                <Label htmlFor="phone" className="text-card/70 text-xs tracking-wide">
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formState.phone}
                  onChange={(e) =>
                    setFormState({ ...formState, phone: e.target.value })
                  }
                  placeholder="(555) 000-0000"
                  className="mt-1 border-card/20 bg-card/5 text-card placeholder:text-card/30 focus-visible:ring-accent"
                />
              </div>
              <div>
                <Label htmlFor="message" className="text-card/70 text-xs tracking-wide">
                  Message
                </Label>
                <Textarea
                  id="message"
                  required
                  rows={4}
                  value={formState.message}
                  onChange={(e) =>
                    setFormState({ ...formState, message: e.target.value })
                  }
                  placeholder="Tell us about your project..."
                  className="mt-1 border-card/20 bg-card/5 text-card placeholder:text-card/30 focus-visible:ring-accent resize-none"
                />
              </div>

              {/* File upload */}
              <div>
                <Label className="text-card/70 text-xs tracking-wide">
                  Attachment <span className="text-card/40">(CSV, DOCX, PDF — max {MAX_MB} MB)</span>
                </Label>
                <input
                  ref={fileRef}
                  id="file"
                  type="file"
                  accept={ACCEPTED}
                  onChange={handleFileChange}
                  className="sr-only"
                />
                {file ? (
                  <div className="mt-1 flex items-center gap-2 rounded-md border border-card/20 bg-card/5 px-3 py-2 text-sm text-card">
                    <Paperclip className="size-4 shrink-0 text-accent" />
                    <span className="min-w-0 flex-1 truncate">{file.name}</span>
                    <button
                      type="button"
                      onClick={removeFile}
                      className="shrink-0 text-card/40 transition-colors hover:text-card"
                      aria-label="Remove file"
                    >
                      <X className="size-4" />
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => fileRef.current?.click()}
                    className="mt-1 flex w-full items-center gap-2 rounded-md border border-dashed border-card/20 bg-card/5 px-3 py-2 text-sm text-card/50 transition-colors hover:border-card/40 hover:text-card/70"
                  >
                    <Paperclip className="size-4" />
                    Choose file…
                  </button>
                )}
                {fileError && (
                  <p className="mt-1 text-xs text-red-400">{fileError}</p>
                )}
              </div>

              {status === "success" && (
                <p className="text-sm text-green-400">
                  Message sent! We'll be in touch soon.
                </p>
              )}
              {status === "error" && (
                <p className="text-sm text-red-400">{errorMsg}</p>
              )}

              <Button
                type="submit"
                disabled={isPending}
                className="mt-2 bg-accent text-accent-foreground hover:bg-accent/90 disabled:opacity-60"
              >
                <Send className="mr-2 size-4" />
                {isPending ? "Sending…" : "Send Message"}
              </Button>
            </form>
          </div>

          {/* OpenStreetMap via Leaflet */}
          <div className="lg:col-span-1">
            <h3 className="font-serif text-xl text-card">Find Us</h3>
            <div className="mt-6 aspect-[4/3] overflow-hidden rounded-lg">
              <LeafletMap />
            </div>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-1">
            <h3 className="font-serif text-xl text-card">Contact Details</h3>
            <div className="mt-6 flex flex-col gap-6">
              <div className="flex gap-4">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
                  <MapPin className="size-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-card">Address</p>
                  <p className="mt-1 text-sm text-card/60">
                    245 Broadway, Suite 300
                    <br />
                    New York, NY 10007
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
                  <Phone className="size-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-card">Phone</p>
                  <a
                    href="tel:+15551234567"
                    className="mt-1 block text-sm text-card/60 transition-colors hover:text-accent"
                  >
                    (555) 123-4567
                  </a>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
                  <Mail className="size-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-card">Email</p>
                  <a
                    href="mailto:hello@portaledoors.com"
                    className="mt-1 block text-sm text-card/60 transition-colors hover:text-accent"
                  >
                    hello@portaledoors.com
                  </a>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
                  <Clock className="size-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-card">Working Hours</p>
                  <p className="mt-1 text-sm text-card/60">
                    Mon - Fri: 9:00 AM - 6:00 PM
                    <br />
                    Sat: 10:00 AM - 4:00 PM
                    <br />
                    Sun: Closed
                  </p>
                </div>
              </div>

              <div className="mt-4">
                <p className="text-sm font-medium text-card">Follow Us</p>
                <div className="mt-3 flex gap-3">
                  <a
                    href="#"
                    aria-label="Facebook"
                    className="flex size-10 items-center justify-center rounded-lg bg-card/10 text-card/60 transition-colors hover:bg-accent hover:text-accent-foreground"
                  >
                    <Facebook className="size-5" />
                  </a>
                  <a
                    href="#"
                    aria-label="Instagram"
                    className="flex size-10 items-center justify-center rounded-lg bg-card/10 text-card/60 transition-colors hover:bg-accent hover:text-accent-foreground"
                  >
                    <Instagram className="size-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-card/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-6 sm:flex-row">
          <p className="text-xs text-card/40">
            &copy; {new Date().getFullYear()} Portale Doors. All rights
            reserved.
          </p>
          <div className="flex gap-6">
            <Link href="#" className="text-xs text-card/40 transition-colors hover:text-card/60">
              Privacy Policy
            </Link>
            <Link href="#" className="text-xs text-card/40 transition-colors hover:text-card/60">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
