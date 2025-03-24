CREATE TABLE "education" (
	"id" serial PRIMARY KEY NOT NULL,
	"trainer_id" integer,
	"degree_type" varchar(100),
	"institution" varchar(200),
	"field_of_study" varchar(100),
	"country" varchar(100)
);
--> statement-breakpoint
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
	"image" text,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "training_expertise" (
	"id" serial PRIMARY KEY NOT NULL,
	"trainer_id" integer,
	"name" varchar(150),
	"other_information" text
);
--> statement-breakpoint
CREATE TABLE "training_methods" (
	"id" serial PRIMARY KEY NOT NULL,
	"trainer_id" integer,
	"name" varchar(150),
	"other_information" text
);
--> statement-breakpoint
CREATE TABLE "work_experience" (
	"id" serial PRIMARY KEY NOT NULL,
	"trainer_id" integer,
	"position" varchar(150),
	"organization" varchar(200),
	"date_start" varchar(50),
	"date_end" varchar(50),
	"years_of_experience" varchar(10)
);
--> statement-breakpoint
ALTER TABLE "education" ADD CONSTRAINT "education_trainer_id_trainers_id_fk" FOREIGN KEY ("trainer_id") REFERENCES "public"."trainers"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "training_expertise" ADD CONSTRAINT "training_expertise_trainer_id_trainers_id_fk" FOREIGN KEY ("trainer_id") REFERENCES "public"."trainers"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "training_methods" ADD CONSTRAINT "training_methods_trainer_id_trainers_id_fk" FOREIGN KEY ("trainer_id") REFERENCES "public"."trainers"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "work_experience" ADD CONSTRAINT "work_experience_trainer_id_trainers_id_fk" FOREIGN KEY ("trainer_id") REFERENCES "public"."trainers"("id") ON DELETE cascade ON UPDATE no action;