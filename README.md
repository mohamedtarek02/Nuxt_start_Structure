
# After installing project, follow this commands:
#### npm install
#### npm run dev

# Fetchin posts composable explanation:
##### The composable allows you to load posts from a paginated API using infinite scroll. It keeps track of the posts, the current page, and whether more data is available. You just call loadMore() whenever you want to fetch more posts — usually when the user scrolls near the bottom. It also ensures that it does not reload while it's still waiting for a response. When there are no posts, stop fetching data and displaying the "No more posts" message.

# Features 
- The website is fully multilingual, offering support for multiple languages to provide a seamless experience for users around the world.
- TypeScript is used throughout the project to help catch potential runtime errors early and improve code maintainability.
- Vuetify cards have been implemented to enhance the visual appeal and consistency of the user interface.
- The layout is responsive and optimized for various screen sizes, ensuring a good experience on both desktop and mobile devices.
- Posts different scenarios have been covered; Loader is added when loading more posts and no more posts message when there are no more posts.
- A utility has been created for formatting dates and times in a good format using "moment" library.
- Friendly error user notification when failed to fetch. 
- Animation rendering has been added for the home page cards for a better user experience.
- Font Awesome is set up, providing a wide variety of high-quality icons for a better visual experience.
- Dynamic tab title according to the active page.
- Cookies are used to retain the user's language preference for future visits.
-  A suitable home page design has been created to introduce and identify the purpose of the project.

# comments
- Pinia is configured and ready for use, although the current stage of the project does not yet require centralized state management.
- Post details are sent as params inside the post details page, because there is no endpoint to get post details by ID.
