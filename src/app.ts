//Import the OpenAPI Large Language Model (you can import other models here eg. Cohere)
import { OpenAI } from "langchain/llms";
import { initializeAgentExecutor } from "langchain/agents";
import { SerpAPI, Calculator } from "langchain/tools";

//Load environment variables (populate process.env from .env file)
import * as dotenv from "dotenv";
dotenv.config();

export const run = async () => {

    //Instantiante the OpenAI model 
    //Pass the "temperature" parameter which controls the RANDOMNESS of the model's output. A lower temperature will result in more predictable output, while a higher temperature will result in more random output. The temperature parameter is set between 0 and 1, with 0 being the most predictable and 1 being the most random
    const model = new OpenAI({ temperature: 0.9 });

    const template = "What would be a good company name a company that makes {product}?";

    const tools = [new SerpAPI(), new Calculator()];

    const executor = await initializeAgentExecutor(tools, model, "zero-shot-react-description");
    console.log("Loaded agent executor.");

    const input =
        "Who is Beyonce's husband?" +
        " What is his current age raised to the 0.23 power?";
    console.log(`Executing with input "${input}"...`);

    //Calls out to the model's (OpenAI's) endpoint passing the prompt. This call returns a string
    const result = await executor.call({ input });
    console.log(`Got output ${result.output}`);
};

run();
