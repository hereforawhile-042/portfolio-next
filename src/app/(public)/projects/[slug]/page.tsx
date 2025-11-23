import { getProjectBySlug } from "@/lib/api";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, Github, Globe } from "lucide-react";
import { Metadata } from "next";

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) {
    return {
      title: "Project Not Found",
    };
  }
  return {
    title: `${project.title} | Jeremiah Egemonye`,
    description: project.description,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const project = await getProjectBySlug(decodedSlug);

  if (!project) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 md:px-8 pt-32 pb-12">
      <Button asChild variant="ghost" className="mb-8">
        <Link href="/projects">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Projects
        </Link>
      </Button>

      <div className="grid gap-12 lg:grid-cols-2">
        <div className="space-y-8">
          <div>
            <h1 className="text-4xl font-bold tracking-tight mb-4">
              {project.title}
            </h1>
            <div className="flex flex-wrap gap-2 mb-6">
              {project.technologies?.map((tech) => (
                <span
                  key={tech}
                  className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80"
                >
                  {tech}
                </span>
              ))}
            </div>
            <p className="text-lg text-muted-foreground leading-relaxed whitespace-pre-wrap">
              {project.description}
            </p>
          </div>

          <div className="flex gap-4">
            {project.liveUrl && (
              <Button asChild size="lg">
                <Link href={project.liveUrl} target="_blank">
                  <Globe className="mr-2 h-4 w-4" /> Live Demo
                </Link>
              </Button>
            )}
            {project.githubUrl && (
              <Button asChild variant="outline" size="lg">
                <Link href={project.githubUrl} target="_blank">
                  <Github className="mr-2 h-4 w-4" /> View Code
                </Link>
              </Button>
            )}
          </div>
        </div>

        <div className="relative aspect-video w-full overflow-hidden rounded-lg border bg-muted shadow-lg">
          {project.imageUrl ? (
            <img
              src={project.imageUrl}
              alt={project.title}
              className="object-cover w-full h-full"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10 flex items-center justify-center text-muted-foreground/30 font-bold text-2xl">
              Project Screenshot
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
