import openai
import os
import json

with open("D:\\Discord_Bot\\json\\word.json",'rb') as f:
    temp=json.load(fp=f)
    setting="".join(temp["openai"]["system"])
openai.api_key=os.getenv("OPENAI_API_KEY")
completion = openai.ChatCompletion.create(
    model="gpt-3.5-turbo",
    messages=[{"role": "system", "content": setting},
              {"role": "user", "content": "寫一個hello world程式"}
              ]
)
print(completion["choices"][0]["message"]["content"])