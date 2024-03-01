import instance from "./instance";

export const getAllCharacters = async (searchTerm: string | undefined) => {
  try {
    const response = await instance.get("/character/?name=" + searchTerm);
    const { info, results } = response.data;
    return { info, results };
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};
