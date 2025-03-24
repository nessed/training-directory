import { pgTable, serial, text, varchar, timestamp, integer } from 'drizzle-orm/pg-core';

export const trainers = pgTable('trainers', {
  id: serial('id').primaryKey(),
  firstName: text('first_name').notNull(),
  lastName: text('last_name').notNull(),
  gender: text('gender').notNull(),
  title: text('title'), // optional
  professionalProfile: text('professional_profile').notNull(),
  linkedinUrl: text('linkedin_url'), // swapped to text for safety
  email: text('email'),
  phone: text('phone'),
  city: text('city'),
  image: text('image'),
  createdAt: timestamp('created_at').defaultNow(),
});

export const education = pgTable('education', {
  id: serial('id').primaryKey(),
  trainerId: integer('trainer_id').references(() => trainers.id, { onDelete: 'cascade' }),
  degreeType: text('degree_type'),
  institution: text('institution'),
  fieldOfStudy: text('field_of_study'),
  country: text('country'),
});

export const workExperience = pgTable('work_experience', {
  id: serial('id').primaryKey(),
  trainerId: integer('trainer_id').references(() => trainers.id, { onDelete: 'cascade' }),
  position: text('position'),
  organization: text('organization'),
  dateStart: text('date_start'),
  dateEnd: text('date_end'),
  yearsOfExperience: text('years_of_experience'),
});

export const trainingExpertise = pgTable('training_expertise', {
  id: serial('id').primaryKey(),
  trainerId: integer('trainer_id').references(() => trainers.id, { onDelete: 'cascade' }),
  name: text('name'),
  otherInformation: text('other_information'),
});

export const trainingMethods = pgTable('training_methods', {
  id: serial('id').primaryKey(),
  trainerId: integer('trainer_id').references(() => trainers.id, { onDelete: 'cascade' }),
  name: text('name'),
  otherInformation: text('other_information'),
});
