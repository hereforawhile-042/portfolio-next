"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Save, Upload } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function NewProjectPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    description: "",
    technologies: "",
    imageUrl: "",
    liveUrl: "",
    githubUrl: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }
    const file = e.target.files[0];
    setUploadingImage(true);

    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `projects/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("portfolio")
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      const {
        data: { publicUrl },
      } = supabase.storage.from("portfolio").getPublicUrl(filePath);

      setFormData((prev) => ({ ...prev, imageUrl: publicUrl }));
    } catch (error) {
      console.error("Error uploading image:", error);
      alert(
        'Error uploading image. Make sure the "portfolio" bucket exists and is public.'
      );
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const technologiesArray = formData.technologies
      .split(",")
      .map((tech) => tech.trim())
      .filter((tech) => tech !== "");

    const { error } = await supabase.from("projects").insert([
      {
        title: formData.title,
        slug: formData.slug,
        description: formData.description,
        technologies: technologiesArray,
        imageUrl: formData.imageUrl,
        liveUrl: formData.liveUrl,
        githubUrl: formData.githubUrl,
        featured: false,
      },
    ]);

    if (error) {
      console.error("Error creating project:", error);
      alert("Failed to create project: " + error.message);
      setLoading(false);
    } else {
      router.push("/admin");
    }
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/admin">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">New Project</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Project Details</CardTitle>
          <CardDescription>
            Add a new project to your portfolio.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="title" className="text-sm font-medium">
                Title
              </label>
              <Input
                id="title"
                name="title"
                placeholder="Project Title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="slug" className="text-sm font-medium">
                Slug
              </label>
              <Input
                id="slug"
                name="slug"
                placeholder="project-slug"
                value={formData.slug}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-medium">
                Description
              </label>
              <Textarea
                id="description"
                name="description"
                placeholder="Project description..."
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="technologies" className="text-sm font-medium">
                Technologies (comma separated)
              </label>
              <Input
                id="technologies"
                name="technologies"
                placeholder="React, Next.js, Tailwind"
                value={formData.technologies}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Project Image</label>
              <div className="flex items-center gap-4">
                <Button
                  type="button"
                  variant="outline"
                  disabled={uploadingImage}
                  className="relative cursor-pointer w-full"
                >
                  {uploadingImage ? (
                    "Uploading..."
                  ) : (
                    <>
                      <Upload className="mr-2 h-4 w-4" /> Upload Image
                      <input
                        type="file"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        onChange={handleImageUpload}
                        accept="image/*"
                      />
                    </>
                  )}
                </Button>
              </div>
              {formData.imageUrl && (
                <div className="mt-2 relative aspect-video w-full overflow-hidden rounded-lg border">
                  <img
                    src={formData.imageUrl}
                    alt="Preview"
                    className="object-cover w-full h-full"
                  />
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="liveUrl" className="text-sm font-medium">
                  Live Demo URL
                </label>
                <Input
                  id="liveUrl"
                  name="liveUrl"
                  placeholder="https://..."
                  value={formData.liveUrl}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="githubUrl" className="text-sm font-medium">
                  GitHub URL
                </label>
                <Input
                  id="githubUrl"
                  name="githubUrl"
                  placeholder="https://github.com/..."
                  value={formData.githubUrl}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="pt-4">
              <Button
                type="submit"
                className="w-full"
                disabled={loading || uploadingImage}
              >
                <Save className="mr-2 h-4 w-4" />{" "}
                {loading ? "Saving..." : "Save Project"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
