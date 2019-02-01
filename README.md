# ConUHacks-2019
Fridge IoT: Food image recognition proving recipes for earliest ingredients about to expire.

## Inspiration
Canada's food problem is among the worst in the world."The average Canadian consumer throws out an estimated 170 kilograms of food a year," according to CBC Canada. (https://www.cbc.ca/radio/thecurrent/the-current-for-april-5-2018-1.4605392/how-bad-is-canada-s-food-waste-problem-among-the-world-s-worst-report-finds-1.4606012) (https://globalnews.ca/news/4857582/canada-food-waste-study-2019/). We wanted to leverage IOT technologies and Machine Vision to assist Canadians reduce.

## What it does
The goal is to help the user choose recipes that will use the food items that will be expire first.
A IOT connected camera analyzes the contents of a refrigerator using Machine Vision. This information is saved for the user, and we can display the contents of the refrigerator with their calculated expiry dates. We then recommend recipes that use the items that are going to expire first. 

## How we built it
Our IOT connected camera, in this case a web connected webcam, analyzes the contents with the use of pre-trained TensorFlow models. This information is sent to the backend Node server, which stores the information of the contents in the MySQL database along with the date of entry into the database (entry into the refrigerator). 

The frontend React server then gets the list of items, along with their calculated expiry dates from a dataset in the backend. The frontend makes REST API calls to obtain recipes, and the backend fetches recipes using the items that are most close to expiring through the Edaman API.

## Challenges we ran into
Everything. The TensorFlow is slow. The models weren't trained properly. Dependency hell. One computer couldn't run it fast enough. Storing the elements required taking into account what was already there. Callback hell. Async hell. Pls help us.

## Accomplishments that we're proud of
It works (kinda?). Its connected together. So that's something.

## What we learned
We learned how to use these technologies. How to use TensorFlow. How to use MySQL. How to use Python.

## What's next for Virtual Fridge
OCR Expiry Dates, using machine vision to detect the expiry dates on food stickes. Tracking of quantities better. Better recipe recommendation. Better machine vision. 
