# Macro Ledger

A calorie and macro tracker that runs in a phone browser. One static page, no server.

- Log food from a built-in list, your own foods, or a photo of the meal
- Daily weigh-ins with a smoothed trend line
- Calorie and macro targets from your stats, then from your own intake and weight data

## Use it on your phone

Open the GitHub Pages link, then choose **Add to Home Screen** from the browser menu.

## Notes

- Works offline after the first visit. Photo logging still needs a connection.
- Everything is stored in the browser on that phone. Clearing site data erases it, and it does not sync between devices. Use **Plan → Backup** to save a backup file and to restore it on another phone.
- Weigh-ins can be added or corrected for earlier days, and saved foods can be removed from **Add food → My foods**.
- Photo logging uses your own API key, which you enter in the Plan tab: a free Google Gemini key from aistudio.google.com/apikey, or a paid Anthropic key. The key is stored on the phone only and is never part of this repository.
- Photo estimates are checked before you approve them: against the USDA food database, the built-in food list, and, for restaurant food, saved menu figures for McDonald's, Wendy's, California Burrito, KFC, Domino's, Burger King and Subway (third-party FatSecret listings; all but Wendy's give calories only). Other restaurants are checked against the database, or use the figure the model recalls, which is labelled as such. An optional free USDA key in the Plan tab lifts the demo key's hourly limit.
- Food values and photo estimates are approximate. Targets are estimates, not medical advice.
