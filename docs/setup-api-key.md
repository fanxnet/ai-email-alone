# Setting Up Your Google Gemini API Key

This guide walks you through obtaining and configuring a Gemini API key for **AI Compose**.

## 1. Create a Google Cloud Project

1. Go to the [Google Cloud Console](https://console.cloud.google.com)
2. Click **Select a Project** → **New Project**
3. Name it **AI Compose** (or any name you prefer)
4. Click **Create**

## 2. Enable the Generative Language API

1. In the Google Cloud Console, go to **APIs & Services** → **Library**
2. Search for **Generative Language API**
3. Click on it, then click **Enable**

> [!TIP]
> Alternatively, you can use [Google AI Studio](https://aistudio.google.com/app/apikey) to generate an API key directly without setting up a full Cloud project.

## 3. Generate an API Key

1. Go to **APIs & Services** → **Credentials**
2. Click **+ Create Credentials** → **API Key**
3. Copy the generated key
4. _(Optional but recommended)_ Click **Restrict Key** to limit it to the Generative Language API only

## 4. Configure the Key in AI Compose

1. In the project root, create a file named `.env`:
   ```
   GEMINI_API_KEY=your_api_key_here
   ```
2. Replace `your_api_key_here` with your actual API key
3. The `.env` file is already listed in `.gitignore` — it will **never** be committed

## 5. Verify

Run the dev server:

```bash
npm start
```

The add-in should be able to connect to the Gemini API when you use any AI features.

## Security Notes

- **Never** share your API key publicly or commit it to version control
- Use a dedicated API key for AI Compose (not your main project key)
- Consider [restricting the key](https://cloud.google.com/docs/authentication/api-keys#securing_an_api_key) to only the Generative Language API
- Set a quota or budget alert in the Cloud Console to avoid unexpected charges

---

© Rizonetech (Pty) Ltd. • [rizonesoft.com](https://rizonesoft.com)
