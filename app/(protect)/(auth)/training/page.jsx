import { getTrainings } from "@services/training";

export const revalidate = 3600;

export default async () => {
  const trainings = await getTrainings();

  return (
    <main>
      <h1>Find your favorite activity</h1>
      <ul id="training-sessions">
        {trainings.map((training) => (
          <li key={training._id}>
            <img src={training.imageUrl} alt={training.title} />
            <div>
              <h2>{training.title}</h2>
              <p>{training.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
};
