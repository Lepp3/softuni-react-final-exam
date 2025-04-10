implement a refresh token logic and endpoint that handles it user/refreshToken that:
-invalidates existing JWT and blacklists it,
-checks if refreshToken is valid,
-creates a new JWT and sends it back where it can be saved 
TODO IN CLIENT
- implement cart page
- implement purchase button on details page (tip forma da prashta request.body) QUANTITY + -
- remove items from cart
- fake checkout
- adapt server changes in naming (likedBy => recommendedBy, likedPosts => recommendedPosts etc.);
- implement transitions, lazy loading, optimistic state for reviews
- dislikes on cameras
- likes on reviews
- dislikes on reviews
- replies on reviews?


TODO ON SERVER
- refreshToken - need to save it on frontend and implement logic if(expired || expiringSoon) 
- review likes (maybe answers) / dislikes
- dislikes on cameras