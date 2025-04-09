implement a refresh token logic and endpoint that handles it user/refreshToken that:
-invalidates existing JWT and blacklists it,
-checks if refreshToken is valid,
-creates a new JWT and sends it back where it can be saved 