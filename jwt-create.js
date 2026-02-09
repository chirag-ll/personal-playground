const sign = require('jwt-encode');
claims = {
    "iss": 'dDemb1AdFwYtoGsNuH5NKNrXBA7ldTtvZFmNIOtF',
    "iat": 1768489264,
    "custom_profile_id": "260105004309339450438686",
}
console.log(sign(claims, "y5An9fnf3uoPspC4GDqkYDyOFcxcIzqwSrxSFMwbWhtvCerC6ubKMWuBqFfA634aVR9okORXn0fWB6tXXE1DMFaNOVs6UvqHz6AgwAh734Mpv87Xp0YezNCnqvN6igiF", algorithm="HS256"));