# zorp

[![JavaScript Style Guide](https://cdn.rawgit.com/standard/standard/master/badge.svg)](https://github.com/standard/standard)

## What is this?

__zorp__ is a program that grades the health of a set of folders 1 - ∞ based on rules you provide. It is highly opinionated as to what the basic path to your projects are and where your metadata / `.tags` files is. As far as what rules constitute health within those folder it is entirely indifferent. In __zorp__ you must adhere to the following structure: 

`topic/sub-topic/<your-project>` 

If you want __zorp__ to track your project's health you must also supply a `.tags` file inside of `<your-project>`.

The `.tags` file may contain anything you want it to. By adding data to this file you allow the report creator to gauge the health and maturity of your project. When your folders are adhering to the rules you define you are able to quickly find everything on your system.

## Why make this?

I use my computer quite a bit. As such I create a lot of data in the form of files and folders. I found that keeping things organized was a bit tedious and that even if I got a burst of energy to create some system of organization it quickly decayed as I couldn't remember the complicated system that I had created. I would organize meal plans one way, coding projects written in java another way, school loans, health records, and tax info another way still. I have probably made 3 or 4 different methods of organizing things and even written down how to use the system, but nevertheless as time went on I would let the system decay. So in an effort to keep organization a first class citizen on my computer I have decided to automate that system. Hopefully by having a constant reminder and a goal I can work my way up to having a consistent and clean feel to my computer.  

!["so-its-together"](resources/together.gif)

## How can I use this?

I regret to inform you that as of right now, you can't. It's not very flexible. You are, of course, welcome to play around with the source and make it yours, but it is not intended for widespread consumption yet.

## How do I make this?

`git clone <this-repo>`

`npm install`