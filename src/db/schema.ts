import { pgTable, serial, text, varchar, timestamp } from 'drizzle-orm/pg-core';

export const trainers = pgTable('trainers', {
  id: serial('id').primaryKey(),
  firstName: text('first_name').notNull(),
  lastName: text('last_name').notNull(),
  gender: text('gender').notNull(),
  title: text('title').notNull(),
  professionalProfile: text('professional_profile').notNull(),
  linkedinUrl: varchar('linkedin_url', { length: 255 }),
  email: varchar('email', { length: 255 }),
  phone: varchar('phone', { length: 20 }),
  city: text('city'),
  education: text('education'),
  certifications: text('certifications'),
  workExperience: text('work_experience'),
  trainingExpertise: text('training_expertise'),
  trainingMethods: text('training_methods'),
  createdAt: timestamp('created_at').defaultNow(),
});
