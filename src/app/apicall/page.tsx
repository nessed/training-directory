import { createClient } from "../../../utils/supabase/server";
import Image from "next/image";

export default async function TrainersDebug() {
  const supabase = await createClient(); // ✅ no destructure

  const { data: trainers, error } = await supabase
    .from("trainers")
    .select("id, first_name, last_name, city, title, image");

  if (error) return <p>{error.message}</p>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-2">Trainers (Debug Table)</h1>
      <table className="border border-gray-300 text-sm w-full">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-3 py-1">ID</th>
            <th className="border px-3 py-1">Image</th>
            <th className="border px-3 py-1">Name</th>
            <th className="border px-3 py-1">City</th>
            <th className="border px-3 py-1">Title</th>
          </tr>
        </thead>
        <tbody>
          {trainers?.map((t) => (
            <tr key={t.id}>
              <td className="border px-3 py-1">{t.id}</td>
              <td className="border px-3 py-1">
                <Image
                  src={t.image} // fallback if image is missing
                  alt="hello"
                  width={50}
                  height={50}
                  className="rounded-md object-cover"
                />
              </td>

              <td className="border px-3 py-1">
                {t.first_name} {t.last_name}
              </td>
              <td className="border px-3 py-1">{t.city}</td>
              <td className="border px-3 py-1">{t.title}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
