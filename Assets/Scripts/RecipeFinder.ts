import { createClient } from "@supabase/supabase-js";
import axios from "axios";
import * as cheerio from "cheerio";
import { json } from "stream/consumers";
import { OPEN_AI_KEY, SUPABASE_KEY, SUPABASE_URL } from "./env";
// import OpenAI from 'openai';
// import OpenAI from "openai";

const SUPABASE_U = SUPABASE_URL;
const SUPABASE_K = SUPABASE_KEY;

// const openai = new OpenAI();
const OPEN_AI = OPEN_AI_KEY;

const supabase = createClient(SUPABASE_U, SUPABASE_K);

function removeTextAfterComment(text: string): string {
  const index = text.toLowerCase().indexOf("comment");
  return index === -1 ? text : text.slice(0, index).trim();
}

async function promptOpenAI(
  sys_prompt: string,
  user_prompt: string
): Promise<object> {
  let response: object = await axios.post(
    "https://api.openai.com/v1/chat/completions",
    {
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: sys_prompt,
        },
        {
          role: "user",
          content: user_prompt,
        },
      ],
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPEN_AI}`,
      },
    }
  );
  let json_response: object = {};
  let errorMessage: string;

  try {
    json_response = JSON.parse(
      response["data"]["choices"][0]["message"]["content"]
    );
  } catch (e) {
    errorMessage = e.Message;
    print(errorMessage);
    response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "You will read some faulty json and a error message and return valid json.",
          },
          {
            role: "user",
            content: `Error Message: ${errorMessage}\nJSON: ${response["data"]["choices"][0]["message"]["content"]}`,
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPEN_AI}`,
        },
      }
    );
    json_response = JSON.parse(
      response["data"]["choices"][0]["message"]["content"]
    );
  }
  return json_response;
}

export async function getRecipe(item: string): Promise<string> {
  let proto_prompt: object = await supabase
    .from("prompts")
    .select("prompt")
    .eq("prompt_type", "recipe")
    .single();
  // console.log(proto_prompt);
  proto_prompt = proto_prompt["data"]["prompt"];
  const input = {
    recipe: item,
  };
  let prompt: string = proto_prompt["context"] + "\n";
  for (const obj of proto_prompt["messages"]) {
    prompt += obj["text"] + input[obj["content"]];
  }
  // prompt += '\n' + proto_prompt['return'];

  // const recipe_sites = await axios.get(`https://www.googleapis.com/customsearch/v1?key=${GOOGLE_API_KEY}&cx=52d41ee068c0d4fc3&q=how to make ${item}`);
  // const recipe_url = recipe_sites.data.items[0].link;
  const recipe_url =
    "https://www.loveandlemons.com/how-to-make-hard-boiled-eggs/";
  print(recipe_url);
  const recipe_info = await axios.get(recipe_url);
  const selector = cheerio.load(recipe_info.data);
  let pageText: string = selector("p")
    .map(function () {
      return selector(this).text().trim(); // Get and trim the text from each <p>
    })
    .get() // Convert to an array of strings
    .join("\n");

  pageText = removeTextAfterComment(pageText);

  const json_response = await promptOpenAI(proto_prompt["return"], prompt);

  return JSON.stringify(json_response);
}
