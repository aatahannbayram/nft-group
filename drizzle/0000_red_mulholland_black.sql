CREATE TYPE "public"."inquiry_status" AS ENUM('new', 'contacted', 'in_progress', 'closed', 'archived');--> statement-breakpoint
CREATE TYPE "public"."project_type" AS ENUM('tersane_gemi_insa', 'tersane_tamir', 'altyapi_ve_celik_insa', 'insaat_sektoru');--> statement-breakpoint
CREATE TABLE "gallery_items" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"category" "project_type" NOT NULL,
	"image_path" text,
	"video_path" text,
	"display_order" integer DEFAULT 0 NOT NULL,
	"published" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "image_or_video" CHECK ("gallery_items"."image_path" is not null or "gallery_items"."video_path" is not null)
);
--> statement-breakpoint
CREATE TABLE "project_inquiries" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"company" text,
	"phone" text NOT NULL,
	"email" text NOT NULL,
	"project_type" "project_type" NOT NULL,
	"budget_range" text,
	"message" text NOT NULL,
	"status" "inquiry_status" DEFAULT 'new' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "site_settings" (
	"key" text PRIMARY KEY NOT NULL,
	"value" text NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
