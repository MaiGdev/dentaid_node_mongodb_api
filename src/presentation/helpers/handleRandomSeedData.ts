import { seedData } from "../../data/seed/data";

export const getRandomItems = <T>(array: T[], maxItems: number): T[] => {
  const count = Math.floor(Math.random() * maxItems) + 1;
  const shuffled = array.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

export const getRandomMedicalConditions = () => {
  return getRandomItems(seedData.dentalMedicalConditions, 3).map(
    (item) => item.value
  );
};

export const getRandomAllergies = () => {
  return getRandomItems(seedData.knownAllergiesOptions, 5).map(
    (item) => item.value
  );
};

export const HandleRandomSeedData = {
  getRandomItems,
  getRandomMedicalConditions,
  getRandomAllergies,
};
