import { IPlugin, IPluginInfo } from "../interfaces";
import * as Hapi from "hapi";

const register = async (server: Hapi.Server): Promise<void> => {
  try {
    return server.register([
      require("inert"),
      require("vision"),
      {
        plugin: require("hapi-swagger"),
        options: {
          info: {
            title: "Blank Api",
            description: "Temp Api Documentation",
            version: "1.0"
          },
          tags: [
            {
              name: "temp",
              description: "Api temp interface."
            },
            {
              name: "user",
              description: "Api user interface."
            }
          ],
          swaggerUI: true,
          documentationPage: true,
          documentationPath: "/docs"
        }
      }
    ]);
  } catch (err) {
    console.log(`Error registering swagger plugin: ${err}`);
  }
};

export default (): IPlugin => {
  return {
    register,
    info: () => {
      return { name: "Swagger Documentation", version: "1.0.0" };
    }
  };
};