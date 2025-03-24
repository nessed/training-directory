import { db } from "./index";
import { trainers, education, workExperience, trainingExpertise, trainingMethods } from "./schema"; // Tables
import { trainers as trainersData } from "@/app/data/trainers";

async function insertTrainers() {
  console.log("🔎 DATABASE_URL:", process.env.DATABASE_URL);

    for (const trainer of trainersData) {
      // 1️⃣ Insert Trainer
      const insertedTrainer = await db
        .insert(trainers)
        .values({
          firstName: trainer.firstName,
          lastName: trainer.lastName,
          gender: trainer.gender,
          title: trainer.title,
          professionalProfile: trainer.professionalProfile,
          linkedinUrl: trainer.linkedinUrl || undefined, // Convert null to undefined
          email: trainer.email || undefined,
          phone: trainer.phone || undefined,
          city: trainer.city || undefined,
          image: trainer.image || undefined,
        })
        .returning({ id: trainers.id }) // Ensure this works
        .execute(); // ✅ Ensure execution
  
      const trainerId = insertedTrainer[0]?.id;
      if (!trainerId) {
        console.error("❌ Failed to insert trainer", trainer);
        continue;
      }
  
      // 2️⃣ Insert Education
      if (trainer.education?.length) {
        await db.insert(education).values(
          trainer.education.map((edu) => ({
            trainerId,
            degreeType: edu.degreeType || undefined,
            institution: edu.institution || undefined,
            fieldOfStudy: edu.fieldOfStudy || undefined,
            country: edu.country || undefined,
          }))
        ).execute();
      }
  
      // 3️⃣ Insert Work Experience
      if (trainer.workExperience?.length) {
        await db.insert(workExperience).values(
          trainer.workExperience.map((work) => ({
            trainerId,
            position: work.position || undefined,
            organization: work.organization || undefined,
            yearsOfExperience: work.yearsOfExperience || undefined,
          }))
        ).execute();
      }
  
      // 4️⃣ Insert Training Expertise
      if (trainer.trainingExpertise?.length) {
        await db.insert(trainingExpertise).values(
          trainer.trainingExpertise.map((expertise) => ({
            trainerId,
            name: expertise.name || undefined,
          }))
        ).execute();
      }
  
      // 5️⃣ Insert Training Methods
      if (trainer.trainingMethods?.length) {
        await db.insert(trainingMethods).values(
          trainer.trainingMethods.map((method) => ({
            trainerId,
            name: method.name || undefined,
          }))
        ).execute();
      }
  
      console.log(`✅ Trainer ${trainer.firstName} inserted successfully!`);
    }
  }
  
  // Run script
  insertTrainers()
    .then(() => {
      console.log("✅ All trainers inserted successfully!");
      process.exit();
    })
    .catch((err) => {
      console.error("❌ Error inserting trainers:", err);
      process.exit(1);
    });