CREATE TABLE "trainers" (
	"id" serial PRIMARY KEY NOT NULL,
	"first_name" text NOT NULL,
	"last_name" text NOT NULL,
	"gender" text NOT NULL,
	"title" text NOT NULL,
	"professional_profile" text NOT NULL,
	"linkedin_url" varchar(255),
	"email" varchar(255),
	"phone" varchar(20),
	"city" text,
	"education" text,
	"certifications" text,
	"work_experience" text,
	"training_expertise" text,
	"training_methods" text,
	"created_at" timestamp DEFAULT now()
);
