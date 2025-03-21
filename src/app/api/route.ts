import { insertTrainers } from "../data/trainers";

export async function POST(request: Request) {
  try {
    await insertTrainers();
    return new Response('Trainers inserted successfully!', { status: 200 });
  } catch (error) {
    return new Response('Failed to insert trainers', { status: 500 });
  }
}
