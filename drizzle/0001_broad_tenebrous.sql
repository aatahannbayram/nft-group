CREATE TABLE "news_articles" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" text NOT NULL,
	"image" text NOT NULL,
	"category" "project_type" NOT NULL,
	"published_at" timestamp with time zone DEFAULT now() NOT NULL,
	"featured" boolean DEFAULT false NOT NULL,
	"published" boolean DEFAULT true NOT NULL,
	"title_tr" text NOT NULL,
	"title_en" text NOT NULL,
	"excerpt_tr" text NOT NULL,
	"excerpt_en" text NOT NULL,
	"body_tr" text[] NOT NULL,
	"body_en" text[] NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "news_articles_slug_unique" UNIQUE("slug")
);
