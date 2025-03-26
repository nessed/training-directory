ALTER TABLE "education" ALTER COLUMN "degree_type" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "education" ALTER COLUMN "institution" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "education" ALTER COLUMN "field_of_study" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "education" ALTER COLUMN "country" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "trainers" ALTER COLUMN "title" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "trainers" ALTER COLUMN "linkedin_url" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "trainers" ALTER COLUMN "email" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "trainers" ALTER COLUMN "phone" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "training_expertise" ALTER COLUMN "name" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "training_methods" ALTER COLUMN "name" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "work_experience" ALTER COLUMN "position" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "work_experience" ALTER COLUMN "organization" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "work_experience" ALTER COLUMN "date_start" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "work_experience" ALTER COLUMN "date_end" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "work_experience" ALTER COLUMN "years_of_experience" SET DATA TYPE text;