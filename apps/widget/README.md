# Mouseback


Welcome to Mouseback! Mouseback is a user feedback tool for software teams. Mouseback lets web designers and product managers collaborate on websites by enabling them to drag and drop comments onto websites, turning them into a collaborative canvas. Other similar tools include bugherd and marker.io.

## Getting started developing:
Mouseback is a vite app which is embedded as an external script onto users websites. 


`npm i` to install dependancies

`npm run dev` to run the dev server

`npx vite build` will create a `/dist/` folder which outputs a single `mouseback-vite.js` file

Scafollded with 

https://vitejs.dev/guide/ 

https://ui.shadcn.com/ 

https://supabase.com/docs/reference/javascript/introduction


### Mouseback setup process

**Step 1:** Add the Mouseback JavaScript file to your project. Insert the following script tag in the section of your HTML file:
```
<script src="https://mouseback-vite.vercel.app/mouseback-vite.iife.js"></script>
```
Or, if you're running locally:

```
<script src="http://localhost:3000/mouseback-vite.iife.js"></script>
```

**Step 2:** Mount and configure your Mouseback app. Place the following code snippet in your JavaScript file or within a script tag:


```
window.addEventListener("load", () => {
  window.mountMouseback({
    projectId: "YOUR_PROJECT_ID", // Use a unique project ID for each project
  });
});
```
Remember to replace "YOUR_PROJECT_ID" with the specific project ID.



NOTE: Project Id is required to maintain the uniqueness of the comments and we use the project id to fetch the comments. Right now we don't have any logic to assign project id's to the user so for now any random string value will work.
