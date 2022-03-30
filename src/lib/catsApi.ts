const SECRET = "dd3f9da6-c598-4aaf-a49e-f03788da89d7";
import axios from "axios";

export interface CatImage {
  breeds: any[];
  id: string;
  url: string;
  width: number;
  height: number;
}

export type CommonOptions = {
  limit?: number;
  order?: "Asc" | "Desc";
};
export class CatsApi {
  cats: CatImage[] = [];

  async list(options?: CommonOptions, force = false): Promise<CatImage[]> {
    let opt = options ?? {};
    opt = Object.assign({ limit: 20, order: "Desc" } as CommonOptions, opt);
    if (this.cats.length > 0 && !force) {
      return this.cats;
    }
    const result = await (
      await this.base.get("/images/search", { params: opt })
    ).data;
    this.cats = result;
    return result;
  }

  deleteACat(id: string) {
    this.cats = this.cats.filter((c) => c.id !== id);
    return this.cats;
  }

  get base() {
    return axios.create({
      baseURL: "https://api.thecatapi.com/v1",
      headers: {
        "x-pi-key": SECRET,
      },
    });
  }
}

const catsApi = new CatsApi();

export default catsApi;
